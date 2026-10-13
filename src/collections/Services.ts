import type { CollectionConfig } from 'payload'
import { contentAccess } from '../lib/access.ts'
import { icon, localizedList, order, review, row, seedKey, seo, slug, tab, tabs, text, textarea, statusColumn } from '../lib/fields.ts'

/** Four services from compro p.5, shown as the four-petal diagram plus detail rows (docs/02, docs/03). */
export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Layanan', plural: 'Layanan' },
  admin: { hideAPIURL: true, group: 'Konten situs', useAsTitle: 'title', defaultColumns: ['title', 'order', 'statusBadge', 'needsReview'] },
  access: contentAccess,
  versions: { drafts: true },
  fields: [statusColumn, 
    tabs(
      tab('Isi layanan', [
        row(text('title', true, 'Nama layanan', { width: '65%' }), icon('icon', '35%')),
        textarea('summary', true, 'Ringkasan (kartu/kelopak)'),
        localizedList('items', 'Daftar izin / item layanan'),
        textarea('body', false, 'Uraian panjang (opsional)'),
        textarea('partnerNote', false, 'Catatan mitra pelaksana (opsional)'),
      ]),
      tab('SEO', [seo()]),
    ),
    slug,
    order,
    seedKey,
    review,
  ],
}
