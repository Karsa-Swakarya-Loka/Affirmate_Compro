// Page metadata for both locales: canonical, hreflang (en / id / x-default), Open Graph and Twitter card.
import 'server-only'
import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'
import { href, type RouteKey } from '@/i18n/routes'
import type { Media } from '@/payload-types'
import { asMedia, getSite } from './cms'

export const SITE_NAME = 'Affirmate Administrative'
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3100').replace(/\/+$/, '')
export const absoluteUrl = (path: string) => `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`
const ogLocale: Record<Locale, string> = { en: 'en_US', id: 'id_ID' }

type PageSeo = {
  locale: Locale
  route: RouteKey
  slug?: string
  title: string
  absoluteTitle?: boolean
  description?: string | null
  image?: unknown
  type?: 'website' | 'article'
  publishedTime?: string | null
  modifiedTime?: string | null
}

function ogImage(media: Media | null) {
  if (!media?.url) return null
  const og = media.sizes?.og
  return og?.url
    ? { url: og.url, width: og.width ?? undefined, height: og.height ?? undefined, alt: media.alt ?? undefined }
    : { url: media.url, width: media.width ?? undefined, height: media.height ?? undefined, alt: media.alt ?? undefined }
}

export async function pageMetadata(p: PageSeo): Promise<Metadata> {
  const site = await getSite(p.locale)
  const path = href(p.locale, p.route, p.slug)
  const fullTitle = p.absoluteTitle ? p.title : `${p.title} | ${SITE_NAME}`
  const description = p.description || site.seoDefault?.description || undefined
  const image = ogImage(asMedia(p.image)) ?? ogImage(asMedia(site.seoDefault?.ogImage)) ?? { url: '/brand/og-default.jpg', width: 1200, height: 630, alt: SITE_NAME }
  const other: Locale = p.locale === 'en' ? 'id' : 'en'
  return {
    metadataBase: new URL(siteUrl),
    title: p.absoluteTitle ? { absolute: p.title } : p.title,
    description,
    alternates: { canonical: path, languages: { en: href('en', p.route, p.slug), id: href('id', p.route, p.slug), 'x-default': href('en', p.route, p.slug) } },
    openGraph: {
      type: p.type ?? 'website', siteName: SITE_NAME, url: path, title: fullTitle, description,
      locale: ogLocale[p.locale], alternateLocale: [ogLocale[other]], images: [image],
      ...(p.type === 'article' ? { publishedTime: p.publishedTime ?? undefined, modifiedTime: p.modifiedTime ?? undefined } : {}),
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [image.url] },
    icons: { icon: [{ url: '/brand/favicon.svg', type: 'image/svg+xml' }, { url: '/icon.png', sizes: '192x192', type: 'image/png' }], apple: '/apple-icon.png' },
  }
}
