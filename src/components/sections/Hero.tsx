import Link from 'next/link'
import type { Home } from '@/payload-types'
import { Icon } from '@/components/ui/Icon'
import { Photo } from '@/components/ui/Photo'

/** Highlights the CMS `highlight` word inside the headline (same font, colour only). */
function Headline({ text, highlight }: { text: string; highlight?: string | null }) {
  if (!highlight || !text.includes(highlight)) return <>{text}</>
  const [before, after] = text.split(highlight)
  return <>{before}<em>{highlight}</em>{after}</>
}

type Stat = { value: string; label: string }
type Props = {
  hero: NonNullable<Home['hero']>
  /** What, concretely: the platform pillars (services.platformPillars). */
  points: string[]
  /** Why it matters: proof figures (about.stats), shown on the photo. */
  stats: Stat[]
  /** What happens next, under the action (contact.text). */
  nextStep?: string | null
}

// Above the fold, in reading order: who it is for (eyebrow) → what it is (headline + points)
// → why it matters (lead + proof on the photo) → what to do next (one solid action + what happens after).
export function Hero({ hero, points, stats, nextStep }: Props) {
  return (
    <section className="af-hero" id="top">
      <div className="af-hero__in">
        <div className="af-hero__copy">
          {hero.eyebrow ? <p className="af-eyebrow af-hero__who"><span className="af-mark" aria-hidden="true" />{hero.eyebrow}</p> : null}
          <h1 className="af-hero__title"><Headline text={hero.headline} highlight={hero.highlight} /></h1>
          <p className="af-hero__lead">{hero.lead}</p>
          {points.length ? (
            <ul className="af-hero__points">
              {points.map(p => <li key={p}><Icon name="check" size={16} />{p}</li>)}
            </ul>
          ) : null}
          <div className="af-hero__next">
            <div className="af-hero__actions">
              {hero.primaryCta?.label ? <Link className="af-btn af-btn--primary af-btn--lg" href={hero.primaryCta.href}>{hero.primaryCta.label} <Icon name="arrow-right" size={18} /></Link> : null}
              {hero.secondaryCta?.label ? <Link className="af-btn af-btn--link" href={hero.secondaryCta.href}>{hero.secondaryCta.label} <Icon name="arrow-down-right" size={18} /></Link> : null}
            </div>
            {nextStep ? <p className="af-hero__after">{nextStep}</p> : null}
          </div>
        </div>
        <div className="af-hero__cover">
          <Photo media={hero.image} sizes="(min-width: 1024px) 54vw, 100vw" priority />
          {stats.length ? (
            <dl className="af-hero__proof">
              {stats.map(s => <div key={s.value}><dt>{s.value}</dt><dd>{s.label}</dd></div>)}
            </dl>
          ) : null}
          <div className="af-hatch" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
