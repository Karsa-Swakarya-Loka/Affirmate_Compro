import type { Home } from '@/payload-types'
import { Icon } from '@/components/ui/Icon'
import { Photo } from '@/components/ui/Photo'
import { SectionHead } from '@/components/ui/SectionHead'

type Props = { about: NonNullable<Home['about']>; showVisionMission: boolean; showStats: boolean; labels: { vision: string; mission: string } }

export function About({ about, showVisionMission, showStats, labels }: Props) {
  const stats = showStats ? about.stats ?? [] : []
  const mission = (about.mission ?? []).map(m => m.label).filter(Boolean)
  return (
    <section className="af-section af-section--green" id="about">
      <div className="af-container">
        {/* One heading per section: "About us" is the eyebrow, "Who we are" the title, the subtitle carries the message. */}
        <SectionHead eyebrow={about.eyebrow} title={about.title} subtitle={about.subtitle} />
        <div className="af-about">
          <div className="af-panel">
            <p className="af-lead af-lead--sm">{about.body}</p>
            {stats.length ? (
              <div className="af-stats">
                {stats.map(s => (
                  <div className="af-stat" key={s.id ?? s.value}>
                    <div className="af-stat__icon"><Icon name={s.icon} size={24} /></div>
                    <div className="af-stat__value">{s.value}</div>
                    <div className="af-stat__label">{s.label}</div>
                    {s.sublabel ? <div className="af-stat__sub">{s.sublabel}</div> : null}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <div className="af-about__side">
            <Photo media={about.image} className="af-about__photo" />
          </div>
        </div>
        {/* Full-width row under panel + photo, so neither column is left with an empty tail. Mission points stay a list. */}
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
