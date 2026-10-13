// CMS sidebar and dashboard index, in the order the team works: change a page, manage the content lists, answer new
// messages, then settings. Labels come from each collection/global (see nav.ts).
import type { NavMap } from './nav'

export const NAV_MAP: NavMap = [
  { label: 'Ubah halaman', items: [
    { global: 'home', icon: 'home' },
    { global: 'legal', icon: 'shield' },
  ] },
  { label: 'Kelola isi', items: [
    { collection: 'services', icon: 'briefcase' },
    { collection: 'posts', icon: 'newspaper' },
    { collection: 'group-entities', icon: 'layers' },
    { collection: 'milestones', icon: 'flag' },
    { collection: 'clients', icon: 'building' },
    { collection: 'cities', icon: 'pin' },
    { collection: 'media', icon: 'image' },
  ] },
  { label: 'Pesan', items: [
    { collection: 'inquiries', icon: 'inbox', badge: { status: { equals: 'new' } } },
  ] },
  { label: 'Pengaturan', items: [
    { global: 'site', icon: 'sliders' },
    { global: 'ui', icon: 'type' },
    { collection: 'users', icon: 'users' },
  ] },
]
