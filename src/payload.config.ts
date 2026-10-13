import 'dotenv/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { id } from '@payloadcms/translations/languages/id'
import { en } from '@payloadcms/translations/languages/en'
import sharp from 'sharp'
import { Services } from './collections/Services.ts'
import { GroupEntities } from './collections/GroupEntities.ts'
import { Milestones } from './collections/Milestones.ts'
import { Clients } from './collections/Clients.ts'
import { Cities } from './collections/Cities.ts'
import { Posts } from './collections/Posts.ts'
import { Media } from './collections/Media.ts'
import { Inquiries } from './collections/Inquiries.ts'
import { Users } from './collections/Users.ts'
import { Site } from './globals/Site.ts'
import { Home } from './globals/Home.ts'
import { Legal } from './globals/Legal.ts'
import { Ui } from './globals/Ui.ts'
import { database } from './lib/database.ts'
import { localization } from './i18n/config.ts'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const secret = process.env.PAYLOAD_SECRET
if (!secret || secret.length < 32) throw new Error('PAYLOAD_SECRET must contain at least 32 random characters')
const serverURL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/+$/, '')

export default buildConfig({
  serverURL,
  secret,
  admin: { user: Users.slug, importMap: { baseDir: dirname }, meta: { titleSuffix: ' | Affirmate Administrative' } },
  // Admin UI in Indonesian for the client's team; content itself is EN (default) + ID.
  i18n: { supportedLanguages: { id, en }, fallbackLanguage: 'id' },
  localization,
  collections: [Services, GroupEntities, Milestones, Clients, Cities, Posts, Media, Inquiries, Users],
  globals: [Site, Home, Legal, Ui],
  editor: lexicalEditor(),
  db: database(),
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  csrf: [serverURL],
  email: process.env.SMTP_HOST
    ? nodemailerAdapter({
        defaultFromAddress: process.env.SMTP_FROM_ADDRESS || '',
        defaultFromName: process.env.SMTP_FROM_NAME || 'Affirmate Administrative',
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: process.env.SMTP_SECURE === 'true',
          ...(process.env.SMTP_USER ? { auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } } : {}),
        },
      })
    : undefined,
})
