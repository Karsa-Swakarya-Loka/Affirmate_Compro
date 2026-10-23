import type { Home, Site, Ui } from '@/payload-types'
import { Photo } from '@/components/ui/Photo'
import { SectionHead } from '@/components/ui/SectionHead'

const tel = (p: string) => `tel:${p.replace(/\D/g, '')}`

// Head on the rule; then a ruled fact list (address, phones, email, map link) spread over the gallery's height on
// the left, closed by the hatch, and the leaf-shaped gallery on the right.
export function Office({ block, site, ui }: { block: NonNullable<Home['office']>; site: Site; ui: Ui }) {
  const gallery = (block.gallery ?? []).filter(g => g.image)
  const phones = [site.phone, site.phone2].filter((p): p is string => Boolean(p))
  return (
    <section className="af-section" id="office">
      <div className="af-container">
        <SectionHead title={block.title} space="tight" />
        <div className="af-office">
          <div className="af-side">
            <dl className="af-facts">
              {site.address ? <div><dt>{block.label || ui.sections?.headOffice || 'Head Office'}</dt><dd>{site.address}</dd></div> : null}
              {phones.length ? <div><dt>{ui.sections?.phone || 'Phone'}</dt><dd>{phones.map((p, i) => <span key={p}>{i ? <br /> : null}<a href={tel(p)}>{p}</a></span>)}</dd></div> : null}
              {site.email ? <div><dt>{ui.sections?.email || 'Email'}</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd></div> : null}
              {site.mapsUrl ? <div><dt>Google Maps</dt><dd><a className="af-btn af-btn--outline af-btn--sm" href={site.mapsUrl} target="_blank" rel="noopener noreferrer">{ui.cta?.openMaps || 'Open in Google Maps'}</a></dd></div> : null}
            </dl>
            <div className="af-hatch" aria-hidden="true" />
          </div>
          {gallery.length ? (
            <div className="af-gallery">
              {gallery.map((g, i) => <Photo key={g.id ?? i} media={g.image} sizes={i === 0 ? '(min-width: 1024px) 60vw, 100vw' : '(min-width: 1024px) 15vw, 50vw'} />)}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
