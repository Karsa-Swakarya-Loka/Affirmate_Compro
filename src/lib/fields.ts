import type { Field } from 'payload'

export const text = (name: string, required = false, label?: string): Field => ({ name, type: 'text', localized: true, required, ...(label ? { label } : {}) })
export const textarea = (name: string, required = false, label?: string): Field => ({ name, type: 'textarea', localized: true, required, ...(label ? { label } : {}) })
export const richText = (name: string, required = false): Field => ({ name, type: 'richText', localized: true, required })
export const upload = (name: string, required = false): Field => ({ name, type: 'upload', relationTo: 'media', required })
export const review: Field = { name: 'needsReview', type: 'checkbox', defaultValue: false, label: 'Perlu review klien', admin: { position: 'sidebar', description: 'Dicentang untuk teks dari compro/terjemahan yang belum disetujui klien.' } }
export const seedKey: Field = { name: 'seedKey', type: 'text', unique: true, index: true, admin: { readOnly: true, position: 'sidebar' } }
export const seo = (name = 'seo'): Field => ({ name, type: 'group', label: 'SEO', fields: [text('title'), textarea('description'), upload('ogImage')] })
export const slug: Field = { name: 'slug', type: 'text', required: true, unique: true, index: true, validate: (value: unknown) => (typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) || 'Gunakan slug huruf kecil dan tanda hubung.' }
export const order: Field = { name: 'order', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } }
/** Phosphor icon names used by the design (design/README.md). */
export const iconOptions = ['monitor', 'timer', 'shield-check', 'map-trifold', 'globe', 'globe-hemisphere-east', 'trend-up', 'map-pin', 'handshake', 'users-three', 'bank', 'identification-card', 'identification-badge', 'wallet', 'user-check', 'buildings', 'briefcase', 'envelope-simple', 'phone', 'check', 'file-text', 'calendar'] as const
export const icon = (name = 'icon'): Field => ({ name, type: 'select', options: [...iconOptions], defaultValue: 'check' })
export const localizedList = (name: string, label?: string): Field => ({ name, type: 'array', ...(label ? { label } : {}), fields: [text('label', true)] })
