// Shared public shell: skip link → preview bar → Header → page → Footer → WhatsAppFloat.
import type { ReactNode } from 'react'
import { draftMode } from 'next/headers'
import type { Locale } from '@/i18n/config'
import { sectionIds, type SectionId } from '@/i18n/routes'
import { getCities, getClients, getGroupEntities, getHome, getLatestPosts, getLegal, getMilestones, getServices, getSite, getUi } from '@/lib/cms'
import { whatsappHref } from '@/lib/whatsapp'
import { Icon } from '@/components/ui/Icon'
import { Header } from './Header'
import { Footer } from './Footer'

/** Which home sections render: off when their CMS toggle is off or their collection is empty. Shared by the home page
 * and every other page's menus, so no menu links to a section the home page doesn't show. Reads are request-cached. */
export async function sectionVisibility(locale: Locale): Promise<Record<SectionId, boolean>> {
  const [home, services, entities, milestones, clients, cities, posts] = await Promise.all([
    getHome(locale), getServices(locale), getGroupEntities(locale), getMilestones(locale), getClients(locale), getCities(), getLatestPosts(locale),
  ])
  const v = (home.sectionsVisible ?? {}) as Record<string, boolean | null | undefined>
  const on = (id: string) => v[id] !== false
  return {
    about: on('about'), leadership: on('leadership') && (home.leadership?.people ?? []).some(p => p.photo), why: on('why') && Boolean(home.why?.title), group: on('group') && entities.length > 0, services: on('services') && services.length > 0,
    journey: on('journey') && milestones.length > 0, clients: on('clients') && clients.length > 0, network: on('network') && cities.length > 0,
    office: on('office') && Boolean(home.office?.title), insights: on('insights') && posts.length > 0, contact: on('contact'),
  }
}

export async function visibleSections(locale: Locale): Promise<SectionId[]> {
  const show = await sectionVisibility(locale)
  return sectionIds.filter(id => show[id])
}

export async function SiteShell({ locale, children, sections }: { locale: Locale; children: ReactNode; sections?: SectionId[] }) {
  const [site, ui, legal, preview] = await Promise.all([getSite(locale), getUi(locale), getLegal(locale), draftMode()])
  const navSections = sections ?? (await visibleSections(locale))
  const wa = whatsappHref(site.whatsapp)
  return (
    <>
      <a className="af-skip" href="#content">{ui.a11y?.skipToContent || 'Skip to content'}</a>
      {preview.isEnabled ? (
        <form className="af-previewbar" action="/preview/exit" method="post" role="status">
          <span>{ui.a11y?.previewOn || 'Draft preview is on'}</span><button type="submit">{ui.a11y?.previewExit || 'Exit preview'}</button>
        </form>
      ) : null}
      <Header locale={locale} site={site} ui={ui} sections={navSections} />
      <main id="content" tabIndex={-1}>{children}</main>
      <Footer locale={locale} site={site} ui={ui} sections={navSections} showPrivacy={Boolean(legal?.privacyTitle)} />
      {wa ? <a className="af-wa" href={wa} target="_blank" rel="noopener noreferrer" aria-label={ui.cta?.whatsapp || 'WhatsApp'}><Icon name="whatsapp" size={22} /><span>{ui.cta?.whatsapp || 'WhatsApp'}</span></a> : null}
    </>
  )
}
