import Link from 'next/link'
import type { Home } from '@/payload-types'
import { Icon } from '@/components/ui/Icon'
import { Photo } from '@/components/ui/Photo'
import { SectionHead } from '@/components/ui/SectionHead'

type Cta = { label: string; href: string }
type Props = { about: NonNullable<Home['about']>; showVisionMission: boolean; showStats: boolean; labels: { vision: string; mission: string }; cta?: Cta }

// Green page on the head's 5/7 grid. Hierarchy, in reading order: the section head (who we are), the story next to
// the photo, then two real headings at heading-2 size, "Our Vision" (one statement under the story) and "Our Mission"
// (four numbered points in two columns on the same grid), and last the one action, a cream button. Only the
// section head stands on a rule; everything else is spaced, not ruled. Figures stay on the hero photo only.
export function About({ about, showVisionMission, labels, cta }: Props) {
  const mission = (about.mission ?? []).map(m => m.label).filter(Boolean)
  return (
    <section className="af-section af-section--green" id="about">
      <div className="af-container">
        {/* One heading per section: "About us" is the eyebrow, "Who we are" the title, the subtitle carries the message. */}
        <SectionHead eyebrow={about.eyebrow} title={about.title} subtitle={about.subtitle} />
        <div className="af-about">
          <div className="af-about__text">
            <p className="af-about__body">{about.body}</p>
            {showVisionMission && about.vision ? (
              <div className="af-vision">
                <h3 className="af-about__h">{labels.vision}</h3>
                <p className="af-vision__text">{about.vision}</p>
              </div>
            ) : null}
          </div>
          <Photo media={about.image} className="af-about__photo af-photo--fill" />
        </div>
        {showVisionMission && mission.length ? (
          <div className="af-mission">
            <h3 className="af-about__h">{labels.mission}</h3>
            <ol className="af-mission__list">
              {mission.map((m, i) => <li key={m}><span className="af-mission__n">{String(i + 1).padStart(2, '0')}</span><p>{m.replace(/[.\s]+$/, '')}</p></li>)}
            </ol>
            {cta ? <div className="af-mission__cta"><Link className="af-btn af-btn--cream" href={cta.href}>{cta.label} <Icon name="arrow-right" size={18} /></Link></div> : null}
          </div>
        ) : null}
      </div>
    </section>
  )
}
