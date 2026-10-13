import type { CollectionConfig } from 'payload'
import { adminOnly } from '../lib/access.ts'
import { checkCell, row } from '../lib/fields.ts'
import { validEmail, validPhone } from '../lib/validation.ts'

/** Contact form submissions. Public writes go through the validated server action, never raw REST. */
export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  labels: { singular: 'Pesan masuk', plural: 'Pesan masuk' },
  admin: { group: 'Pesan masuk', useAsTitle: 'name', defaultColumns: ['name', 'company', 'status', 'createdAt', 'emailStatus'], description: 'Pesan dari formulir kontak. Ubah status setelah pengirim dihubungi.' },
  access: { create: adminOnly, read: adminOnly, update: adminOnly, delete: adminOnly },
  timestamps: true,
  fields: [
    row(
      { name: 'name', type: 'text', required: true, label: 'Nama', admin: { width: '50%' } },
      { name: 'company', type: 'text', label: 'Perusahaan', admin: { width: '50%' } },
    ),
    row(
      { name: 'email', type: 'email', required: true, label: 'Email', admin: { width: '34%' }, validate: (v: unknown) => validEmail(v) || 'Email tidak valid.' },
      { name: 'phone', type: 'text', label: 'Telepon', admin: { width: '33%' }, validate: (v: unknown) => !v || validPhone(v) || 'Nomor telepon tidak valid.' },
      { name: 'country', type: 'text', label: 'Negara', admin: { width: '33%' } },
    ),
    { name: 'services', type: 'relationship', relationTo: 'services', hasMany: true, label: 'Layanan yang ditanyakan' },
    { name: 'message', type: 'textarea', required: true, label: 'Pesan' },
    { name: 'consent', type: 'checkbox', required: true, defaultValue: false, label: 'Setuju dihubungi', admin: checkCell },
    { name: 'status', type: 'select', label: 'Status tindak lanjut', options: [
      { label: 'Baru', value: 'new' }, { label: 'Sudah dihubungi', value: 'contacted' }, { label: 'Selesai', value: 'closed' },
    ], defaultValue: 'new', required: true, admin: { position: 'sidebar' } },
    { name: 'locale', type: 'select', label: 'Bahasa pengirim', options: [{ label: 'Inggris', value: 'en' }, { label: 'Indonesia', value: 'id' }], required: true, defaultValue: 'en', admin: { position: 'sidebar', readOnly: true } },
    { name: 'emailStatus', type: 'select', label: 'Notifikasi email', options: [{ label: 'Menunggu', value: 'pending' }, { label: 'Terkirim', value: 'sent' }, { label: 'Gagal', value: 'failed' }], defaultValue: 'pending', required: true, admin: { position: 'sidebar', readOnly: true } },
  ],
}
