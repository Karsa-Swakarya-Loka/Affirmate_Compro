import type { Field, GlobalConfig } from 'payload'
import { globalAccess } from '../lib/access.ts'
import { text } from '../lib/fields.ts'

const group = (name: string, keys: string[]): Field => ({ name, type: 'group', fields: keys.map(k => text(k)) })

/** UI labels in both languages (seed: content/seed/ui-dictionary.json). */
export const Ui: GlobalConfig = {
  slug: 'ui',
  label: 'Teks antarmuka',
  access: globalAccess,
  versions: { drafts: true },
  fields: [
    group('nav', ['about', 'why', 'group', 'services', 'journey', 'clients', 'network', 'office', 'insights', 'contact']),
    group('cta', ['contact', 'services', 'whatsapp', 'readMore', 'allInsights', 'openMaps', 'visitGroup']),
    group('form', ['name', 'company', 'email', 'phone', 'country', 'services', 'message', 'submit', 'sending', 'success', 'error', 'required', 'invalid', 'consentRequired', 'rateLimited']),
    group('sections', ['youAreHere', 'memberOf', 'headOffice', 'phone', 'email', 'address', 'latestInsights', 'relatedPosts', 'categoryAll', 'categoryRegulatoryUpdate', 'categoryGuide', 'categoryCompanyNews']),
    group('footer', ['rights', 'privacy', 'mapCredit']),
    group('lang', ['switchTo', 'label']),
    group('notFound', ['title', 'text', 'home']),
    group('a11y', ['skipToContent', 'openMenu', 'closeMenu', 'previewOn', 'previewExit']),
  ],
}
