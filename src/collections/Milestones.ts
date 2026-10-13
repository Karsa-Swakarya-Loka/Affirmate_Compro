import type { CollectionConfig } from 'payload'
import { contentAccess } from '../lib/access.ts'
import { order, row, seedKey, text, textarea, statusColumn } from '../lib/fields.ts'

/** Corporate Journey (compro p.6). */
export const Milestones: CollectionConfig = {
  slug: 'milestones',
  labels: { singular: 'Perjalanan (milestone)', plural: 'Perjalanan (milestone)' },
  admin: { hideAPIURL: true, group: 'Konten situs', useAsTitle: 'label', defaultColumns: ['year', 'label', 'order', 'statusBadge'] },
  access: contentAccess,
  versions: { drafts: true },
  fields: [statusColumn, 
    row(
      { name: 'year', type: 'number', required: true, min: 2019, max: 2100, label: 'Tahun', admin: { width: '25%' } },
      text('label', true, 'Judul singkat', { width: '75%' }),
    ),
    textarea('text', true, 'Keterangan'),
    order,
    seedKey,
  ],
}
