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

const TEXT = {
  id: { count: (n: number) => `${n} layanan`, detail: 'Lihat rincian', ask: 'Tanyakan layanan ini', catalogue: 'Rincian layanan', catalogueLead: 'Sub-layanan dan dokumen yang kami tangani, dikelompokkan per kategori.' },
  en: { count: (n: number) => `${n} ${n === 1 ? 'service' : 'services'}`, detail: 'See details', ask: 'Ask about this service', catalogue: 'Service catalogue', catalogueLead: 'The sub-services and documents we handle, grouped by category.' },
}

/** Ruled inline list for short scopes (platform band). */
function Specs({ items }: { items: Tag[] }) {
  return <ul className="af-specs">{items.map(it => <li key={it.id ?? it.label}>{it.label}</li>)}</ul>
}

/** The service's categories: grouped rows become one card each (group title as kicker, sub-label as the card
 *  heading); a flat item list becomes one numbered list that flows over columns. */
function categories(s: Service): Category[] {
  const groups = (s.groups ?? []).filter(g => g.items?.length)
  if (groups.length) return groups.map((g, i) => ({ key: g.id ?? String(i), kicker: g.label ? g.title : null, title: g.label || g.title, items: g.items ?? [] }))
  return s.items?.length ? [{ key: 'items', title: '', items: s.items }] : []
}

/** Numbered catalogue list: a leading index, one item per line. */
function CatalogueList({ items, flow }: { items: Tag[]; flow?: boolean }) {
  return <ol className={['af-catlist', flow ? 'af-catlist--flow' : ''].filter(Boolean).join(' ')}>{items.map(it => <li key={it.id ?? it.label}>{it.label}</li>)}</ol>
}

// Reading order: section title and message → the ledger (index, service name, one summary, one action per row)
// → the catalogue, introduced by a small sub-head, with the sub-services as category cards
// → the Administrative Platform band with the one solid call to action at the end of the offer.
export function Services({ block, services, cta, locale }: { block: NonNullable<Home['services']>; services: Service[]; cta?: Cta; locale: Locale }) {
  const withItems = services.filter(hasDetail)
  const halves = withItems.filter(s => !isLong(s))
  const loneHalf = halves.length % 2 === 1 ? halves[halves.length - 1] : null
  const t = TEXT[locale === 'id' ? 'id' : 'en']
  return (
    <section className="af-section af-section--services" id="services">
      <div className="af-container">
        <SectionHead title={block.title} eyebrow={block.eyebrow} subtitle={block.subtitle} lead={block.intro} />
        <div className="af-services">
          <div className="af-services__side">
            <Photo media={block.image} className="af-services__photo" sizes="(min-width: 1024px) 40vw, 100vw" />
            <div className="af-hatch" aria-hidden="true" />
          </div>
          <ol className="af-ledger">
            {services.map((s, i) => (
              <li className="af-ledger__row" key={s.id}>
                <span className="af-index" aria-hidden="true">{pad(i + 1)}</span>
                <div className="af-ledger__body">
                  <h3>{s.title}</h3>
                  <p>{s.summary}</p>
                  {hasDetail(s)
                    ? <a className="af-ledger__link" href={`#svc-${s.slug}`}>{t.detail} <Icon name="arrow-down-right" size={16} /></a>
                    : cta ? <Link className="af-ledger__link" href={cta.href}>{t.ask} <Icon name="arrow-right" size={16} /></Link> : null}
                </div>
              </li>
            ))}
          </ol>
        </div>
        {/* Service catalogue: a small sub-head, then one block per service with its sub-services as category cards. */}
        {withItems.length ? (
          <div className="af-svcdetail">
            <div className="af-svcdetail__head">
              <span className="af-eyebrow"><span className="af-mark" aria-hidden="true" />{t.catalogue}</span>
              <p className="af-small">{t.catalogueLead}</p>
            </div>
            {withItems.map(s => {
              const idx = services.indexOf(s)
              const wide = isLong(s) || s === loneHalf
              const cats = categories(s)
              const total = cats.reduce((n, c) => n + c.items.length, 0)
              const flat = cats.length === 1 && !cats[0].title
              return (
                <article className={['af-svcrow', wide ? 'af-svcrow--wide' : ''].filter(Boolean).join(' ')} key={s.id} id={`svc-${s.slug}`} aria-labelledby={`svc-${s.slug}-title`}>
                  <div className="af-svcrow__head">
                    <span className="af-index af-index--sm" aria-hidden="true">{pad(idx + 1)}</span>
                    <h3 className="af-svcrow__title" id={`svc-${s.slug}-title`}>{s.title}</h3>
                    {total ? <span className="af-svcrow__count">{t.count(total)}</span> : null}
                  </div>
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
      </div>
      {block.platformTitle || block.platformPillars?.length ? (
        <div className="af-platform">
          <div className="af-platform__in">
            {/* The visitor has just read what we do: the one solid next step sits here, at the end of the offer. */}
            <div className="af-platform__lead">
              <span className="af-mark" aria-hidden="true" />
              <p className="af-platform__title">{block.platformTitle}</p>
              {cta ? <Link className="af-btn af-btn--light af-btn--lg" href={cta.href}>{cta.label} <Icon name="arrow-right" size={18} /></Link> : null}
            </div>
            {block.platformPillars?.length ? (
              <div className="af-platform__pillars">
                {block.platformPillars.map((p, i) => (
                  <div className="af-platform__pillar" key={p.id ?? p.label}><span className="af-ico af-ico--light"><Icon name={['bank', 'identification-card', 'file-text'][i] ?? 'check'} size={22} /></span><span>{p.label}</span></div>
                ))}
              </div>
            ) : null}
            {block.platformScope?.length ? <div className="af-platform__scope"><Specs items={block.platformScope} /></div> : null}
          </div>
        </div>
      ) : null}
    </section>
  )
}
