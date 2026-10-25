// Re-uploads seed media whose file on disk changed (different size), without touching any other content.
// Use it when an asset in design/assets is replaced and the CMS, local or production, still serves the old file.
//
//   npm run media:refresh                                   # local (.env)
//   ENV_FILE=.env.production.local npm run media:refresh    # production (Neon + Vercel Blob)
//
// The env file may come from `vercel env pull`, where sensitive values are masked as "[SENSITIVE]". Those are
// derived here: the database from the Neon integration's unpooled URL, the Payload secret from a throwaway value
// (the Local API does not sign anything for this task). Files are staged in an empty temp folder so names never
// collide with the local media/ folder. Nothing from the env file is printed.
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

const only = process.argv.slice(2) // optional substrings, e.g. "People" to limit to the portraits
const payload = await getPayload({ config })
const rows: { asset: string; status: string; before?: number; after?: number }[] = []
try {
  for (const source of Object.keys(mediaAlt)) {
    if (only.length && !only.some(s => source.includes(s))) continue
    const file = path.resolve(source)
    const size = (await stat(file)).size
    const { docs } = await payload.find({ collection: 'media', where: { seedKey: { equals: source } }, depth: 0, limit: 1, draft: true, overrideAccess: true })
    const doc = docs[0]
    if (!doc) { rows.push({ asset: source, status: 'missing in CMS (run seed)' }); continue }
    if (doc.filesize === size) { rows.push({ asset: source, status: 'unchanged', before: doc.filesize ?? undefined }); continue }
    const updated = await payload.update({ collection: 'media', id: doc.id, data: {}, filePath: file, overwriteExistingFiles: true, depth: 0, overrideAccess: true })
    rows.push({ asset: source, status: `re-uploaded ${updated.width}x${updated.height}`, before: doc.filesize ?? undefined, after: updated.filesize ?? undefined })
  }
  console.table(rows)
} finally {
  await payload.destroy()
}
process.exit(process.exitCode ?? 0)
