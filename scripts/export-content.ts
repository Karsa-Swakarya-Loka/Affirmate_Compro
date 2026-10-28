// Exports every CMS document (all locales, published version and latest draft) plus the original media files
// into a folder, so the site can move between hostings (Vercel → Hostinger cPanel, 28 Oct 2026) without
// losing edits the client made in /admin. Pair with scripts/import-content.ts.
//
//   ENV_FILE=.env.production.local npm run content:export            # → export-content/
//   npm run content:export -- ./some/dir                             # custom folder
import { copyFile, mkdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { bootstrapEnv, contentCollections, contentGlobals } from './lib/env.ts'

await bootstrapEnv()
const { getPayload } = await import('payload')
const { default: config } = await import('../src/payload.config.ts')

const out = path.resolve(process.argv[2] || 'export-content')
await mkdir(path.join(out, 'media'), { recursive: true })
const payload = await getPayload({ config })
const site = process.env.NEXT_PUBLIC_SITE_URL!
const rows: Record<string, unknown>[] = []
try {
  for (const collection of contentCollections) {
    const base = { collection, locale: 'all' as const, fallbackLocale: false as const, depth: 0, pagination: false as const, overrideAccess: true, sort: 'id' }
    const latest = (await payload.find({ ...base, draft: true })).docs
    const hasDrafts = Boolean(payload.collections[collection].config.versions?.drafts)
    const published = hasDrafts ? (await payload.find({ ...base, draft: false })).docs.filter((d: any) => d._status === 'published') : []
    let files = 0
    if (collection === 'media') {
      for (const doc of latest as any[]) {
        const local = path.resolve(process.env.MEDIA_DIR!, doc.filename)
        if (!process.env.BLOB_READ_WRITE_TOKEN && (await stat(local).catch(() => null))) {
          await copyFile(local, path.join(out, 'media', doc.filename)) // disk storage: take the original file directly
        } else {
          const url: string = doc.url.startsWith('http') ? doc.url : site + doc.url
          const res = await fetch(url)
          if (!res.ok) throw new Error(`Download failed ${res.status}: ${url}`)
          await writeFile(path.join(out, 'media', doc.filename), Buffer.from(await res.arrayBuffer()))
        }
        files++
      }
    }
    const ids = latest.map((d: any) => d.id as number)
    const gaps = ids.length ? ids[ids.length - 1] - ids.length : 0
    await writeFile(path.join(out, `${collection}.json`), JSON.stringify({ collection, hasDrafts, published, latest }, null, 1))
    rows.push({ collection, latest: latest.length, published: published.length, files, maxId: ids.at(-1) ?? 0, gaps })
  }
  for (const slug of contentGlobals) {
    const base = { slug, locale: 'all' as const, fallbackLocale: false as const, depth: 0, overrideAccess: true }
    const latest = await payload.findGlobal({ ...base, draft: true })
    const hasDrafts = Boolean(payload.globals.config.find(g => g.slug === slug)?.versions?.drafts)
    const published = hasDrafts ? await payload.findGlobal({ ...base, draft: false }) : null
    await writeFile(path.join(out, `global-${slug}.json`), JSON.stringify({ slug, hasDrafts, published, latest }, null, 1))
    rows.push({ collection: `global:${slug}`, latest: 1, published: published ? 1 : 0, files: 0 })
  }
  const users = (await payload.find({ collection: 'users', depth: 0, pagination: false, overrideAccess: true })).docs.map((u: any) => ({ id: u.id, email: u.email, name: u.name }))
  await writeFile(path.join(out, 'users.json'), JSON.stringify(users, null, 1))
  rows.push({ collection: 'users (emails only)', latest: users.length })
  console.table(rows)
  console.log('Exported to', out)
} finally {
  await payload.destroy()
}
process.exit(process.exitCode ?? 0)
