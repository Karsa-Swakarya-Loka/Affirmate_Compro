import { readFile } from 'node:fs/promises'
import path from 'node:path'
import type { Locale } from '../i18n/config.ts'
import { mediaAlt, retiredServices, seedFiles } from './manifest.ts'
import { alignArrayIDs, atPath, emptyToUndefined, labels, list, localized, object, richText, type Data } from './normalize.ts'
import type { SeedCollection, SeedStore } from './store.ts'

const LOCALES: Locale[] = ['en', 'id']

/**
 * Idempotent seed: every document has a stable key (seedKey/slug/name/year). First run creates,
 * later runs only fill locales that are still empty, unless `overwrite` is set (SEED_OVERWRITE=true).
 */
export async function runSeed(store: SeedStore, root: string, overwrite = false) {
  const sources: Record<string, unknown> = Object.fromEntries(await Promise.all(
    seedFiles.map(async name => [name, JSON.parse(await readFile(path.join(root, 'content/seed', name + '.json'), 'utf8'))]),
  ))
  const mediaIDs = new Map<string, number | string>()
  const media = (source: unknown): number | string | undefined => {
    if (!source) return undefined
    const id = mediaIDs.get(String(source))
    if (id == null) throw new Error('Seed asset not uploaded: ' + source)
    return id
  }

  async function upsert(collection: SeedCollection, key: string, value: string, data: (locale: Locale) => Data, marker: string, filePath?: string) {
    let doc = await store.find(collection, key, value, 'en')
    if (!doc) doc = await store.create(collection, data('en'), 'en', filePath)
    else if (overwrite) doc = await store.update(collection, doc.id as number | string, object(alignArrayIDs(data('en'), doc)), 'en')
    const idDoc = await store.find(collection, key, value, 'id')
    if (overwrite || !idDoc || !atPath(idDoc, marker)) await store.update(collection, doc.id as number | string, object(alignArrayIDs(data('id'), doc)), 'id')
    return doc.id as number | string
  }

  // 1. Media from design/assets (never from anywhere else).
  for (const [source, alt] of Object.entries(mediaAlt)) {
    const filename = path.resolve(root, source)
    if (!filename.startsWith(path.resolve(root, 'design/assets') + path.sep)) throw new Error('Seed media outside design/assets: ' + source)
    mediaIDs.set(source, await upsert('media', 'seedKey', source, locale => ({ seedKey: source, alt: alt[locale], _status: 'published' }), 'alt', filename))
  }

  // 2. Collections.
  const counts: Record<string, number> = { media: mediaIDs.size }
  for (const slug of retiredServices) {
    const doc = await store.find('services', 'slug', slug, 'en')
    if (doc) await store.delete('services', doc.id as number | string)
  }
  for (const raw of list(sources.services)) {
    const slug = String(raw.slug)
    await upsert('services', 'slug', slug, locale => {
      const d = object(localized(raw, locale))
      const groups = list(d.groups).map(g => ({ title: g.title, label: emptyToUndefined(g.label), items: labels(g.items) }))
      return { ...d, items: labels(d.items), groups, seedKey: slug, needsReview: raw.needsReview === true, _status: 'published' }
    }, 'title')
    counts.services = (counts.services ?? 0) + 1
  }
  for (const raw of list(sources['group-entities'])) {
    const key = String(raw.name)
    await upsert('group-entities', 'seedKey', key, locale => {
      const d = object(localized(raw, locale))
      return { ...d, bullets: labels(d.bullets), logo: media(raw.logo), url: emptyToUndefined(d.url), seedKey: key, _status: 'published' }
    }, 'category')
    counts.groupEntities = (counts.groupEntities ?? 0) + 1
  }
  for (const raw of list(sources.milestones)) {
    const key = `milestone-${raw.year}`
    await upsert('milestones', 'seedKey', key, locale => ({ ...object(localized(raw, locale)), seedKey: key, _status: 'published' }), 'label')
    counts.milestones = (counts.milestones ?? 0) + 1
  }
  for (const raw of list(sources.clients)) {
    const key = String(raw.name)
    // Logos stay draft until the client confirms permission (Clients hook enforces consent on publish).
    await upsert('clients', 'seedKey', key, () => ({ name: raw.name, logo: media(raw.logo), url: emptyToUndefined(raw.url), order: raw.order, consent: raw.consent === true, seedKey: key, _status: raw.consent === true ? 'published' : 'draft' }), 'name')
    counts.clients = (counts.clients ?? 0) + 1
  }
  for (const raw of list(sources.cities)) {
    const key = String(raw.name)
    if (typeof raw.lat !== 'number' || typeof raw.lng !== 'number') throw new Error('Invalid city coordinates: ' + key)
    await upsert('cities', 'seedKey', key, () => ({ name: raw.name, lat: raw.lat, lng: raw.lng, order: raw.order, seedKey: key }), 'name')
    counts.cities = (counts.cities ?? 0) + 1
  }

  for (const raw of list(sources.posts)) {
    const slug = String(raw.slug)
    await upsert('posts', 'slug', slug, locale => {
      const d = object(localized(raw, locale))
      return { ...d, body: richText(d.body as string[]), cover: media(raw.cover), seedKey: slug, needsReview: raw.needsReview === true, _status: raw._status === 'published' ? 'published' : 'draft' }
    }, 'title')
    counts.posts = (counts.posts ?? 0) + 1
  }

  // 3. Globals.
  const globals: { slug: string; source: string; marker: string; shape: (d: Data, raw: Data) => Data }[] = [
    { slug: 'site', source: 'site', marker: 'seoDefault.title', shape: (d) => ({
      ...d, logo: media(d.logo), logoWhite: media(d.logoWhite), whatsapp: emptyToUndefined(d.whatsapp), mapsUrl: emptyToUndefined(d.mapsUrl),
      social: list(d.social).filter(s => s.url).map(s => ({ platform: s.platform, url: s.url })),
      seoDefault: { ...object(d.seoDefault), ogImage: media(object(d.seoDefault).ogImage) },
      inquiryRecipients: (d.inquiryRecipients as string[]).map(email => ({ email })), needsReview: undefined, _status: 'published',
    }) },
    { slug: 'home', source: 'home', marker: 'hero.headline', shape: (d) => {
      const hero = object(d.hero); const about = object(d.about); const why = object(d.why); const services = object(d.services)
      const journey = object(d.journey); const network = object(d.network); const office = object(d.office); const leadership = object(d.leadership)
      return {
        hero: { ...hero, image: media(hero.image) },
        about: { ...about, image: media(about.image), mission: labels(about.mission), needsReview: undefined },
        leadership: { ...leadership, body: emptyToUndefined(leadership.body), people: list(leadership.people).map(p => ({ name: p.name, role: p.role, photo: media(p.photo) })) },
        why: { ...why, image: media(why.image) },
        group: d.group,
        services: { ...services, image: media(services.image), platformPillars: labels(list(services.platformPillars).map(p => p.title)), platformScope: labels(list(services.platformScope).map(p => p.label)) },
        journey: { ...journey, image: media(journey.image), needsReview: undefined },
        clients: d.clients,
        network,
        office: { ...office, gallery: (office.gallery as string[]).map(src => ({ image: media(src) })) },
        contact: { ...object(d.contact), needsReview: undefined },
        sectionsVisible: d.sectionsVisible,
        needsReview: true, _status: 'published',
      }
    } },
    { slug: 'legal', source: 'legal', marker: 'privacyTitle', shape: (d) => ({ privacyTitle: d.privacyTitle, privacyBody: richText(d.privacyBody as string[]), updatedAt: d.updatedAt, _status: 'published' }) },
    { slug: 'ui', source: 'ui-dictionary', marker: 'nav.about', shape: (d) => ({ ...d, _status: 'published' }) },
  ]
  for (const g of globals) {
    const raw = object(sources[g.source])
    for (const locale of LOCALES) {
      const current = await store.global(g.slug, locale)
      if (overwrite || !atPath(current, g.marker)) {
        const data = g.shape(object(localized(raw, locale)), raw)
        await store.updateGlobal(g.slug, object(alignArrayIDs(data, current)), locale)
      }
    }
    counts.globals = (counts.globals ?? 0) + 1
  }
  return counts
}
