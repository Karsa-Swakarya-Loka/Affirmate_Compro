// POST /preview/exit — turns draft mode off and returns to the same page.
import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'
import { requestOrigin, safePath, sameSiteReferer } from '@/lib/preview'

export async function POST(request: Request) {
  ;(await draftMode()).disable()
  // Redirect relative to the public origin (Host header), not request.url, which Next may report as localhost.
  const origin = requestOrigin(request.headers)
  const from = sameSiteReferer(request.headers.get('referer'), origin)
  const path = safePath(from ? `${from.pathname}${from.search}` : null) ?? '/'
  return NextResponse.redirect(new URL(path, origin), 303)
}
