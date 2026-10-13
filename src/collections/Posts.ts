import type { CollectionConfig } from 'payload'
import { contentAccess } from '../lib/access.ts'
import { review, richText, seedKey, seo, slug, text, textarea, upload } from '../lib/fields.ts'
import { previewUrl } from '../lib/admin-preview.ts'

/** Insights (bonus CMS articles). */
export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Artikel', plural: 'Artikel (Insights)' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'category', 'publishedAt', '_status'], preview: previewUrl('insights', true) },
  access: contentAccess,
  versions: { drafts: true },
  fields: [
    text('title', true),
    slug,
    { name: 'category', type: 'select', required: true, defaultValue: 'guide', options: [
      { label: 'Pembaruan regulasi', value: 'regulatory-update' },
      { label: 'Panduan', value: 'guide' },
      { label: 'Berita perusahaan', value: 'company-news' },
    ] },
    upload('cover'),
    textarea('excerpt', true),
    richText('body', true),
    { name: 'publishedAt', type: 'date', required: true, defaultValue: () => new Date().toISOString(), admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } } },
    { name: 'author', type: 'text', admin: { position: 'sidebar' } },
    seo(),
    seedKey,
    review,
  ],
}
