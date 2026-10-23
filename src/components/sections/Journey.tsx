import type { Home, Milestone } from '@/payload-types'
import { Photo } from '@/components/ui/Photo'
import { SectionHead } from '@/components/ui/SectionHead'

// Head on the rule; then the numbered milestone blocks on the left and the photo on the right at the same height.
export function Journey({ block, milestones }: { block: NonNullable<Home['journey']>; milestones: Milestone[] }) {
  return (
    <section className="af-section af-section--soft" id="journey">
      <div className="af-container">
        <SectionHead title={block.title} subtitle={block.subtitle} lead={block.body} longLead />
        <div className="af-journey">
          <ol className="af-toc">
            {milestones.map(m => (
              <li className="af-toc__item" key={m.id}>
                <span className="af-toc__year">{m.year}</span>
                <div className="af-toc__body"><div className="af-toc__label">{m.label}</div><p className="af-toc__text">{m.text}</p></div>
              </li>
            ))}
          </ol>
          <Photo media={block.image} className="af-journey__photo af-photo--fill" sizes="(min-width: 1024px) 40vw, 100vw" />
        </div>
      </div>
    </section>
  )
}
