import Image from 'next/image'
import type { GroupEntity, Home } from '@/payload-types'
import { asMedia } from '@/lib/cms'
import { Icon } from '@/components/ui/Icon'
import { SectionHead } from '@/components/ui/SectionHead'

function Logo({ entity }: { entity: GroupEntity }) {
  const m = asMedia(entity.logo)
  if (!m?.url) return <strong className="af-entity__name">{entity.brand}</strong>
  return <Image className="af-entity__logo" src={m.url} alt={entity.brand} width={m.width ?? 400} height={m.height ?? 200} sizes="200px" />
}

export function Group({ group, entities }: { group: NonNullable<Home['group']>; entities: GroupEntity[] }) {
  const ordered = [...entities].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  return (
    <section className="af-section af-section--soft" id="group">
      <div className="af-container">
        <SectionHead title={group.title} lead={group.body} longLead />
        <div className="af-group">
          {ordered.map(e => (
            <article className="af-entity" key={e.id}>
              <Logo entity={e} />
              <div><div className="af-entity__name">{e.name}</div><div className="af-entity__cat">{e.category}</div></div>
              <p className="af-entity__sum">{e.summary}</p>
              {e.bullets?.length ? <ul>{e.bullets.map(b => <li key={b.id ?? b.label}><Icon name="check" size={14} />{b.label}</li>)}</ul> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
