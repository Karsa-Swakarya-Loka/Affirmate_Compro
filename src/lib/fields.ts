import type { Field, Tab } from 'payload'

// Field helpers. Labels and help texts are for the client's team (CMS in Indonesian). Layout helpers (row, tab,
// collapsible) are presentational only: they never change the stored data shape, so no migration is needed.
type Opts = { description?: string; width?: string; placeholder?: string; sidebar?: boolean }
const ui = (label?: string, o?: Opts) => {
  const admin = {
    ...(o?.description ? { description: o.description } : {}),
    ...(o?.width ? { width: o.width } : {}),
    ...(o?.placeholder ? { placeholder: o.placeholder } : {}),
    ...(o?.sidebar ? { position: 'sidebar' as const } : {}),
  }
  return { ...(label ? { label } : {}), ...(Object.keys(admin).length ? { admin } : {}) }
}
export const text = (name: string, required = false, label?: string, o?: Opts): Field => ({ name, type: 'text', localized: true, required, ...ui(label, o) })
export const textarea = (name: string, required = false, label?: string, o?: Opts): Field => ({ name, type: 'textarea', localized: true, required, ...ui(label, o) })
export const richText = (name: string, required = false, label?: string, o?: Opts): Field => ({ name, type: 'richText', localized: true, required, ...ui(label, o) })
export const upload = (name: string, required = false, label?: string, o?: Opts): Field => ({ name, type: 'upload', relationTo: 'media', required, ...ui(label, o) })

/** Layout: fields side by side (widths per field via `width`). */
export const row = (...fields: Field[]): Field => ({ type: 'row', fields })
export const tab = (label: string, fields: Field[], description?: string): Tab => ({ label, fields, ...(description ? { description } : {}) })
export const tabs = (...list: Tab[]): Field => ({ type: 'tabs', tabs: list })
export const collapsible = (label: string, fields: Field[], open = false): Field => ({ type: 'collapsible', label, fields, admin: { initCollapsed: !open } })
/** Wrap a group so its fields sit directly in a tab (no extra box or heading). */
export const flat = (name: string, fields: Field[]): Field => ({ name, type: 'group', label: false, admin: { hideGutter: true }, fields })

/** Collapsed array rows show their content; lists start folded so long forms stay short. */
export const rowLabel = { components: { RowLabel: '/components/admin/RowLabel#RowLabel' } }
export const listAdmin = (description?: string) => ({ initCollapsed: true, ...rowLabel, ...(description ? { description } : {}) })
/** List-view cell: a tick instead of "true/false". */
export const checkCell = { components: { Cell: '/components/admin/CheckCell#CheckCell' } }
export const checkbox = (name: string, label: string, o?: { description?: string; defaultValue?: boolean; sidebar?: boolean; width?: string }): Field => ({
  name, type: 'checkbox', label, defaultValue: o?.defaultValue ?? false,
  admin: { ...checkCell, ...(o?.description ? { description: o.description } : {}), ...(o?.sidebar ? { position: 'sidebar' as const } : {}), ...(o?.width ? { width: o.width } : {}) },
})

export const review: Field = checkbox('needsReview', 'Masih perlu disetujui klien', {
  sidebar: true, description: 'Tercentang = teks masih dari compro/terjemahan dan belum disetujui klien. Hapus centang setelah disetujui. Tidak mengubah tampilan situs.',
})
export const seedKey: Field = { name: 'seedKey', type: 'text', unique: true, index: true, admin: { readOnly: true, position: 'sidebar', hidden: true } }
export const seo = (name = 'seo'): Field => collapsible('SEO: judul & deskripsi di Google (opsional)', [
  { name, type: 'group', label: false, admin: { hideGutter: true }, fields: [
    text('title', false, 'Judul di Google', { description: 'Kosongkan untuk memakai judul halaman.' }),
    textarea('description', false, 'Deskripsi di Google', { description: '1–2 kalimat, sekitar 150 karakter.' }),
    upload('ogImage', false, 'Gambar saat dibagikan (WhatsApp, LinkedIn)'),
  ] },
])
const slugify = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
export const slug: Field = {
  name: 'slug', type: 'text', required: true, unique: true, index: true, label: 'Alamat halaman (slug)',
  admin: { position: 'sidebar', description: 'Terisi otomatis dari judul. Huruf kecil dan tanda hubung.' },
  hooks: { beforeValidate: [({ value, siblingData }) => value || (typeof siblingData?.title === 'string' ? slugify(siblingData.title) : value)] },
  validate: (value: unknown) => (typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) || 'Gunakan huruf kecil, angka dan tanda hubung.',
}
export const order: Field = { name: 'order', type: 'number', defaultValue: 0, label: 'Urutan tampil', admin: { position: 'sidebar', description: 'Angka kecil tampil lebih dulu.' } }
/** Phosphor icon names used by the design (design/README.md). */
export const iconOptions = ['monitor', 'timer', 'shield-check', 'map-trifold', 'globe', 'globe-hemisphere-east', 'trend-up', 'map-pin', 'handshake', 'users-three', 'bank', 'identification-card', 'identification-badge', 'wallet', 'user-check', 'buildings', 'briefcase', 'envelope-simple', 'phone', 'check', 'file-text', 'calendar'] as const
const iconLabels: Record<(typeof iconOptions)[number], string> = {
  monitor: 'Monitor', timer: 'Waktu', 'shield-check': 'Perisai', 'map-trifold': 'Peta', globe: 'Globe', 'globe-hemisphere-east': 'Globe (Asia)', 'trend-up': 'Grafik naik',
  'map-pin': 'Pin lokasi', handshake: 'Jabat tangan', 'users-three': 'Tim', bank: 'Bank', 'identification-card': 'Kartu identitas', 'identification-badge': 'Lencana',
  wallet: 'Dompet', 'user-check': 'Orang terverifikasi', buildings: 'Gedung', briefcase: 'Koper kerja', 'envelope-simple': 'Amplop', phone: 'Telepon', check: 'Centang',
  'file-text': 'Dokumen', calendar: 'Kalender',
}
export const icon = (name = 'icon', width?: string): Field => ({ name, type: 'select', label: 'Ikon', defaultValue: 'check',
  options: iconOptions.map(value => ({ label: iconLabels[value], value })), ...(width ? { admin: { width } } : {}) })
export const localizedList = (name: string, label?: string, description?: string): Field => ({
  name, type: 'array', ...(label ? { label } : {}), labels: { singular: 'Butir', plural: 'Butir' }, admin: listAdmin(description),
  fields: [text('label', true, 'Teks')],
})
/** City pin: name + map picker; lat/lng stay in the data but are set by the picker. */
export const mapPicker = (geo: Record<string, number | string>): Field => ({ name: 'mapPicker', type: 'ui', admin: { components: { Field: { path: '/components/admin/CityPointField#CityPointField', clientProps: { geo } } } } })
