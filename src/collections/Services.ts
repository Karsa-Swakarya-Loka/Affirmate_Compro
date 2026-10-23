import type { CollectionConfig } from 'payload'
import { contentAccess } from '../lib/access.ts'
import { icon, listAdmin, localizedList, order, review, row, seedKey, seo, slug, tab, tabs, text, textarea, statusColumn } from '../lib/fields.ts'

/** Services from compro p.5 (plus Corporate Secretary, 23 Oct 2026): four-petal diagram, a wide petal for the fifth, then detail rows (docs/02, docs/03). */
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
        // Grouped detail (23 Oct 2026): Conversant Expatriate lists KITAS types and visas by group. Rows that share a title
        // render under one heading, each with its own sub-label (e.g. "Visa & Passport Services" → Indonesian / Global).
        { name: 'groups', type: 'array', label: 'Rincian berkelompok (opsional)', labels: { singular: 'Kelompok', plural: 'Kelompok' },
          admin: listAdmin('Dipakai bila daftar perlu dikelompokkan, mis. jenis KITAS atau Visa Indonesia / Visa Global. Tampil di bawah daftar butir.'),
          fields: [
            row(text('title', true, 'Judul kelompok', { width: '50%' }), text('label', false, 'Sub-label (opsional)', { width: '50%', description: 'Mis. "Indonesian Visas" di bawah judul "Visa & Passport Services".' })),
            localizedList('items', 'Butir'),
          ] },
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
