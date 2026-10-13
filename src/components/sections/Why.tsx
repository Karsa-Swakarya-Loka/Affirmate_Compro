import type { Home } from '@/payload-types'
import { Icon } from '@/components/ui/Icon'
import { Photo } from '@/components/ui/Photo'
import { SectionHead } from '@/components/ui/SectionHead'

export function Why({ why }: { why: NonNullable<Home['why']> }) {
  return (
    <section className="af-section" id="why">
      <div className="af-container">
        <div className="af-split af-split--narrow-photo af-split--top">
          <div className="af-split__photo--frame">
            <Photo media={why.image} sizes="(min-width: 1024px) 40vw, 100vw" />
          </div>
          <div>
            <SectionHead title={why.title} subtitle={why.tagline} lead={why.body} longLead space="flush" />
            {why.pillars?.length ? (
              <div className="af-pillars">
                {why.pillars.map(p => (
                  <div className="af-pillar" key={p.id ?? p.title}>
                    <span className="af-ico"><Icon name={p.icon} size={26} /></span>
                    <div><h3>{p.title}</h3><p>{p.text}</p></div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
