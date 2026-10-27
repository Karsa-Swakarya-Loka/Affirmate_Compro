// Publishes the client logos from content/seed/clients.json without touching any other content: uploads a logo
// that the CMS does not have yet, re-uploads one whose file changed, then upserts each client (name, logo, url,
// order, consent, published). Use it after a logo set changes, when a full SEED_OVERWRITE on production would
// clobber edits the client made in /admin.
//
//   npm run clients:publish                                   # local (.env)
//   ENV_FILE=.env.production.local npm run clients:publish    # production (Neon + Vercel Blob)
//
// The env bootstrap mirrors scripts/refresh-media.ts (masked values from `vercel env pull` are derived there too).
import { mkdtemp, readFile, stat } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { randomBytes } from 'node:crypto'
import { parse } from 'dotenv'

const envFile = process.env.ENV_FILE || '.env'
const env = parse(await readFile(path.resolve(envFile), 'utf8'))
const masked = (v?: string) => !v || v === '[SENSITIVE]'
const pick = (...keys: string[]) => keys.map(k => env[k]).find(v => !masked(v))

process.env.DATABASE_ADAPTER = masked(env.DATABASE_ADAPTER) ? (pick('DATABASE_URL_UNPOOLED', 'POSTGRES_URL_NON_POOLING') ? 'postgres' : 'sqlite') : env.DATABASE_ADAPTER
process.env.DATABASE_URI = pick('DATABASE_URI', 'DATABASE_URL_UNPOOLED', 'POSTGRES_URL_NON_POOLING', 'DATABASE_URL') ?? ''
process.env.PAYLOAD_SECRET = pick('PAYLOAD_SECRET') ?? randomBytes(24).toString('hex')
process.env.NEXT_PUBLIC_SITE_URL = pick('NEXT_PUBLIC_SITE_URL') ?? 'http://localhost:3000'
if (!masked(env.BLOB_READ_WRITE_TOKEN)) process.env.BLOB_READ_WRITE_TOKEN = env.BLOB_READ_WRITE_TOKEN
process.env.MEDIA_DIR = process.env.DATABASE_ADAPTER === 'sqlite' && !masked(env.MEDIA_DIR) ? env.MEDIA_DIR : await mkdtemp(path.join(tmpdir(), 'affirmate-media-'))
process.env.SMTP_HOST = '' // no mail from this task, so the config does not verify a transport
if (!process.env.DATABASE_URI) throw new Error(`No database URL in ${envFile}`)
console.log(`env ${envFile}: adapter ${process.env.DATABASE_ADAPTER}, blob ${process.env.BLOB_READ_WRITE_TOKEN ? 'on' : 'off'}, site ${process.env.NEXT_PUBLIC_SITE_URL}`)

const { getPayload } = await import('payload')
const { default: config } = await import('../src/payload.config.ts')
const { mediaAlt } = await import('../src/seed/manifest.ts')

type SeedClient = { name: string; logo?: string; url?: string; order?: number; consent?: boolean }
const clients = JSON.parse(await readFile(path.resolve('content/seed/clients.json'), 'utf8')) as SeedClient[]

const payload = await getPayload({ config })
const rows: { client: string; logo: string; status: string }[] = []
try {
  for (const c of clients) {
    let logoID: number | undefined
    let logoStatus = 'none'
    if (c.logo) {
      const alt = mediaAlt[c.logo]
      if (!alt) throw new Error('Logo missing from seed manifest: ' + c.logo)
      const file = path.resolve(c.logo)
      const size = (await stat(file)).size
      const { docs } = await payload.find({ collection: 'media', where: { seedKey: { equals: c.logo } }, depth: 0, limit: 1, draft: true, overrideAccess: true })
      let doc = docs[0]
      if (!doc) {
        doc = await payload.create({ collection: 'media', data: { seedKey: c.logo, alt: alt.en, _status: 'published' }, locale: 'en', filePath: file, depth: 0, overrideAccess: true })
        await payload.update({ collection: 'media', id: doc.id, data: { alt: alt.id }, locale: 'id', depth: 0, overrideAccess: true })
        logoStatus = 'uploaded'
      } else if (doc.filesize !== size) {
        doc = await payload.update({ collection: 'media', id: doc.id, data: {}, filePath: file, overwriteExistingFiles: true, depth: 0, overrideAccess: true })
        logoStatus = 're-uploaded'
      } else logoStatus = 'unchanged'
      logoID = doc.id as number
    }
    const data = { name: c.name, logo: logoID ?? null, url: c.url || undefined, order: c.order, consent: c.consent === true, seedKey: c.name, _status: c.consent === true ? 'published' as const : 'draft' as const }
    const { docs } = await payload.find({ collection: 'clients', where: { seedKey: { equals: c.name } }, depth: 0, limit: 1, draft: true, overrideAccess: true })
    const existing = docs[0]
    if (existing) await payload.update({ collection: 'clients', id: existing.id, data, depth: 0, overrideAccess: true })
    else await payload.create({ collection: 'clients', data, depth: 0, overrideAccess: true })
    rows.push({ client: c.name, logo: logoStatus, status: existing ? `updated → ${data._status}` : `created → ${data._status}` })
  }
  console.table(rows)
} finally {
  await payload.destroy()
}
process.exit(process.exitCode ?? 0)
