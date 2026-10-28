// Shared env bootstrap for the content scripts. Reads ENV_FILE (default .env); values already present in the
// process environment win, so `DATABASE_URI=file:./x.db npm run content:import` targets another database.
// Masked values from `vercel env pull` ([SENSITIVE]) are skipped, mirroring scripts/refresh-media.ts.
import { mkdtemp, readFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { randomBytes } from 'node:crypto'
import { parse } from 'dotenv'

export async function bootstrapEnv() {
  const envFile = process.env.ENV_FILE || '.env'
  const env = parse(await readFile(path.resolve(envFile), 'utf8'))
  const masked = (v?: string) => !v || v === '[SENSITIVE]'
  const pick = (...keys: string[]) => keys.map(k => process.env[k] ?? env[k]).find(v => !masked(v))
  const uri = pick('DATABASE_URI', 'DATABASE_URL_UNPOOLED', 'POSTGRES_URL_NON_POOLING', 'DATABASE_URL') ?? ''
  process.env.DATABASE_URI = uri
  process.env.DATABASE_ADAPTER = pick('DATABASE_ADAPTER') ?? (uri.startsWith('file:') ? 'sqlite' : 'postgres')
  process.env.PAYLOAD_SECRET = pick('PAYLOAD_SECRET') ?? randomBytes(24).toString('hex')
  process.env.NEXT_PUBLIC_SITE_URL = pick('NEXT_PUBLIC_SITE_URL') ?? 'http://localhost:3000'
  const blob = pick('BLOB_READ_WRITE_TOKEN')
  if (blob) process.env.BLOB_READ_WRITE_TOKEN = blob
  const mediaDir = pick('MEDIA_DIR')
  process.env.MEDIA_DIR = mediaDir ?? await mkdtemp(path.join(tmpdir(), 'affirmate-media-'))
  process.env.SMTP_HOST = '' // content scripts never send mail, so the config does not verify a transport
  if (!process.env.DATABASE_URI) throw new Error(`No database URL in ${envFile}`)
  console.log(`env ${envFile}: adapter ${process.env.DATABASE_ADAPTER}, blob ${blob ? 'on' : 'off'}, media ${process.env.MEDIA_DIR}, site ${process.env.NEXT_PUBLIC_SITE_URL}`)
}

/** Collections copied between hostings, in dependency order (media first: uploads point at it). Users are not
 *  copied (password hashes are not readable through the API); recreate admins with `npm run setup:admin`. */
export const contentCollections = ['media', 'cities', 'milestones', 'group-entities', 'services', 'clients', 'posts', 'inquiries'] as const
export const contentGlobals = ['site', 'home', 'legal', 'ui'] as const
export type ContentCollection = (typeof contentCollections)[number]
export type ContentGlobal = (typeof contentGlobals)[number]
