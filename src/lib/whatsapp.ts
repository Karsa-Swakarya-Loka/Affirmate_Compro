/** wa.me link from a digits-only number; null when the CMS has no number (button hidden). */
export function whatsappHref(number: string | null | undefined, message?: string | null): string | null {
  const digits = (number ?? '').replace(/\D/g, '')
  if (!digits) return null
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ''}`
}

/** Human-readable form of the stored digits: "+62 819 0505 6482" for Indonesian numbers, "+<digits>" otherwise. */
export function whatsappDisplay(number: string | null | undefined): string {
  const d = (number ?? '').replace(/\D/g, '')
  if (!d) return ''
  if (d.startsWith('62') && d.length >= 11) return `+62 ${d.slice(2, 5)} ${d.slice(5, 9)} ${d.slice(9)}`.trim()
  return `+${d}`
}
