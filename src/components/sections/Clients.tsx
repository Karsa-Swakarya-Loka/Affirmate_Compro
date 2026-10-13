import Image from 'next/image'
import type { Client, Home } from '@/payload-types'
import { asMedia } from '@/lib/cms'

export function Clients({ block, clients }: { block: NonNullable<Home['clients']>; clients: Client[] }) {
  return (
    <section className="af-section" id="clients" style={{ paddingBlock: 'var(--space-12)' }}>
      <div className="af-container">
        <div className="af-sechead af-sechead--center" style={{ marginBottom: 'var(--space-8)' }}>
          <h2 className="af-h2" style={{ color: 'var(--green-deep)' }}>{block.subtitle || block.title}</h2>
          {block.body ? <p className="af-lead" style={{ textAlign: 'center' }}>{block.body}</p> : null}
        </div>
        <div className="af-clients">
          {clients.map(c => {
            const m = asMedia(c.logo)
            const inner = m?.url ? <Image src={m.url} alt={c.name} width={m.width ?? 300} height={m.height ?? 100} sizes="200px" /> : <span className="af-client__name">{c.name}</span>
            return c.url ? <a className="af-client" key={c.id} href={c.url} target="_blank" rel="noopener noreferrer">{inner}</a> : <div className="af-client" key={c.id}>{inner}</div>
          })}
        </div>
      </div>
    </section>
  )
}
