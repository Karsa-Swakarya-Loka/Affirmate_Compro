import type { CollectionConfig } from 'payload'
import { contentAccess } from '../lib/access.ts'
import { checkbox, localizedList, order, row, seedKey, text, textarea, upload, statusColumn } from '../lib/fields.ts'
import { httpUrl } from '../lib/validation.ts'

/** Affirmate Group entities (compro p.4). `isSelf` marks the entity this website belongs to. */
export const GroupEntities: CollectionConfig = {
  slug: 'group-entities',
  labels: { singular: 'Entitas grup', plural: 'Entitas grup' },
  admin: { hideAPIURL: true, group: 'Konten situs', useAsTitle: 'name', defaultColumns: ['name', 'brand', 'isSelf', 'order', 'statusBadge'] },
  access: contentAccess,
  versions: { drafts: true },
  fields: [statusColumn, 
    row(
      { name: 'name', type: 'text', required: true, label: 'Nama PT', admin: { width: '50%' } },
      { name: 'brand', type: 'text', required: true, label: 'Nama brand', admin: { width: '50%' } },
    ),
    row(text('category', true, 'Kategori', { width: '50%' }), { name: 'url', type: 'text', validate: httpUrl, label: 'Situs (opsional)', admin: { width: '50%', placeholder: 'https://' } }),
    textarea('summary', true, 'Ringkasan'),
    localizedList('bullets', 'Poin layanan'),
    upload('logo', false, 'Logo'),
    checkbox('isSelf', 'Ini entitas website ini', { sidebar: true, description: 'Centang hanya untuk Affirmate Administrative.' }),
    order,
    seedKey,
  ],
}
