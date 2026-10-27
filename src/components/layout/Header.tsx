import Image from 'next/image'
import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import { href, type SectionId } from '@/i18n/routes'
import type { Site, Ui } from '@/payload-types'
import { asMedia } from '@/lib/cms'
import { HeaderNav, type NavItem } from './HeaderNav'

type Props = { locale: Locale; site: Site; ui: Ui; sections: SectionId[] }

export function Header({ locale, site, ui, sections }: Props) {
  const logo = asMedia(site.logo)
  const nav = ui.nav ?? {}
  const items: NavItem[] = sections
    .filter(s => s !== 'contact' && s !== 'insights' && s !== 'clients')
    .map(s => ({ label: nav[s] || s, href: href(locale, 'home', undefined, s) }))
  return (
    <header className="af-header">
      <div className="af-header__in">
        <Link href={href(locale, 'home')} aria-label={site.brandName}>
          {logo ? <Image className="af-header__logo" src={logo.url!} alt={site.brandName} width={logo.width ?? 793} height={logo.height ?? 421} sizes="160px" /> : <strong>{site.brandName}</strong>}
        </Link>
        <HeaderNav items={items} cta={{ label: ui.cta?.contact || 'Contact Us', href: href(locale, 'home', undefined, 'contact') }}
          labels={{ openMenu: ui.a11y?.openMenu || 'Open menu', closeMenu: ui.a11y?.closeMenu || 'Close menu', language: ui.lang?.label || 'Language' }} />
      </div>
    </header>
  )
}
