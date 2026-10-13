import type { CollectionConfig } from 'payload'
import { contentAccess } from '../lib/access.ts'
import { order, seedKey, upload } from '../lib/fields.ts'
import { hasConsentForStatus, httpUrl } from '../lib/validation.ts'

/** Client logos (compro p.8). A logo can only be published once the client confirmed permission. */
export const Clients: CollectionConfig = {
  slug: 'clients',
  labels: { singular: 'Klien', plural: 'Klien' },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'consent', 'order', '_status'] },
  access: contentAccess,
  versions: { drafts: true },
  hooks: {
    beforeValidate: [({ data, originalDoc }) => {
      if (data && !hasConsentForStatus(data._status ?? originalDoc?._status, data.consent ?? originalDoc?.consent))
        throw new Error('Logo klien hanya boleh dipublikasikan setelah izin tampil dicentang.')
      return data
    }],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    upload('logo'),
    { name: 'url', type: 'text', validate: httpUrl },
    { name: 'consent', type: 'checkbox', defaultValue: false, label: 'Izin tampil sudah diterima', admin: { position: 'sidebar' } },
    order,
    seedKey,
  ],
}
