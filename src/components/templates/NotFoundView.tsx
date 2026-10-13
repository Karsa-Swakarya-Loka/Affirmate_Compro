import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import { href } from '@/i18n/routes'
import { getUi } from '@/lib/cms'
import { SiteShell } from '@/components/layout/SiteShell'

export async function NotFoundView({ locale }: { locale: Locale }) {
  const ui = await getUi(locale)
  return (
    <SiteShell locale={locale}>
      <div className="af-container" style={{ paddingBlock: 'var(--space-20)', maxWidth: 720 }}>
        <div className="af-sechead__row"><span className="af-mark" aria-hidden="true" /><h1 className="af-h1">{ui.notFound?.title || 'Page not found'}</h1></div>
        <p className="af-lead" style={{ marginBlock: 'var(--space-4) var(--space-8)' }}>{ui.notFound?.text || 'The page you are looking for does not exist.'}</p>
        <Link className="af-btn af-btn--primary" href={href(locale, 'home')}>{ui.notFound?.home || 'Back to home'}</Link>
      </div>
    </SiteShell>
  )
}
