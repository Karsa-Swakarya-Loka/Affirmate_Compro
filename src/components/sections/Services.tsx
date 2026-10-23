import Image from 'next/image'
import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import type { Home, Service } from '@/payload-types'
import { Icon } from '@/components/ui/Icon'
import { Photo } from '@/components/ui/Photo'
import { SectionHead } from '@/components/ui/SectionHead'

const pad = (n: number) => String(n).padStart(2, '0')

type Cta = { label: string; href: string }
type Tag = { id?: string | null; label: string }
type Category = { key: string; kicker?: string | null; title: string; items: Tag[] }

const hasDetail = (s: Service) => (s.items?.length ?? 0) > 0 || (s.groups?.length ?? 0) > 0 || Boolean(s.body)
// Grouped catalogues and long lists span the row; a lone half-width row would leave a hole in the grid, so it spans too.
const isLong = (s: Service) => (s.items?.length ?? 0) > 6 || (s.groups?.length ?? 0) > 0

/** Ruled inline list for short scopes (platform strip). */
function Specs({ items }: { items: Tag[] }) {
  return <ul className="af-specs">{items.map(it => <li key={it.id ?? it.label}>{it.label}</li>)}</ul>
}

/** The service's categories: grouped rows become one column each (group title as kicker, sub-label as the column
 *  heading); a flat item list becomes one numbered list that flows over columns. */
function categories(s: Service): Category[] {
  const groups = (s.groups ?? []).filter(g => g.items?.length)
  if (groups.length) return groups.map((g, i) => ({ key: g.id ?? String(i), kicker: g.label ? g.title : null, title: g.label || g.title, items: g.items ?? [] }))
  return s.items?.length ? [{ key: 'items', title: '', items: s.items }] : []
}

/** Numbered catalogue list: a leading index, one item per ruled line. */
function CatalogueList({ items, flow }: { items: Tag[]; flow?: boolean }) {
  return <ol className={['af-catlist', flow ? 'af-catlist--flow' : ''].filter(Boolean).join(' ')}>{items.map(it => <li key={it.id ?? it.label}>{it.label}</li>)}</ol>
}

export function Services({ block, services, cta, locale }: { block: NonNullable<Home['services']>; services: Service[]; cta?: Cta; locale: Locale }) {
  // Head on the rule; left the photo stretched to the diagram's height, right the four-petal diagram.
  // A fifth service (Corporate Secretary, 23 Oct 2026) sits as a wide petal under it.
  const petals = services.slice(0, 4)
  const extra = services.slice(4)
  const withItems = services.filter(hasDetail)
  const halves = withItems.filter(s => !isLong(s))
  const loneHalf = halves.length % 2 === 1 ? halves[halves.length - 1] : null
  const countLabel = (n: number) => (locale === 'id' ? `${n} layanan` : `${n} ${n === 1 ? 'service' : 'services'}`)
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
        {/* Service catalogue: one ruled block per service with sub-services, each category a numbered column. */}
        {withItems.length ? (
          <div className="af-svcdetail">
            {withItems.map(s => {
              const idx = services.indexOf(s)
              const wide = isLong(s) || s === loneHalf
              const cats = categories(s)
              const total = cats.reduce((n, c) => n + c.items.length, 0)
              const flat = cats.length === 1 && !cats[0].title
              return (
                <article className={['af-svcrow', wide ? 'af-svcrow--wide' : ''].filter(Boolean).join(' ')} key={s.id} aria-labelledby={`svc-${s.slug}`}>
                  <div className="af-svcrow__head">
                    <span className="af-svcrow__num" aria-hidden="true">{pad(idx + 1)}</span>
                    <h3 className="af-svcrow__title" id={`svc-${s.slug}`}>{s.title}</h3>
                    {total ? <span className="af-svcrow__count">{countLabel(total)}</span> : null}
                  </div>
                  {s.summary ? <p className="af-svcrow__sum">{s.summary}</p> : null}
                  {flat ? <CatalogueList items={cats[0].items} flow /> : cats.length ? (
                    <div className="af-cats">
                      {cats.map(c => (
                        <div className="af-cat" key={c.key}>
                          <div className="af-cat__head">
                            {c.kicker ? <span className="af-cat__kicker">{c.kicker}</span> : null}
                            <h4 className="af-cat__title">{c.title}</h4>
                          </div>
                          <CatalogueList items={c.items} />
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {s.body ? <p className="af-svcrow__note"><Icon name="check" size={16} />{s.body}</p> : null}
                </article>
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
