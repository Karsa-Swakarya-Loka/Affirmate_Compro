// Shared public shell: skip link → preview bar → Header → page → Footer → WhatsAppFloat.
import type { ReactNode } from 'react'
import { draftMode } from 'next/headers'
import type { Locale } from '@/i18n/config'
import { sectionIds, type SectionId } from '@/i18n/routes'
import { getHome, getLegal, getSite, getUi } from '@/lib/cms'
import { whatsappHref } from '@/lib/whatsapp'
import { Icon } from '@/components/ui/Icon'
import { Header } from './Header'
import { Footer } from './Footer'

/** Sections that exist for navigation: hidden sections (CMS toggle or empty collections) drop out of the menus too. */
export async function visibleSections(locale: Locale): Promise<SectionId[]> {
  const home = await getHome(locale)
  const v = home.sectionsVisible ?? {}
  return sectionIds.filter(id => (v as Record<string, boolean | null | undefined>)[id] !== false)
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
      {wa ? <a className="af-wa" href={wa} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" size={22} /><span>{ui.cta?.whatsapp || 'WhatsApp'}</span></a> : null}
    </>
  )
}
