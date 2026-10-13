// Tells the public root layout which language the first HTML response is in (x-locale header)
// and strips trailing slashes with a 301. Payload admin/API, Next internals and static files are untouched.
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { localeFromPath } from './i18n/routes'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname.length > 1 && pathname.endsWith('/')) {
    const url = new URL(request.url)
    url.pathname = pathname.replace(/\/+$/, '') || '/'
    return NextResponse.redirect(url, 301)
  }
  const headers = new Headers(request.headers)
  headers.set('x-locale', localeFromPath(pathname))
  return NextResponse.next({ request: { headers } })
}

export const config = {
  matcher: ['/((?!admin|api|_next|brand|media|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\.[a-z0-9]+$).*)'],
}
