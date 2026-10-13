export function hasConsentForStatus(status: unknown, consent: unknown): boolean {
  return status !== 'published' || consent === true
}
export function validPhone(value: unknown): boolean {
  return typeof value === 'string' && /^\+?[0-9 ()-]{8,24}$/.test(value)
}
export function validEmail(value: unknown): boolean {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}
export function httpUrl(value: unknown): true | string {
  if (!value) return true
  try {
    const url = new URL(String(value))
    if (['http:', 'https:'].includes(url.protocol)) return true
  } catch {
    /* fall through */
  }
  return 'Gunakan URL http atau https yang lengkap.'
}
