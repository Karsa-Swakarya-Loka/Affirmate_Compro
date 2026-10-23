// Landing page: every section in compro order, hidden when its CMS toggle is off or its collection is empty.
import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'
import { href, type SectionId } from '@/i18n/routes'
import { asMedia, getCities, getClients, getGroupEntities, getHome, getLatestPosts, getMilestones, getServices, getSite, getUi } from '@/lib/cms'
import { pageMetadata } from '@/lib/seo'
import { SiteShell, sectionVisibility } from '@/components/layout/SiteShell'
import { Reveal } from '@/components/motion/Reveal'
import { JsonLd, organizationLd, servicesLd } from '@/components/seo/JsonLd'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Leadership } from '@/components/sections/Leadership'
import { Why } from '@/components/sections/Why'
import { Group } from '@/components/sections/Group'
import { Services } from '@/components/sections/Services'
import { Journey } from '@/components/sections/Journey'
import { Clients } from '@/components/sections/Clients'
import { Network } from '@/components/sections/Network'
import { Office } from '@/components/sections/Office'
import { Insights } from '@/components/sections/Insights'
import { Contact } from '@/components/sections/Contact'

export async function homeMetadata(locale: Locale): Promise<Metadata> {
  const site = await getSite(locale)
  return pageMetadata({ locale, route: 'home', title: site.seoDefault?.title || site.brandName, absoluteTitle: true, description: site.seoDefault?.description, image: site.seoDefault?.ogImage })
}

export async function HomePage({ locale }: { locale: Locale }) {
  const [site, ui, home, services, entities, milestones, clients, cities, posts] = await Promise.all([
    getSite(locale), getUi(locale), getHome(locale), getServices(locale), getGroupEntities(locale), getMilestones(locale), getClients(locale), getCities(), getLatestPosts(locale),
  ])
  const show = await sectionVisibility(locale)
  const on = (id: string) => (home.sectionsVisible as Record<string, boolean | null | undefined> | undefined)?.[id] !== false
  const sections = (Object.keys(show) as SectionId[]).filter(k => show[k])
  const aboutLabels = { vision: locale === 'id' ? 'Visi Kami' : 'Our Vision', mission: locale === 'id' ? 'Misi Kami' : 'Our Mission' }
  return (
    <SiteShell locale={locale} sections={sections}>
      <JsonLd data={organizationLd(site, asMedia(site.logo)?.url, href(locale, 'home'))} />
      {show.services ? <JsonLd data={servicesLd(services, site)} /> : null}
      {home.hero ? (
        <Hero
          hero={home.hero}
          points={(home.services?.platformPillars ?? []).map(p => p.label).filter(Boolean)}
          stats={on('stats') ? (home.about?.stats ?? []).map(s => ({ value: s.value, label: s.label })) : []}
          nextStep={show.contact ? home.contact?.text : null}
        />
      ) : null}
      {show.about && home.about ? <Reveal><About about={home.about} showVisionMission={on('visionMission') && home.about.showVisionMission !== false} showStats={on('stats')} labels={aboutLabels} /></Reveal> : null}
      {show.leadership && home.leadership ? <Reveal><Leadership block={home.leadership} /></Reveal> : null}
      {show.why && home.why ? <Reveal><Why why={home.why} /></Reveal> : null}
      {show.group && home.group ? <Reveal><Group group={home.group} entities={entities} /></Reveal> : null}
      {show.services && home.services ? <Reveal><Services block={home.services} services={services} cta={show.contact ? { label: ui.cta?.contact || 'Contact Us', href: href(locale, 'home', undefined, 'contact') } : undefined} /></Reveal> : null}
      {show.journey && home.journey ? <Reveal><Journey block={home.journey} milestones={milestones} /></Reveal> : null}
      {show.clients && home.clients ? <Reveal><Clients block={home.clients} clients={clients} /></Reveal> : null}
      {show.network && home.network ? <Reveal><Network block={home.network} cities={cities} mapLabel={`${home.network.title}: ${cities.length}`} /></Reveal> : null}
      {show.office && home.office ? <Reveal><Office block={home.office} site={site} ui={ui} /></Reveal> : null}
      {show.insights ? <Reveal><Insights locale={locale} posts={posts} ui={ui} /></Reveal> : null}
      {show.contact && home.contact ? <Reveal><Contact block={home.contact} site={site} ui={ui} services={services} locale={locale} /></Reveal> : null}
    </SiteShell>
  )
}
