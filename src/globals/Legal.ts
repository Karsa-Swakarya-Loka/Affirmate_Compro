import type { GlobalConfig } from 'payload'
import { globalAccess } from '../lib/access.ts'
import { richText, text } from '../lib/fields.ts'
import { previewUrl } from '../lib/admin-preview.ts'

export const Legal: GlobalConfig = {
  slug: 'legal',
  label: 'Kebijakan privasi',
  access: globalAccess,
  versions: { drafts: true },
  admin: { preview: previewUrl('privacy') },
  fields: [
    text('privacyTitle', true),
    richText('privacyBody', true),
    { name: 'updatedAt', type: 'date', admin: { date: { pickerAppearance: 'dayOnly' } } },
  ],
}
