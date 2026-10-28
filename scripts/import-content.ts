// Imports a folder written by scripts/export-content.ts into an EMPTY database, keeping every document id.
// Ids matter because uploads and relationships point at them; Payload does not accept an explicit id on
// create, so documents are created in ascending id order and each gap is filled with a temporary copy that is
// deleted afterwards. The target must have run its migrations (`npx payload migrate`) and hold no content yet.
// Every document is written locale by locale (English first, then Indonesian) because required rich-text
// fields reject the all-locales shape on validation.
//
//   npm run content:import                      # .env, ./export-content
//   npm run content:import -- ./some/dir
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { bootstrapEnv, contentCollections, contentGlobals } from './lib/env.ts'
import { locales, defaultLocale, type Locale } from '../src/i18n/config.ts'

await bootstrapEnv()
const { getPayload } = await import('payload')
const { default: config } = await import('../src/payload.config.ts')

const dir = path.resolve(process.argv[2] || 'export-content')
type Doc = Record<string, any>
const strip = ({ id, createdAt, updatedAt, url, thumbnailURL, sizes, filesize, width, height, mimeType, focalX, focalY, ...rest }: Doc) => rest
const localeSet = new Set<string>(locales)
/** A `locale: 'all'` read wraps each localized value as { en, id }; this unwraps one locale, recursively. */
const isWrapper = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length > 0 && Object.keys(v).every(k => localeSet.has(k))
const pickLocale = (v: any, locale: Locale): any => {
  if (Array.isArray(v)) return v.map(x => pickLocale(x, locale))
  if (isWrapper(v)) return pickLocale(v[locale], locale)
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, pickLocale(x, locale)]))
  return v
}
/** Unique-ish fields get a suffix so a gap filler never collides with a real document. */
const uniqueish = (data: Doc, tag: string) => {
  const d = { ...data }
  for (const k of ['slug', 'seedKey', 'email']) {
    if (!(k in d) || d[k] == null) continue
    d[k] = isWrapper(d[k]) ? Object.fromEntries(Object.entries(d[k]).map(([l, v]) => [l, `${v}-${tag}`])) : `${d[k]}-${tag}`
  }
  if ('filename' in d) d.filename = `${tag}-${d.filename}`
  return d
}
const otherLocales = locales.filter(l => l !== defaultLocale)

const payload = await getPayload({ config })
const rows: Record<string, unknown>[] = []
try {
  for (const collection of contentCollections) {
    const file = path.join(dir, `${collection}.json`)
    if (!(await stat(file).catch(() => null))) { rows.push({ collection, note: 'no file, skipped' }); continue }
    const { hasDrafts, published, latest } = JSON.parse(await readFile(file, 'utf8')) as { hasDrafts: boolean; published: Doc[]; latest: Doc[] }
    const existing = await payload.count({ collection, overrideAccess: true })
    if (existing.totalDocs) throw new Error(`${collection} already holds ${existing.totalDocs} documents; import needs an empty database`)
    const publishedById = new Map(published.map(d => [d.id as number, d]))
    const fillers: number[] = []
    let expected = 1, created = 0, drafts = 0
    const update = async (id: number, data: Doc, draft: boolean, locale: Locale) =>
      payload.update({ collection, id, data: pickLocale(data, locale) as any, locale, depth: 0, overrideAccess: true, draft })
    const create = async (data: Doc, draft: boolean, fileName?: string) => {
      const res = await payload.create({ collection, data: pickLocale(data, defaultLocale) as any, locale: defaultLocale, depth: 0, overrideAccess: true, draft, ...(fileName ? { filePath: path.join(dir, 'media', fileName) } : {}) })
      for (const locale of otherLocales) await update(res.id as number, data, draft, locale)
      return res.id as number
    }
    for (const doc of latest) {
      const id = doc.id as number
      const pub = publishedById.get(id)
      const body = strip(pub ?? doc)
      while (expected < id) { // fill the gap with a throwaway copy of this document
        const got = await create(uniqueish(body, `gap${expected}`), hasDrafts, doc.filename ? (doc.filename as string) : undefined)
        if (got !== expected) throw new Error(`${collection}: filler got id ${got}, expected ${expected}`)
        fillers.push(got); expected++
      }
      const got = await create(body, hasDrafts ? !pub : false, doc.filename ? (doc.filename as string) : undefined)
      if (got !== id) throw new Error(`${collection}: document got id ${got}, expected ${id}`)
      created++; expected++
      if (pub && JSON.stringify(strip(pub)) !== JSON.stringify(strip(doc))) { // newer unpublished edits on top of the published version
        for (const locale of locales) await update(id, strip(doc), true, locale)
        drafts++
      }
    }
    for (const id of fillers) await payload.delete({ collection, id, depth: 0, overrideAccess: true })
    rows.push({ collection, created, drafts, fillers: fillers.length })
  }
  for (const slug of contentGlobals) {
    const file = path.join(dir, `global-${slug}.json`)
    if (!(await stat(file).catch(() => null))) { rows.push({ collection: `global:${slug}`, note: 'no file, skipped' }); continue }
    const { hasDrafts, published, latest } = JSON.parse(await readFile(file, 'utf8')) as { hasDrafts: boolean; published: Doc | null; latest: Doc }
    const clean = (d: Doc) => { const { id, globalType, createdAt, updatedAt, ...rest } = d; return rest }
    const write = async (data: Doc, draft: boolean) => {
      for (const locale of locales) await payload.updateGlobal({ slug, data: pickLocale(data, locale) as any, locale, depth: 0, overrideAccess: true, draft })
    }
    const changed = Boolean(published) && JSON.stringify(clean(published!)) !== JSON.stringify(clean(latest))
    if (published) await write(clean(published), false)
    if (!published || changed) await write(clean(latest), hasDrafts)
    rows.push({ collection: `global:${slug}`, created: 1, drafts: changed ? 1 : 0 })
  }
  console.table(rows)
} finally {
  await payload.destroy()
}
process.exit(process.exitCode ?? 0)
