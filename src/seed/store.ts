import type { DataFromCollectionSlug, GlobalSlug, Payload, RequiredDataFromCollectionSlug } from 'payload'
import type { Locale } from '../i18n/config.ts'
import type { Data } from './normalize.ts'

export type SeedCollection = 'services' | 'group-entities' | 'milestones' | 'clients' | 'cities' | 'posts' | 'media'
export interface SeedStore {
  find(collection: SeedCollection, key: string, value: string, locale: Locale): Promise<Data | undefined>
  create(collection: SeedCollection, data: Data, locale: Locale, filePath?: string): Promise<Data>
  /** With `filePath`, the stored file is replaced too (overwrite of a changed asset). */
  update(collection: SeedCollection, id: string | number, data: Data, locale: Locale, filePath?: string): Promise<Data>
  delete(collection: SeedCollection, id: string | number): Promise<void>
  global(slug: string, locale: Locale): Promise<Data>
  updateGlobal(slug: string, data: Data, locale: Locale): Promise<Data>
}
export function payloadStore(payload: Payload): SeedStore {
  return {
    async find(collection, key, value, locale) {
      const result = await payload.find({ collection, where: { [key]: { equals: value } }, locale, fallbackLocale: false, depth: 0, limit: 1, draft: true, overrideAccess: true })
      return result.docs[0] as unknown as Data | undefined
    },
    async create(collection, data, locale, filePath) {
      return (await payload.create({ collection, data: data as RequiredDataFromCollectionSlug<SeedCollection>, locale, depth: 0, overrideAccess: true, ...(filePath ? { filePath } : {}) })) as unknown as Data
    },
    async update(collection, id, data, locale, filePath) {
      return (await payload.update({ collection, id, data: data as Partial<DataFromCollectionSlug<SeedCollection>>, locale, depth: 0, overrideAccess: true, ...(filePath ? { filePath, overwriteExistingFiles: true } : {}) })) as unknown as Data
    },
    async delete(collection, id) {
      await payload.delete({ collection, id, depth: 0, overrideAccess: true })
    },
    async global(slug, locale) {
      return (await payload.findGlobal({ slug: slug as GlobalSlug, locale, fallbackLocale: false, depth: 0, draft: true, overrideAccess: true })) as unknown as Data
    },
    async updateGlobal(slug, data, locale) {
      const args = { slug: slug as GlobalSlug, data, locale, depth: 0, overrideAccess: true }
      return (await payload.updateGlobal(args as Parameters<Payload['updateGlobal']>[0])) as unknown as Data
    },
  }
}
