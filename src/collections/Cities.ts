import type { CollectionConfig } from 'payload'
import { dataAccess } from '../lib/access.ts'
import { mapPicker, order, seedKey } from '../lib/fields.ts'
import { MAP } from '../lib/indonesia-land.ts'

/** Network map pins (compro p.9). The CMS sets the point by city name or a click on the map; coordinates stay hidden. */
export const Cities: CollectionConfig = {
  slug: 'cities',
  labels: { singular: 'Kota jaringan', plural: 'Kota jaringan' },
  admin: { hideAPIURL: true, group: 'Konten situs', useAsTitle: 'name', defaultColumns: ['name', 'order'], description: 'Titik kota di peta jaringan. Cukup ketik nama kota, titiknya terisi otomatis.' },
  access: dataAccess,
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Nama kota', admin: { placeholder: 'mis. Surabaya' } },
    mapPicker({ width: MAP.width, height: MAP.height, minLon: MAP.minx, maxLat: MAP.maxy, scale: MAP.scale, padLeft: MAP.padl, padTop: MAP.padt, svg: '/brand/indonesia-land.svg' }),
    { name: 'lat', type: 'number', required: true, min: -11, max: 6, admin: { hidden: true } },
    { name: 'lng', type: 'number', required: true, min: 95, max: 141, admin: { hidden: true } },
    order,
    seedKey,
  ],
}
