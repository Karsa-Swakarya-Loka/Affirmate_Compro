import Image from 'next/image'
import Link from 'next/link'
import type { Home, Service } from '@/payload-types'
import { Icon } from '@/components/ui/Icon'
import { Photo } from '@/components/ui/Photo'
import { SectionHead } from '@/components/ui/SectionHead'

const pad = (n: number) => String(n).padStart(2, '0')

type Cta = { label: string; href: string }
type Tag = { id?: string | null; label: string }

const hasDetail = (s: Service) => (s.items?.length ?? 0) > 0 || (s.groups?.length ?? 0) > 0 || Boolean(s.body)
// Long lists and grouped lists span the row; a lone half-width row would leave a hole in the grid, so it spans too.
const isLong = (s: Service) => (s.items?.length ?? 0) > 8 || (s.groups?.length ?? 0) > 0

/** Ruled inline list: the scope items separated by thin ticks (no chips). */
function Specs({ items }: { items: Tag[] }) {
  return <ul className="af-specs">{items.map(it => <li key={it.id ?? it.label}>{it.label}</li>)}</ul>
}

export function Services({ block, services, cta }: { block: NonNullable<Home['services']>; services: Service[]; cta?: Cta }) {
  // Head on the rule; left the photo stretched to the diagram's height, right the four-petal diagram.
  // A fifth service (Corporate Secretary, 23 Oct 2026) sits as a wide petal under it.
  const petals = services.slice(0, 4)
  const extra = services.slice(4)
  const withItems = services.filter(hasDetail)
  const halves = withItems.filter(s => !isLong(s))
  const loneHalf = halves.length % 2 === 1 ? halves[halves.length - 1] : null
  return (
    <section className="af-section" id="services">
      <div className="af-container">
        <SectionHead title={block.title} eyebrow={block.eyebrow} subtitle={block.subtitle} lead={block.intro} />
        <div className="af-services">
          <div className="af-services__side">
            <Photo media={block.image} className="af-services__photo" sizes="(min-width: 1024px) 40vw, 100vw" />
            <div className="af-hatch" aria-hidden="true" />
          </div>
          <div className="af-petalset">
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
            {extra.map((s, i) => (
              <article className="af-petal af-petal--wide" key={s.id}>
                <span className="af-petal__num">{pad(i + 5)}</span>
                <div><h3>{s.title}</h3><p>{s.summary}</p></div>
              </article>
            ))}
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
                  {s.items?.length ? <Specs items={s.items} /> : null}
                  {s.groups?.length ? (
                    <div className="af-svcgroups">
                      {s.groups.map((g, i, all) => (
                        <div className="af-svcgroup" key={g.id ?? i}>
                          {i === 0 || all[i - 1].title !== g.title ? <h4 className="af-svcgroup__title">{g.title}</h4> : null}
                          {g.label ? <p className="af-svcgroup__label">{g.label}</p> : null}
                          {g.items?.length ? <Specs items={g.items} /> : null}
                        </div>
                      ))}
                    </div>
                  ) : null}
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
                  <div className="af-platform__pillar" key={p.id ?? p.label}><span className="af-ico"><Icon name={['bank', 'identification-card', 'file-text'][i] ?? 'check'} size={22} /></span>{p.label}</div>
                ))}
              </div>
            ) : null}
            {block.platformScope?.length ? <div className="af-platform__scope"><Specs items={block.platformScope} /></div> : null}
          </div>
        ) : null}
      </div>
    </section>
  )
}
