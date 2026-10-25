// Server-side CMS reads for the public site. Only published content leaves this module,
// except for an admin who turned on draft preview from /admin (Next draft mode, that browser only).
import 'server-only'
import { cache } from 'react'
import { draftMode } from 'next/headers'
import { getPayload, type Where } from 'payload'
import config from '@payload-config'
import type { City, Client, GroupEntity, Home, Legal, Media, Milestone, Post, Service, Site, Ui } from '@/payload-types'
import type { Locale } from '@/i18n/config'

export const payloadClient = cache(() => getPayload({ config }))

const isPreview = async () => (await draftMode()).isEnabled
const view = async () => ((await isPreview()) ? { draft: true, overrideAccess: true } : { draft: false, overrideAccess: false })
const onlyPublished = async (): Promise<Where> => ((await isPreview()) ? { id: { exists: true } } : { _status: { equals: 'published' } })

type GlobalSlug = 'site' | 'home' | 'legal' | 'ui'
async function readGlobal<T>(slug: GlobalSlug, locale: Locale): Promise<T> {
  const payload = await payloadClient()
  return (await payload.findGlobal({ slug, locale, draft: await isPreview(), depth: 1, overrideAccess: true })) as unknown as T
}
export const getSite = cache((locale: Locale) => readGlobal<Site>('site', locale))
export const getUi = cache((locale: Locale) => readGlobal<Ui>('ui', locale))
export const getHome = cache((locale: Locale) => readGlobal<Home>('home', locale))
export const getLegal = cache((locale: Locale) => readGlobal<Legal>('legal', locale))

async function findAll<T>(collection: 'services' | 'group-entities' | 'milestones' | 'clients', locale: Locale, sort = 'order', depth = 1): Promise<T[]> {
  const payload = await payloadClient()
  const { docs } = await payload.find({ collection, locale, ...(await view()), depth, limit: 100, sort, where: await onlyPublished() })
  return docs as unknown as T[]
}
export const getServices = cache((locale: Locale) => findAll<Service>('services', locale, 'order', 0))
export const getGroupEntities = cache((locale: Locale) => findAll<GroupEntity>('group-entities', locale))
export const getMilestones = cache((locale: Locale) => findAll<Milestone>('milestones', locale, 'year', 0))
export const getClients = cache((locale: Locale) => findAll<Client>('clients', locale))
export const getCities = cache(async (): Promise<City[]> => {
  const payload = await payloadClient()
  const { docs } = await payload.find({ collection: 'cities', depth: 0, limit: 100, sort: 'order', overrideAccess: false })
  return docs as City[]
})

export const getLatestPosts = cache(async (locale: Locale, limit = 3): Promise<Post[]> => {
  const payload = await payloadClient()
  const { docs } = await payload.find({ collection: 'posts', locale, ...(await view()), depth: 1, limit, sort: '-publishedAt', where: await onlyPublished() })
  return docs as Post[]
})
export const getPosts = cache(async (locale: Locale, page = 1, category?: string) => {
  const payload = await payloadClient()
  const where: Where = category ? { and: [await onlyPublished(), { category: { equals: category } }] } : await onlyPublished()
  const result = await payload.find({ collection: 'posts', locale, ...(await view()), depth: 1, limit: 9, page, sort: '-publishedAt', where })
  return { docs: result.docs as Post[], page: result.page ?? 1, totalPages: result.totalPages, totalDocs: result.totalDocs }
})
export const getPost = cache(async (locale: Locale, slug: string): Promise<Post | null> => {
  const payload = await payloadClient()
  const { docs } = await payload.find({ collection: 'posts', locale, ...(await view()), depth: 1, limit: 1, where: { and: [await onlyPublished(), { slug: { equals: slug } }] } })
  return (docs[0] as Post) ?? null
})
export const getSitemapPosts = cache(async () => {
  const payload = await payloadClient()
  const { docs } = await payload.find({ collection: 'posts', depth: 0, limit: 500, draft: false, overrideAccess: false, where: { _status: { equals: 'published' } }, select: { slug: true, updatedAt: true } })
  return docs as Pick<Post, 'slug' | 'updatedAt'>[]
})

/** Upload relations arrive as an object (depth ≥ 1) or an id; only objects with a URL are usable. */
export function asMedia(value: unknown): Media | null {
  if (typeof value !== 'object' || value === null || !('url' in value) || !(value as Media).url) return null
  // Payload returns absolute URLs (serverURL). next/image and canonical links want same-origin paths.
  // A replaced file keeps its name while optimised images are cached for a year by URL, so the URL carries the
  // document's updatedAt: a new upload (CMS or seed) shows at once instead of after the cache expires.
  const m = value as Media
  const stamp = m.updatedAt ? `?v=${Date.parse(m.updatedAt).toString(36)}` : ''
  const strip = (u?: string | null) => (u ? u.replace(/^https?:\/\/[^/]+/, '') + (u.includes('?') ? '' : stamp) : u)
  const sizes = m.sizes ? Object.fromEntries(Object.entries(m.sizes).map(([k, s]) => [k, s ? { ...s, url: strip(s.url) } : s])) : m.sizes
  return { ...m, url: strip(m.url), sizes } as Media
}
