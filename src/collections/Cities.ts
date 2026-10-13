import type { CollectionConfig } from 'payload'
import { dataAccess } from '../lib/access.ts'
import { order, seedKey } from '../lib/fields.ts'

/** Network map pins (compro p.9). Coordinates are projected onto the SVG map at render time. */
export const Cities: CollectionConfig = {
  slug: 'cities',
  labels: { singular: 'Kota jaringan', plural: 'Kota jaringan' },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'lat', 'lng', 'order'] },
  access: dataAccess,
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'lat', type: 'number', required: true, min: -11, max: 6 },
    { name: 'lng', type: 'number', required: true, min: 95, max: 141 },
    order,
    seedKey,
  ],
}
