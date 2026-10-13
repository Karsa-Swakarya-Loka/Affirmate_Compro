import type { CollectionConfig } from 'payload'
import { adminOnly } from '../lib/access.ts'
import { validEmail, validPhone } from '../lib/validation.ts'

/** Contact form submissions. Public writes go through the validated server action, never raw REST. */
export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  labels: { singular: 'Permintaan', plural: 'Permintaan (form kontak)' },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'company', 'country', 'status', 'emailStatus', 'createdAt'] },
  access: { create: adminOnly, read: adminOnly, update: adminOnly, delete: adminOnly },
  timestamps: true,
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'company', type: 'text' },
    { name: 'email', type: 'email', required: true, validate: (v: unknown) => validEmail(v) || 'Email tidak valid.' },
    { name: 'phone', type: 'text', validate: (v: unknown) => !v || validPhone(v) || 'Nomor telepon tidak valid.' },
    { name: 'country', type: 'text' },
    { name: 'services', type: 'relationship', relationTo: 'services', hasMany: true },
    { name: 'message', type: 'textarea', required: true },
    { name: 'consent', type: 'checkbox', required: true, defaultValue: false },
    { name: 'locale', type: 'select', options: ['en', 'id'], required: true, defaultValue: 'en' },
    { name: 'status', type: 'select', options: [
      { label: 'Baru', value: 'new' }, { label: 'Dihubungi', value: 'contacted' }, { label: 'Selesai', value: 'closed' },
    ], defaultValue: 'new', required: true, admin: { position: 'sidebar' } },
    { name: 'emailStatus', type: 'select', options: ['pending', 'sent', 'failed'], defaultValue: 'pending', required: true, admin: { position: 'sidebar', readOnly: true } },
  ],
}
