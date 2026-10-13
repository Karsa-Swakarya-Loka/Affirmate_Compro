import type { CollectionConfig } from 'payload'
import { contentAccess } from '../lib/access.ts'
import { review, richText, row, seedKey, seo, slug, text, textarea, upload, statusColumn } from '../lib/fields.ts'
import { previewUrl } from '../lib/admin-preview.ts'

/** Insights (bonus CMS articles). */
export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Artikel', plural: 'Artikel (Insights)' },
  admin: { hideAPIURL: true, group: 'Konten situs', useAsTitle: 'title', defaultColumns: ['title', 'category', 'publishedAt', 'statusBadge', 'needsReview'], preview: previewUrl('insights', true), description: 'Artikel di halaman Insights.' },
  access: contentAccess,
  versions: { drafts: true },
  fields: [statusColumn, 
    text('title', true, 'Judul'),
    row(
      { name: 'category', type: 'select', required: true, defaultValue: 'guide', label: 'Kategori', admin: { width: '50%' }, options: [
        { label: 'Pembaruan regulasi', value: 'regulatory-update' },
        { label: 'Panduan', value: 'guide' },
        { label: 'Berita perusahaan', value: 'company-news' },
      ] },
      upload('cover', false, 'Foto sampul', { width: '50%' }),
    ),
    textarea('excerpt', true, 'Ringkasan', { description: 'Tampil di kartu daftar artikel (1–2 kalimat).' }),
    richText('body', true, 'Isi artikel'),
    seo(),
    { name: 'publishedAt', type: 'date', required: true, label: 'Tanggal terbit', defaultValue: () => new Date().toISOString(), admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } } },
    { name: 'author', type: 'text', label: 'Penulis', admin: { position: 'sidebar' } },
    slug,
    seedKey,
    review,
  ],
}
