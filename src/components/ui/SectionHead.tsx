// Section head on a rule. Left: green leaf mark + uppercase title (template "▣ OUR SERVICE"), with an optional
// eyebrow above. Right: the message (subtitle with highlighted tail, then the lead). Both columns stand on the same
// rule, so the content under them starts aligned. Reading order: title (where am I) → subtitle → lead (the detail).
import type { ReactNode } from 'react'

type Props = {
  title: string; subtitle?: string | null; lead?: string | null; eyebrow?: string | null; center?: boolean; children?: ReactNode
  /** Gap to the content below: default 40px, tight 32px, flush 0 (no rule). */
  space?: 'tight' | 'flush'
  /** Lead runs 4+ lines: set it at body size so it does not compete with the subtitle. */
  longLead?: boolean
  /** Inside a narrow column: title and message stack instead of sharing the rule. */
  stack?: boolean
}

/** Splits "Nationwide coverage, global connections" so the part after the last comma is highlighted, like the design. */
export function Subtitle({ text }: { text: string }) {
  const i = text.lastIndexOf(',')
  if (i < 0) return <p className="af-subtitle">{text}</p>
  return <p className="af-subtitle">{text.slice(0, i + 1)} <em>{text.slice(i + 1).trim()}</em></p>
}

export function SectionHead({ title, subtitle, lead, eyebrow, center, children, space, longLead, stack }: Props) {
  const aside = subtitle || lead || children
  return (
    <div className={['af-sechead', center ? 'af-sechead--center' : '', stack ? 'af-sechead--stack' : '', space ? `af-sechead--${space}` : ''].filter(Boolean).join(' ')}>
      <div className="af-sechead__main">
        {eyebrow ? <span className="af-eyebrow"><span className="af-mark" aria-hidden="true" />{eyebrow}</span> : null}
        <div className="af-sechead__row">{eyebrow ? null : <span className="af-mark" aria-hidden="true" />}<h2 className="af-h1">{title}</h2></div>
      </div>
      {aside ? (
        <div className="af-sechead__aside">
          {subtitle ? <Subtitle text={subtitle} /> : null}
          {lead ? <p className={longLead ? 'af-lead af-lead--sm' : 'af-lead'}>{lead}</p> : null}
          {children}
        </div>
      ) : null}
    </div>
  )
}
