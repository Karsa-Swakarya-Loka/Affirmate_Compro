import type { Field, GlobalConfig } from 'payload'
import { globalAccess } from '../lib/access.ts'
import { icon, localizedList, review, text, textarea, upload } from '../lib/fields.ts'
import { previewUrl } from '../lib/admin-preview.ts'

const cta = (name: string): Field => ({ name, type: 'group', fields: [text('label', true), { name: 'href', type: 'text', required: true, defaultValue: '#contact' }] })
const pillars = (name: string, label: string): Field => ({ name, type: 'array', label, maxRows: 6, fields: [icon(), text('title', true), textarea('text', true)] })

/** Every landing-page section in compro order (docs/02). Sections with collections only hold their headings here. */
export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Beranda',
  access: globalAccess,
  versions: { drafts: true },
  admin: { preview: previewUrl('home') },
  fields: [
    { type: 'tabs', tabs: [
      { label: 'Hero', fields: [
        { name: 'hero', type: 'group', fields: [
          text('eyebrow'), text('headline', true), text('highlight', false, 'Kata yang disorot (bagian dari headline)'), textarea('lead', true), upload('image'),
          text('coverLabel', false, 'Teks tile cover ("Company Profile")'), cta('primaryCta'), cta('secondaryCta'),
        ] },
      ] },
      { label: 'About', fields: [
        { name: 'about', type: 'group', fields: [
          text('eyebrow'), text('title', true), text('subtitle'), textarea('body', true), upload('image'),
          textarea('vision'), localizedList('mission', 'Misi'), { name: 'showVisionMission', type: 'checkbox', defaultValue: true },
          { name: 'stats', type: 'array', maxRows: 4, fields: [{ name: 'value', type: 'text', required: true }, text('label', true), text('sublabel'), icon()] },
        ] },
      ] },
      { label: 'Why', fields: [
        { name: 'why', type: 'group', fields: [text('title', true), text('tagline'), textarea('body', true), upload('image'), pillars('pillars', 'Pilar keunggulan')] },
      ] },
      { label: 'Group', fields: [
        { name: 'group', type: 'group', fields: [text('title', true), textarea('body', true)] },
      ] },
      { label: 'Services', fields: [
        { name: 'services', type: 'group', fields: [
          text('eyebrow'), text('title', true), text('subtitle'), textarea('intro', true), upload('image'),
          text('platformTitle'), localizedList('platformPillars', 'Pilar platform (3)'), localizedList('platformScope', 'Cakupan (chip)'),
        ] },
      ] },
      { label: 'Journey', fields: [
        { name: 'journey', type: 'group', fields: [text('title', true), text('subtitle'), textarea('body'), upload('image')] },
      ] },
      { label: 'Clients', fields: [
        { name: 'clients', type: 'group', fields: [text('title', true), text('subtitle'), textarea('body')] },
      ] },
      { label: 'Network', fields: [
        { name: 'network', type: 'group', fields: [text('title', true), text('subtitle'), textarea('body'), pillars('pillars', 'Pilar jaringan')] },
      ] },
      { label: 'Office', fields: [
        { name: 'office', type: 'group', fields: [text('title', true), text('label'), { name: 'gallery', type: 'array', maxRows: 8, fields: [upload('image', true)] }] },
      ] },
      { label: 'Contact', fields: [
        { name: 'contact', type: 'group', fields: [text('title', true), textarea('text'), text('consentText', true)] },
      ] },
      { label: 'Visibilitas', fields: [
        { name: 'sectionsVisible', type: 'group', fields: ['about', 'visionMission', 'stats', 'why', 'group', 'services', 'journey', 'clients', 'network', 'office', 'insights', 'contact']
          .map(name => ({ name, type: 'checkbox' as const, defaultValue: true })) },
      ] },
    ] },
    review,
  ],
}
