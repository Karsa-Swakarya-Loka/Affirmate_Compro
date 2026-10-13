// "Preview" button in /admin → /preview?path=… on this site, in the locale the editor is working in.
import type { Locale } from '../i18n/config.ts'
import { href, type RouteKey } from '../i18n/routes.ts'

const origin = () => (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3100').replace(/\/+$/, '')
const localeOf = (value: unknown): Locale => (value === 'id' ? 'id' : 'en')

export function previewUrl(route: RouteKey, slugField = false) {
  return (doc: Record<string, unknown>, { locale }: { locale?: unknown }) => {
    const slug = slugField ? (typeof doc.slug === 'string' && doc.slug ? doc.slug : null) : undefined
    if (slug === null) return null
    return `${origin()}/preview?path=${encodeURIComponent(href(localeOf(locale), route, slug ?? undefined))}`
  }
}
