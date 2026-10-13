import type { CollectionConfig } from 'payload'
import { contentAccess } from '../lib/access.ts'
import { checkbox, order, row, seedKey, upload, statusColumn } from '../lib/fields.ts'
import { hasConsentForStatus, httpUrl } from '../lib/validation.ts'

/** Client logos (compro p.8). A logo can only be published once the client confirmed permission. */
export const Clients: CollectionConfig = {
  slug: 'clients',
  labels: { singular: 'Klien', plural: 'Klien' },
  admin: { hideAPIURL: true, group: 'Konten situs', useAsTitle: 'name', defaultColumns: ['name', 'consent', 'order', 'statusBadge'], description: 'Tayang hanya setelah izin tampil dicentang.' },
  access: contentAccess,
  versions: { drafts: true },
  hooks: {
    beforeValidate: [({ data, originalDoc }) => {
      if (data && !hasConsentForStatus(data._status ?? originalDoc?._status, data.consent ?? originalDoc?.consent))
        throw new Error('Logo klien hanya boleh dipublikasikan setelah izin tampil dicentang.')
      return data
    }],
  },
  fields: [statusColumn, 
    row(
      { name: 'name', type: 'text', required: true, label: 'Nama klien', admin: { width: '50%' } },
      { name: 'url', type: 'text', validate: httpUrl, label: 'Situs klien (opsional)', admin: { width: '50%', placeholder: 'https://' } },
    ),
    upload('logo', false, 'Logo', { description: 'PNG/SVG berlatar transparan.' }),
    checkbox('consent', 'Izin tampil sudah diterima', { sidebar: true }),
    order,
    seedKey,
  ],
}
