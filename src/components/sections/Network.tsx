import type { CSSProperties } from 'react'
import type { City, Home } from '@/payload-types'
import { MAP, project } from '@/lib/indonesia-land'
import { Icon } from '@/components/ui/Icon'
import { SectionHead } from '@/components/ui/SectionHead'

/** Label placement tuned by eye for the 13 compro cities; other cities default to the right. */
const place: Record<string, ['start' | 'middle' | 'end', number, number]> = {
  Medan: ['start', 12, -4], Pekanbaru: ['end', -12, 4], Batam: ['start', 12, 4], Padang: ['end', -12, 4], Palembang: ['end', -12, 4],
  Lampung: ['end', -12, 10], Jakarta: ['start', 10, -10], Bandung: ['middle', 0, 22], Semarang: ['start', 8, -10], Yogyakarta: ['middle', 16, 22],
  Balikpapan: ['start', 12, -4], Makassar: ['start', 12, 10], Jayapura: ['end', -12, -8],
}

export function Network({ block, cities, mapLabel }: { block: NonNullable<Home['network']>; cities: City[]; mapLabel: string }) {
  return (
    <section className="af-section af-section--green" id="network">
      <div className="af-container">
        <SectionHead title={block.title} subtitle={block.subtitle} lead={block.body} />
        <div className="af-network">
          <div className="af-map">
            <svg viewBox={`0 0 ${MAP.width} ${MAP.height}`} role="img" aria-label={mapLabel} xmlns="http://www.w3.org/2000/svg">
              <image href="/brand/indonesia-land.svg" x="0" y="0" width={MAP.width} height={MAP.height} />
              {cities.map((c, i) => {
                const { x, y } = project(c.lng, c.lat)
                const [anchor, dx, dy] = place[c.name] ?? ['start', 12, 4]
                // `--i` staggers the pin's arrival and its ring (components.css .af-map__city); pins stay static without JS.
                return (
                  <g key={c.id} className="af-map__city" style={{ '--i': i } as CSSProperties}>
                    <circle className="af-map__ring" cx={x} cy={y} r={8} aria-hidden="true" />
                    <circle className="af-map__pin" cx={x} cy={y} r={8} /><circle className="af-map__pin-core" cx={x} cy={y} r={3.5} />
                    <text className="af-map__label" x={x + dx} y={y + dy} textAnchor={anchor}>{c.name}</text>
                  </g>
                )
              })}
            </svg>
            <div className="af-map__list">{cities.map(c => <span key={c.id}>{c.name}</span>)}</div>
          </div>
          {block.pillars?.length ? (
            <div className="af-netpillars">
              {block.pillars.map(p => (
                <div className="af-netpillar" key={p.id ?? p.title}>
                  <span className="af-ico af-ico--light af-ico--sm"><Icon name={p.icon} size={20} /></span>
                  <div><h3>{p.title}</h3><p>{p.text}</p></div>
                </div>
              ))}
            </div>
          ) : null}
          <div className="af-hatch" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
