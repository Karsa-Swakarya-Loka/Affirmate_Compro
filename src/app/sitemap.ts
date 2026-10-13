// /sitemap.xml — public pages and published posts in both languages, each with its hreflang pair.
import type { MetadataRoute } from 'next'
import { href, type RouteKey } from '@/i18n/routes'
import { getLegal, getSitemapPosts } from '@/lib/cms'
import { absoluteUrl } from '@/lib/seo'

export const dynamic = 'force-dynamic'

function pair(key: RouteKey, slug: string | undefined, extra: Omit<MetadataRoute.Sitemap[number], 'url'>): MetadataRoute.Sitemap {
  const languages = { en: absoluteUrl(href('en', key, slug)), id: absoluteUrl(href('id', key, slug)), 'x-default': absoluteUrl(href('en', key, slug)) }
  return (['en', 'id'] as const).map(locale => ({ url: absoluteUrl(href(locale, key, slug)), alternates: { languages }, ...extra }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, legal] = await Promise.all([getSitemapPosts(), getLegal('en')])
  return [
    ...pair('home', undefined, { priority: 1, changeFrequency: 'weekly' }),
    ...(posts.length ? pair('insights', undefined, { priority: 0.6, changeFrequency: 'weekly' }) : []),
    ...(legal?.privacyTitle ? pair('privacy', undefined, { priority: 0.2, changeFrequency: 'yearly' }) : []),
    ...posts.flatMap(p => pair('insights', p.slug, { lastModified: p.updatedAt, priority: 0.5, changeFrequency: 'monthly' })),
  ]
}
