/** Same-site paths only, so /preview and /preview/exit can never redirect to another host. */
export function safePath(value: string | null | undefined): string | null {
  if (!value || !value.startsWith('/') || value.startsWith('//') || value.includes('\\')) return null
  return value
}

/** Public origin of this request: forwarded host behind a proxy, else Host header, else NEXT_PUBLIC_SITE_URL. */
export function requestOrigin(headers: Headers): string {
  const host = headers.get('x-forwarded-host') || headers.get('host')
  if (!host) return (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3100').replace(/\/+$/, '')
  const proto = headers.get('x-forwarded-proto') || (host.startsWith('localhost') || host.startsWith('127.') ? 'http' : 'https')
  return `${proto}://${host}`
}
/** True when `referer` points at the same site as this request. */
export function sameSiteReferer(referer: string | null, origin: string): URL | null {
  if (!referer) return null
  try { const u = new URL(referer); return u.origin === origin ? u : null } catch { return null }
}
