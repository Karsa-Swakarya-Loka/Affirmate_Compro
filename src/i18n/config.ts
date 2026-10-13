// English is the default (compro is English, audience is foreign investors); Indonesian lives under /id.
export const locales = ['en', 'id'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'
export const localization = {
  locales: [{ code: 'en', label: 'English' }, { code: 'id', label: 'Bahasa Indonesia' }],
  defaultLocale,
  fallback: true,
}
