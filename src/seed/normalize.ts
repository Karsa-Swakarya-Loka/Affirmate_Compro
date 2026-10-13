import type { Locale } from '../i18n/config.ts'

export type Data = Record<string, unknown>
export function isObject(value: unknown): value is Data {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
export function object(value: unknown): Data {
  if (!isObject(value)) throw new Error('Expected a seed object')
  return value
}
export function list(value: unknown): Data[] {
  if (!Array.isArray(value)) throw new Error('Expected a seed array')
  return value.map(object)
}
/** Picks one locale out of {en, id} leaves and drops `_meta` keys (seed notes). */
export function localized(value: unknown, locale: Locale): unknown {
  if (Array.isArray(value)) return value.map(item => localized(item, locale))
  if (!isObject(value)) return value
  if ('en' in value && 'id' in value && Object.keys(value).every(k => k === 'en' || k === 'id')) return value[locale]
  return Object.fromEntries(Object.entries(value).filter(([key]) => !key.startsWith('_')).map(([key, item]) => [key, localized(item, locale)]))
}
/** Array of plain strings → Payload array rows [{ label }]. */
export const labels = (value: unknown): { label: string }[] => (Array.isArray(value) ? value.map(v => ({ label: String(isObject(v) && 'label' in v ? v.label : v) })) : [])
export function richText(paragraphs: string[]) {
  return { root: { type: 'root', version: 1, direction: null, format: '', indent: 0, children: paragraphs.map(text => ({
    type: 'paragraph', version: 1, direction: null, format: '', indent: 0, textFormat: 0, textStyle: '',
    children: [{ type: 'text', version: 1, detail: 0, format: 0, mode: 'normal', style: '', text }],
  })) } }
}
/** Reuse row IDs of existing arrays on the second locale write so Payload updates instead of duplicating rows. */
export function alignArrayIDs(value: unknown, existing: unknown): unknown {
  if (Array.isArray(value)) {
    const rows = Array.isArray(existing) ? existing : []
    return value.map((row, i) => {
      const aligned = alignArrayIDs(row, rows[i])
      return isObject(aligned) && isObject(rows[i]) && rows[i].id ? { ...aligned, id: rows[i].id } : aligned
    })
  }
  if (!isObject(value)) return value
  const current = isObject(existing) ? existing : {}
  return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, alignArrayIDs(v, current[k])]))
}
export function atPath(value: unknown, dotted: string): unknown {
  return dotted.split('.').reduce<unknown>((result, key) => (isObject(result) ? result[key] : undefined), value)
}
export const emptyToUndefined = (v: unknown) => (v === '' || v === null ? undefined : v)
