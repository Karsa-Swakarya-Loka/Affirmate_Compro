import type { CollectionConfig } from 'payload'
import { contentAccess } from '../lib/access.ts'
import { order, seedKey, text, textarea } from '../lib/fields.ts'

/** Corporate Journey (compro p.6). */
export const Milestones: CollectionConfig = {
  slug: 'milestones',
  labels: { singular: 'Milestone', plural: 'Milestone' },
  admin: { useAsTitle: 'label', defaultColumns: ['year', 'label', 'order', '_status'] },
  access: contentAccess,
  versions: { drafts: true },
  fields: [
    { name: 'year', type: 'number', required: true, min: 2019, max: 2100, admin: { position: 'sidebar' } },
    text('label', true, 'Judul singkat'),
    textarea('text', true, 'Keterangan'),
    order,
    seedKey,
  ],
}
