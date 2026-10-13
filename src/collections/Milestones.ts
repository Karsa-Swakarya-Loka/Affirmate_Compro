import type { CollectionConfig } from 'payload'
import { contentAccess } from '../lib/access.ts'
import { order, row, seedKey, text, textarea } from '../lib/fields.ts'

/** Corporate Journey (compro p.6). */
export const Milestones: CollectionConfig = {
  slug: 'milestones',
  labels: { singular: 'Perjalanan (milestone)', plural: 'Perjalanan (milestone)' },
  admin: { group: 'Konten situs', useAsTitle: 'label', defaultColumns: ['year', 'label', 'order', '_status'], description: 'Tonggak perjalanan perusahaan per tahun.' },
  access: contentAccess,
  versions: { drafts: true },
  fields: [
    row(
      { name: 'year', type: 'number', required: true, min: 2019, max: 2100, label: 'Tahun', admin: { width: '25%' } },
      text('label', true, 'Judul singkat', { width: '75%' }),
    ),
    textarea('text', true, 'Keterangan'),
    order,
    seedKey,
  ],
}
