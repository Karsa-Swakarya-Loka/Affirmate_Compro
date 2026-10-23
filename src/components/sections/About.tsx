import type { Home } from '@/payload-types'
import { Photo } from '@/components/ui/Photo'
import { SectionHead } from '@/components/ui/SectionHead'

type Props = { about: NonNullable<Home['about']>; showVisionMission: boolean; showStats: boolean; labels: { vision: string; mission: string } }

// Green page. Head on the rule; then the story with vision and mission under it on the left, and the photo on the
// right at exactly the same height. The figures (stats) are shown once, on the hero photo, not repeated here.
export function About({ about, showVisionMission, labels }: Props) {
  const mission = (about.mission ?? []).map(m => m.label).filter(Boolean)
  const vm = showVisionMission && (about.vision || mission.length)
  return (
    <section className="af-section af-section--green" id="about">
      <div className="af-container">
        {/* One heading per section: "About us" is the eyebrow, "Who we are" the title, the subtitle carries the message. */}
        <SectionHead eyebrow={about.eyebrow} title={about.title} subtitle={about.subtitle} />
        <div className="af-about">
          <div className="af-about__text">
            <p className="af-about__body">{about.body}</p>
            {vm ? (
              <div className="af-vm">
                {about.vision ? <div className="af-vm__row"><strong>{labels.vision}</strong>{about.vision}</div> : null}
                {mission.length ? <div className="af-vm__row"><strong>{labels.mission}</strong><ol>{mission.map(m => <li key={m}>{m.replace(/[.\s]+$/, '')}</li>)}</ol></div> : null}
              </div>
            ) : null}
          </div>
          <Photo media={about.image} className="af-about__photo af-photo--fill" />
        </div>
      </div>
    </section>
  )
}
