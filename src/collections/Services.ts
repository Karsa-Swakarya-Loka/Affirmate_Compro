import type { CollectionConfig } from 'payload'
import { contentAccess } from '../lib/access.ts'
import { icon, localizedList, order, review, seedKey, seo, slug, text, textarea } from '../lib/fields.ts'

/** Four services from compro p.5, shown as the four-petal diagram plus detail rows (docs/02, docs/03). */
export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Layanan', plural: 'Layanan' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'order', '_status', 'needsReview'] },
  access: contentAccess,
  versions: { drafts: true },
  fields: [
    text('title', true),
    slug,
    order,
    icon(),
    textarea('summary', true, 'Ringkasan (kartu/kelopak)'),
    localizedList('items', 'Daftar izin / item layanan'),
    textarea('body', false, 'Uraian panjang (opsional)'),
    textarea('partnerNote', false, 'Catatan mitra pelaksana (opsional)'),
    seo(),
    seedKey,
    review,
  ],
}
