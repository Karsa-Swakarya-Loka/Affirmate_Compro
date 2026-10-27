import type { Home } from '@/payload-types'
import { Photo } from '@/components/ui/Photo'
import { SectionHead } from '@/components/ui/SectionHead'

type Props = { about: NonNullable<Home['about']>; showVisionMission: boolean; showStats: boolean; labels: { vision: string; mission: string } }

// Green page, read top to bottom like the hero: what it is (head + story), where it is going (the vision, one large
// statement under the story, next to the photo), and how it works for the client (the mission, a full-width ruled
// row: label on the left, numbered points at body size on the right). Compro p.2 gives vision and mission their own
// titled columns; here they get their own rows so neither reads as fine print. Figures stay on the hero photo only.
export function About({ about, showVisionMission, labels }: Props) {
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
                <h3 className="af-vm__label">{labels.vision}</h3>
                <p className="af-vision__text">{about.vision}</p>
              </div>
            ) : null}
          </div>
          <Photo media={about.image} className="af-about__photo af-photo--fill" />
        </div>
        {showVisionMission && mission.length ? (
          <div className="af-mission">
            <h3 className="af-vm__label">{labels.mission}</h3>
            <ol className="af-mission__list">
              {mission.map((m, i) => <li key={m}><span className="af-mission__n">{String(i + 1).padStart(2, '0')}</span><p>{m.replace(/[.\s]+$/, '')}</p></li>)}
            </ol>
          </div>
        ) : null}
      </div>
    </section>
  )
}
