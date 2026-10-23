// Leadership (client revision, 23 Oct 2026): heading column plus the leaders as leaf-shaped portraits with name and
// role, no card chrome (design/README anti-slop: no row of identical cards). Hidden when no person has a photo.
import type { Home } from '@/payload-types'
import { Photo } from '@/components/ui/Photo'
import { SectionHead } from '@/components/ui/SectionHead'

const pad = (n: number) => String(n).padStart(2, '0')

export function Leadership({ block }: { block: NonNullable<Home['leadership']> }) {
  const people = (block.people ?? []).filter(p => p.photo)
  if (!people.length) return null
  return (
    <section className="af-section" id="leadership">
      <div className="af-container">
        <div className="af-leaders">
          <div className="af-leaders__head">
            <SectionHead title={block.title} subtitle={block.subtitle} lead={block.body} space="tight" />
            <div className="af-hatch" aria-hidden="true" />
          </div>
          <ul className="af-leaders__list">
            {people.map((p, i) => (
              <li className="af-leader" key={p.id ?? p.name}>
                <Photo media={p.photo} className="af-leader__photo" sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw" alt={p.name} />
                <div className="af-leader__meta">
                  <span className="af-leader__num" aria-hidden="true">{pad(i + 1)}</span>
                  <div><strong>{p.name}</strong><span className="af-leader__role">{p.role}</span></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
