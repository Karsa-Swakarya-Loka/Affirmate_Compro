import type { GlobalConfig } from 'payload'
import { adminOnly, globalAccess } from '../lib/access.ts'
import { listAdmin, row, seo, tab, tabs, text, textarea, upload } from '../lib/fields.ts'
import { httpUrl, validEmail } from '../lib/validation.ts'

export const Site: GlobalConfig = {
  slug: 'site',
  label: 'Kontak & pengaturan situs',
  access: { ...globalAccess, update: adminOnly },
  versions: { drafts: true },
  admin: { hideAPIURL: true, group: 'Pengaturan' },
  fields: [
    tabs(
      tab('Identitas', [
        row(
          { name: 'legalName', type: 'text', required: true, defaultValue: 'PT Affirmate Tatakelola Nusantara', label: 'Nama PT', admin: { width: '34%' } },
          { name: 'brandName', type: 'text', required: true, defaultValue: 'Affirmate Administrative', label: 'Nama brand', admin: { width: '33%' } },
          { name: 'groupName', type: 'text', required: true, defaultValue: 'Affirmate Group', label: 'Nama grup', admin: { width: '33%' } },
        ),
        row(upload('logo', false, 'Logo', { width: '50%' }), upload('logoWhite', false, 'Logo putih (cadangan)', { width: '50%' })),
        row({ name: 'groupUrl', type: 'text', validate: httpUrl, defaultValue: 'https://affirmate.co.id', label: 'Situs Affirmate Group', admin: { width: '50%' } }),
        textarea('groupBlurb', false, 'Paragraf grup (footer)'),
      ]),
      tab('Kontak', [
        row(
          { name: 'phone', type: 'text', label: 'Telepon', admin: { width: '25%' } },
          { name: 'phone2', type: 'text', label: 'Telepon kedua', admin: { width: '25%' } },
          { name: 'whatsapp', type: 'text', label: 'Nomor WhatsApp', validate: (v: unknown) => !v || /^\d{8,16}$/.test(String(v)) || 'Gunakan angka tanpa tanda +, contoh 6281905056482.',
            admin: { width: '25%', placeholder: '6281905056482', description: 'Angka saja, diawali 62. Kosong = tombol WhatsApp disembunyikan.' } },
          { name: 'email', type: 'email', label: 'Email', admin: { width: '25%' } },
        ),
        textarea('address', true, 'Alamat'),
        row({ name: 'mapsUrl', type: 'text', validate: httpUrl, label: 'Link Google Maps', admin: { width: '60%', placeholder: 'https://maps.google.com/…', description: 'Buka lokasi di Google Maps → Bagikan → Salin link.' } },
          text('workingHours', false, 'Jam kerja', { width: '40%' })),
        { name: 'social', type: 'array', label: 'Media sosial', labels: { singular: 'Akun', plural: 'Akun' }, admin: listAdmin(), fields: [
          row({ name: 'platform', type: 'select', required: true, label: 'Platform', admin: { width: '30%' }, options: [
              { label: 'LinkedIn', value: 'linkedin' }, { label: 'Instagram', value: 'instagram' }, { label: 'Facebook', value: 'facebook' }, { label: 'YouTube', value: 'youtube' }] },
            { name: 'url', type: 'text', required: true, validate: httpUrl, label: 'Link profil', admin: { width: '70%', placeholder: 'https://' } }),
        ] },
      ]),
      tab('Email form kontak', [
        { name: 'inquiryRecipients', type: 'array', label: 'Penerima email form kontak', labels: { singular: 'Email', plural: 'Email' }, admin: listAdmin('Setiap pesan dari formulir dikirim ke alamat-alamat ini.'), fields: [
          { name: 'email', type: 'email', required: true, label: 'Email', validate: (v: unknown) => validEmail(v) || 'Email tidak valid.' },
        ] },
      ]),
      tab('SEO bawaan', [seo('seoDefault')], 'Dipakai untuk halaman yang SEO-nya tidak diisi.'),
    ),
  ],
}
