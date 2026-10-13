import type { Home, Site } from '@/payload-types'
import { Icon } from '@/components/ui/Icon'
import { Photo } from '@/components/ui/Photo'

export function Office({ block, site, openMaps }: { block: NonNullable<Home['office']>; site: Site; openMaps: string }) {
  const gallery = (block.gallery ?? []).filter(g => g.image)
  return (
    <section className="af-section" id="office">
      <div className="af-container">
        <div className="af-office">
          <div className="af-office__info">
            <div className="af-sechead af-sechead--flush">
              <div className="af-sechead__row"><span className="af-mark" aria-hidden="true" /><h2 className="af-h1">{block.title}</h2></div>
            </div>
            {block.label ? <p className="af-eyebrow">{block.label}</p> : null}
            {site.address ? <p className="af-office__addr">{site.address}</p> : null}
            <div className="af-office__phones">
              {[site.phone, site.phone2].filter(Boolean).map(p => (
                <a key={p} href={`tel:${String(p).replace(/\D/g, '')}`}><span className="af-ico af-ico--sm"><Icon name="phone" size={20} /></span>{p}</a>
              ))}
            </div>
            {site.mapsUrl ? <a className="af-btn af-btn--outline af-btn--sm" href={site.mapsUrl} target="_blank" rel="noopener noreferrer" >{openMaps}</a> : null}
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
