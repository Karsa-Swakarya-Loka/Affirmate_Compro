import Image from 'next/image'
import Link from 'next/link'
import type { Home, Service } from '@/payload-types'
import { Icon } from '@/components/ui/Icon'
import { Photo } from '@/components/ui/Photo'
import { SectionHead } from '@/components/ui/SectionHead'

const pad = (n: number) => String(n).padStart(2, '0')

type Cta = { label: string; href: string }

export function Services({ block, services, cta }: { block: NonNullable<Home['services']>; services: Service[]; cta?: Cta }) {
  const petals = services.slice(0, 4)
  const withItems = services.filter(s => (s.items?.length ?? 0) > 0 || s.body)
  // Long tag lists span the row; a lone half-width row would leave a hole in the grid, so it spans too.
  const isLong = (s: Service) => (s.items?.length ?? 0) > 8
  const halves = withItems.filter(s => !isLong(s))
  const loneHalf = halves.length % 2 === 1 ? halves[halves.length - 1] : null
  return (
    <section className="af-section" id="services">
      <div className="af-container">
        <div className="af-services">
          <div>
            <SectionHead title={block.title} eyebrow={block.eyebrow} subtitle={block.subtitle} lead={block.intro} space="tight" />
            <Photo media={block.image} className="af-services__photo" sizes="(min-width: 1024px) 40vw, 100vw" />
            <div className="af-hatch" style={{ marginTop: 'var(--space-6)' }} aria-hidden="true" />
          </div>
          <div className="af-petals">
            {petals.map((s, i) => (
              <article className="af-petal" key={s.id}>
                <span className="af-petal__num">{pad(i + 1)}</span>
                <h3>{s.title}</h3>
                <p>{s.summary}</p>
              </article>
            ))}
            <div className="af-petals__core" aria-hidden="true"><Image src="/brand/favicon.svg" alt="" width={64} height={64} /></div>
          </div>
        </div>
        {withItems.length ? (
          <div className="af-svcdetail">
            {withItems.map(s => {
              const idx = services.indexOf(s)
              const wide = isLong(s) || s === loneHalf
              return (
                <div className={['af-svcrow', wide ? 'af-svcrow--wide' : ''].filter(Boolean).join(' ')} key={s.id}>
                  <div className="af-svcrow__head"><span className="af-svcrow__num">{pad(idx + 1)}</span>{s.title}</div>
                  {s.items?.length ? <div className="af-tags">{s.items.map(it => <span className="af-tag" key={it.id ?? it.label}>{it.label}</span>)}</div> : null}
                  {s.body ? <p className="af-small">{s.body}</p> : null}
                </div>
              )
            })}
          </div>
        ) : null}
        {block.platformTitle || block.platformPillars?.length ? (
          <div className="af-platform">
            {/* The visitor has just read what we do: the next step sits here, at the end of the offer. */}
            <div className="af-platform__lead">
              <p className="af-platform__title">{block.platformTitle}</p>
              {cta ? <Link className="af-btn af-btn--light" href={cta.href}>{cta.label} <Icon name="arrow-right" size={18} /></Link> : null}
            </div>
            {block.platformPillars?.length ? (
              <div className="af-platform__pillars">
                {block.platformPillars.map((p, i) => (
                  <div className="af-platform__pillar" key={p.id ?? p.label}><span className="af-ico"><Icon name={['bank', 'identification-card', 'wallet'][i] ?? 'check'} size={22} /></span>{p.label}</div>
                ))}
              </div>
            ) : null}
            {block.platformScope?.length ? <div className="af-chips af-platform__chips">{block.platformScope.map(c => <span className="af-chip" key={c.id ?? c.label}>{c.label}</span>)}</div> : null}
          </div>
        ) : null}
      </div>
    </section>
  )
}
