// CMS (Payload admin) graphics from the public site's brand files: the Affirmate logo on the login screen, the app icon
// in the navigation and breadcrumbs. Registered in payload.config.ts → admin.components.graphics.
import Image from 'next/image'

export function AdminLogo() {
  return <Image src="/brand/logo.webp" alt="Affirmate Administrative" width={793} height={421} priority style={{ width: 200, maxWidth: '100%', height: 'auto' }} />
}

export function AdminIcon() {
  return <Image src="/brand/icon-192.png" alt="Affirmate Administrative" width={192} height={192} style={{ width: 30, height: 'auto', borderRadius: 6 }} />
}
