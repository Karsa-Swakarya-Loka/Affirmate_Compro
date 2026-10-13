// GET /preview?path=/id — opened from /admin. Only a signed-in CMS user may turn on draft mode for their browser.
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { payloadClient } from '@/lib/cms'
import { requestOrigin, safePath, sameSiteReferer } from '@/lib/preview'

export async function GET(request: Request) {
  const path = safePath(new URL(request.url).searchParams.get('path')) ?? '/'
  const payload = await payloadClient()
  // The admin "Preview" button is a plain link: the browser sends Referer but no Origin. Payload's cookie auth
  // requires a whitelisted Origin, so derive it from a same-site Referer before asking Payload who this is.
  const incoming = new Headers()
  request.headers.forEach((v, k) => incoming.set(k, v))
  const origin = requestOrigin(incoming)
  if (!incoming.get('origin') && sameSiteReferer(incoming.get('referer'), origin)) incoming.set('origin', origin)
  const { user } = await payload.auth({ headers: incoming })
  if (!user) return new Response('Masuk ke /admin terlebih dahulu untuk melihat pratinjau.', { status: 401 })
  ;(await draftMode()).enable()
  redirect(path)
}
