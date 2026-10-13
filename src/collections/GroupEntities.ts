import type { CollectionConfig } from 'payload'
import { contentAccess } from '../lib/access.ts'
import { localizedList, order, seedKey, text, textarea, upload } from '../lib/fields.ts'
import { httpUrl } from '../lib/validation.ts'

/** Affirmate Group entities (compro p.4). `isSelf` marks the entity this website belongs to. */
export const GroupEntities: CollectionConfig = {
  slug: 'group-entities',
  labels: { singular: 'Entitas grup', plural: 'Entitas grup' },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'brand', 'isSelf', 'order', '_status'] },
  access: contentAccess,
  versions: { drafts: true },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Nama PT' },
    { name: 'brand', type: 'text', required: true, label: 'Nama brand' },
    text('category', true, 'Kategori'),
    textarea('summary', true, 'Ringkasan'),
    localizedList('bullets', 'Poin layanan'),
    upload('logo'),
    { name: 'url', type: 'text', validate: httpUrl },
    { name: 'isSelf', type: 'checkbox', defaultValue: false, label: 'Entitas website ini', admin: { position: 'sidebar' } },
    order,
    seedKey,
  ],
}
