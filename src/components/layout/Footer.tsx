import Image from 'next/image'
import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import { href, type SectionId } from '@/i18n/routes'
import type { Site, Ui } from '@/payload-types'
import { asMedia } from '@/lib/cms'

type Props = { locale: Locale; site: Site; ui: Ui; sections: SectionId[]; showPrivacy: boolean }

export function Footer({ locale, site, ui, sections, showPrivacy }: Props) {
  const logo = asMedia(site.logo)
  const logoWhite = asMedia(site.logoWhite)
  const nav = ui.nav ?? {}
  const year = new Date().getFullYear()
  return (
    <footer className="af-footer">
      <div className="af-footer__in">
        <div className="af-footer__brand">
          {/* The white logo file has a green box baked in that clashes with the footer; the colour logo sits on a cream badge instead. */}
          {logo ? <span className="af-footer__badge"><Image src={logo.url!} alt={site.brandName} width={logo.width ?? 793} height={logo.height ?? 421} sizes="160px" /></span>
            : logoWhite ? <Image src={logoWhite.url!} alt={site.brandName} width={logoWhite.width ?? 400} height={logoWhite.height ?? 100} style={{ height: 44, width: 'auto' }} /> : <strong>{site.brandName}</strong>}
          {site.groupBlurb ? <p>{site.groupBlurb}</p> : null}
          <span className="af-footer__group">{ui.sections?.memberOf || `A dedicated unit of ${site.groupName}`}</span>
        </div>
        <div>
          <h2 className="af-footer__h">{ui.sections?.headOffice || 'Head Office'}</h2>
          <ul>
            {site.address ? <li>{site.address}</li> : null}
            {site.phone ? <li><a href={`tel:${site.phone.replace(/\D/g, '')}`}>{site.phone}</a></li> : null}
            {site.phone2 ? <li><a href={`tel:${site.phone2.replace(/\D/g, '')}`}>{site.phone2}</a></li> : null}
            {site.email ? <li><a href={`mailto:${site.email}`}>{site.email}</a></li> : null}
          </ul>
        </div>
        <div>
          <h2 className="af-footer__h">{locale === 'id' ? 'Jelajahi' : 'Explore'}</h2>
          <ul className="af-footer__links">
            {sections.filter(s => s !== 'contact').map(s => <li key={s}><Link href={href(locale, 'home', undefined, s)}>{nav[s] || s}</Link></li>)}
            <li><Link href={href(locale, 'home', undefined, 'contact')}>{nav.contact || 'Contact'}</Link></li>
            {site.groupUrl ? <li><a href={site.groupUrl} target="_blank" rel="noopener noreferrer">{ui.cta?.visitGroup || site.groupName}</a></li> : null}
            {(site.social ?? []).map(s => <li key={s.id ?? s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.platform === 'linkedin' ? 'LinkedIn' : s.platform}</a></li>)}
          </ul>
        </div>
      </div>
      <div className="af-footer__bar">
        <div className="af-footer__bar-in">
          <span>© {year} {site.legalName}. {ui.footer?.rights || 'All rights reserved.'}</span>
          <span>
            {showPrivacy ? <Link href={href(locale, 'privacy')}>{ui.footer?.privacy || 'Privacy Policy'}</Link> : null}
            {showPrivacy ? ' · ' : ''}{ui.footer?.mapCredit || 'Map data © OpenStreetMap contributors, geoBoundaries'}
          </span>
        </div>
      </div>
    </footer>
  )
}
