import type { GlobalConfig } from 'payload'
import { globalAccess } from '../lib/access.ts'
import { richText, row, text } from '../lib/fields.ts'
import { previewUrl } from '../lib/admin-preview.ts'

export const Legal: GlobalConfig = {
  slug: 'legal',
  label: 'Kebijakan privasi',
  access: globalAccess,
  versions: { drafts: true },
  admin: { hideAPIURL: true, group: 'Halaman', preview: previewUrl('privacy') },
  fields: [
    row(text('privacyTitle', true, 'Judul halaman', { width: '65%' }),
      { name: 'updatedAt', type: 'date', label: 'Terakhir diperbarui', admin: { width: '35%', date: { pickerAppearance: 'dayOnly' } } }),
    richText('privacyBody', true, 'Isi kebijakan'),
  ],
}
