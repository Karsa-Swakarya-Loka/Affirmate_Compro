import Image from 'next/image'
import type { Client, Home } from '@/payload-types'
import { asMedia } from '@/lib/cms'

function Logos({ clients, hidden }: { clients: Client[]; hidden?: boolean }) {
  return (
    <ul className="af-marquee__track" aria-hidden={hidden || undefined}>
      {clients.map(c => {
        const m = asMedia(c.logo)
        const img = m?.url && m.width && m.height
          ? <Image src={m.url} alt={hidden ? '' : c.name} width={m.width} height={m.height} sizes="(max-width: 767px) 160px, 220px" loading="eager" fetchPriority="low" />
          : <span className="af-client__name">{c.name}</span>
        return (
          <li key={c.id}>
            {c.url ? <a href={c.url} target="_blank" rel="noopener noreferrer" tabIndex={hidden ? -1 : undefined}>{img}</a> : img}
          </li>
        )
      })}
    </ul>
  )
}

/**
 * Compro p.8 "Our Client" as a compact proof band right under the hero (same placement, motion and layout as the
 * Apegale site, owner decision 27 Oct 2026): label left, logos right, running as a permanent ticker with no pause
 * button and no stop on hover. Two identical tracks loop seamlessly; the second is hidden from assistive tech.
 * The only exception is the OS "reduce motion" setting, where the logos become a static, centred row.
 */
export function Clients({ block, clients }: { block: NonNullable<Home['clients']>; clients: Client[] }) {
  if (!clients.length) return null
  return (
    <section className="af-clients" id="clients" aria-label={block.title}>
      <div className="af-container af-clients__in">
        {block.title ? <p className="af-eyebrow af-clients__label"><span className="af-mark" aria-hidden="true" />{block.title}</p> : null}
        <div className="af-marquee">
          <Logos clients={clients} />
          <Logos clients={clients} hidden />
        </div>
      </div>
    </section>
  )
}
