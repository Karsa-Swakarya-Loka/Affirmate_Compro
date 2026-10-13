import type { GlobalConfig } from 'payload'
import { adminOnly, globalAccess } from '../lib/access.ts'
import { seo, text, textarea, upload } from '../lib/fields.ts'
import { httpUrl, validEmail } from '../lib/validation.ts'

export const Site: GlobalConfig = {
  slug: 'site',
  label: 'Pengaturan situs',
  access: { ...globalAccess, update: adminOnly },
  versions: { drafts: true },
  fields: [
    { type: 'row', fields: [
      { name: 'legalName', type: 'text', required: true, defaultValue: 'PT Affirmate Tatakelola Nusantara' },
      { name: 'brandName', type: 'text', required: true, defaultValue: 'Affirmate Administrative' },
      { name: 'groupName', type: 'text', required: true, defaultValue: 'Affirmate Group' },
    ] },
    { type: 'row', fields: [upload('logo'), upload('logoWhite')] },
    { type: 'row', fields: [
      { name: 'phone', type: 'text' },
      { name: 'phone2', type: 'text' },
      { name: 'whatsapp', type: 'text', validate: (v: unknown) => !v || /^\d{8,16}$/.test(String(v)) || 'Gunakan angka tanpa tanda +, contoh 6281905056482.', admin: { description: 'Kosongkan untuk menyembunyikan tombol WhatsApp.' } },
      { name: 'email', type: 'email' },
    ] },
    textarea('address', true, 'Alamat'),
    { name: 'mapsUrl', type: 'text', validate: httpUrl },
    text('workingHours', false, 'Jam kerja'),
    { name: 'social', type: 'array', fields: [
      { name: 'platform', type: 'select', options: ['linkedin', 'instagram', 'facebook', 'youtube'], required: true },
      { name: 'url', type: 'text', required: true, validate: httpUrl },
    ] },
    { name: 'groupUrl', type: 'text', validate: httpUrl, defaultValue: 'https://affirmate.co.id' },
    textarea('groupBlurb', false, 'Paragraf grup (footer)'),
    seo('seoDefault'),
    { name: 'inquiryRecipients', type: 'array', label: 'Penerima email form kontak', fields: [
      { name: 'email', type: 'email', required: true, validate: (v: unknown) => validEmail(v) || 'Email tidak valid.' },
    ] },
  ],
}
