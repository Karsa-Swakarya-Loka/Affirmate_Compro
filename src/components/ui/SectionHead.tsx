// Template section header: green leaf mark + uppercase title, optional subtitle (with highlighted tail) and lead.
// Reading order: title (where am I) → subtitle (the message) → lead (the detail). Long leads use body size.
import type { ReactNode } from 'react'

type Props = {
  title: string; subtitle?: string | null; lead?: string | null; eyebrow?: string | null; center?: boolean; children?: ReactNode
  /** Gap to the content below: default 40px, tight 24px, flush 0. */
  space?: 'tight' | 'flush'
  /** Lead runs 4+ lines: set it at body size so it does not compete with the subtitle. */
  longLead?: boolean
}

/** Splits "Nationwide coverage, global connections" so the part after the last comma is highlighted, like the design. */
export function Subtitle({ text }: { text: string }) {
  const i = text.lastIndexOf(',')
  if (i < 0) return <p className="af-subtitle">{text}</p>
  return <p className="af-subtitle">{text.slice(0, i + 1)} <em>{text.slice(i + 1).trim()}</em></p>
}

export function SectionHead({ title, subtitle, lead, eyebrow, center, children, space, longLead }: Props) {
  return (
    <div className={['af-sechead', center ? 'af-sechead--center' : '', space ? `af-sechead--${space}` : ''].filter(Boolean).join(' ')}>
      {eyebrow ? <span className="af-eyebrow"><span className="af-mark" aria-hidden="true" />{eyebrow}</span> : null}
      <div className="af-sechead__row">{eyebrow ? null : <span className="af-mark" aria-hidden="true" />}<h2 className="af-h1">{title}</h2></div>
      {subtitle ? <Subtitle text={subtitle} /> : null}
      {lead ? <p className={longLead ? 'af-lead af-lead--sm' : 'af-lead'}>{lead}</p> : null}
      {children}
    </div>
  )
}
