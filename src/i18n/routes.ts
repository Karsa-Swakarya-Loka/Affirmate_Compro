// Route table: English has no prefix, Indonesian lives under /id. Static segments are localized; post slugs are shared.
import type { Locale } from './config.ts'

export const routeKeys = ['home', 'insights', 'privacy'] as const
export type RouteKey = (typeof routeKeys)[number]

const segments: Record<RouteKey, Record<Locale, string>> = {
  home: { en: '', id: '' },
  insights: { en: 'insights', id: 'wawasan' },
  privacy: { en: 'privacy', id: 'privasi' },
}

/** Locale of a public pathname: anything under /id is Indonesian, the rest English. */
export function localeFromPath(pathname: string): Locale {
  return pathname === '/id' || pathname.startsWith('/id/') ? 'id' : 'en'
}

/** href for a route key in a locale, optionally followed by a slug and/or a hash. */
export function href(locale: Locale, key: RouteKey, slug?: string, hash?: string): string {
  const parts = [locale === 'id' ? 'id' : '', segments[key][locale], slug ?? ''].filter(Boolean)
  return `/${parts.join('/')}${hash ? `#${hash}` : ''}`
}

/** The same page in the other locale, keeping slug, query and hash. Unknown paths fall back to that locale's home. */
export function switchLocalePath(pathname: string, target: Locale, search = '', hash = ''): string {
  const from = localeFromPath(pathname)
  const rest = pathname.split('/').filter(Boolean)
  if (from === 'id') rest.shift()
  const [first = '', ...tail] = rest
  const key = routeKeys.find(k => segments[k][from] === first)
  if (key === undefined) return href(target, 'home')
  return `${href(target, key, tail.join('/') || undefined)}${search}${hash}`
}

/** Section anchors on the landing page, in compro order. */
export const sectionIds = ['about', 'why', 'group', 'services', 'journey', 'clients', 'network', 'office', 'insights', 'contact'] as const
export type SectionId = (typeof sectionIds)[number]
