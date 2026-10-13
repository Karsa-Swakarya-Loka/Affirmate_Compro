/** wa.me link from a digits-only number; null when the CMS has no number (button hidden). */
export function whatsappHref(number: string | null | undefined, message?: string | null): string | null {
  const digits = (number ?? '').replace(/\D/g, '')
  if (!digits) return null
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ''}`
}
