import type { Home } from '@/payload-types'
import { Photo } from '@/components/ui/Photo'
import { SectionHead } from '@/components/ui/SectionHead'

type Props = { about: NonNullable<Home['about']>; showVisionMission: boolean; showStats: boolean; labels: { vision: string; mission: string } }

// Green page. Head on the rule; then the story on the left with the figures at its foot, and the photo on the right
// at exactly the same height; vision and mission under one more rule, split by a vertical one.
export function About({ about, showVisionMission, showStats, labels }: Props) {
  const stats = showStats ? about.stats ?? [] : []
  const mission = (about.mission ?? []).map(m => m.label).filter(Boolean)
  return (
    <section className="af-section af-section--green" id="about">
      <div className="af-container">
        {/* One heading per section: "About us" is the eyebrow, "Who we are" the title, the subtitle carries the message. */}
        <SectionHead eyebrow={about.eyebrow} title={about.title} subtitle={about.subtitle} />
        <div className="af-about">
          <div className="af-about__text">
            <p className="af-about__body">{about.body}</p>
            {stats.length ? (
              <div className="af-stats">
                {stats.map(s => (
                  <div className="af-stat" key={s.id ?? s.value}>
                    <div className="af-stat__value">{s.value}</div>
                    <div className="af-stat__label">{s.label}</div>
                    {s.sublabel ? <div className="af-stat__sub">{s.sublabel}</div> : null}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <Photo media={about.image} className="af-about__photo af-photo--fill" />
        </div>
        {showVisionMission && (about.vision || mission.length) ? (
          <div className="af-vm">
            {about.vision ? <div className="af-vm__row"><strong>{labels.vision}</strong>{about.vision}</div> : null}
            {mission.length ? <div className="af-vm__row"><strong>{labels.mission}</strong><ol>{mission.map(m => <li key={m}>{m.replace(/[.\s]+$/, '')}</li>)}</ol></div> : null}
          </div>
        ) : null}
      </div>
    </section>
  )
}
