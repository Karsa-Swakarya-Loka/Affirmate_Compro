import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { Locale } from '@/i18n/config'
import { getLegal } from '@/lib/cms'
import { pageMetadata } from '@/lib/seo'
import { SiteShell } from '@/components/layout/SiteShell'
import { RichText } from '@/components/ui/RichText'

export async function privacyMetadata(locale: Locale): Promise<Metadata> {
  const legal = await getLegal(locale)
  return pageMetadata({ locale, route: 'privacy', title: legal.privacyTitle || 'Privacy Policy' })
}

export async function PrivacyPage({ locale }: { locale: Locale }) {
  const legal = await getLegal(locale)
  if (!legal?.privacyTitle) notFound()
  return (
    <SiteShell locale={locale}>
      <div className="af-container" style={{ paddingBlock: 'var(--space-12) var(--space-20)' }}>
        <div className="af-sechead__row" style={{ marginBottom: 'var(--space-6)' }}><span className="af-mark" aria-hidden="true" /><h1 className="af-h1">{legal.privacyTitle}</h1></div>
        {legal.updatedAt ? <p className="af-small" style={{ marginBottom: 'var(--space-6)' }}>{new Date(legal.updatedAt).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p> : null}
        <RichText value={legal.privacyBody} />
      </div>
    </SiteShell>
  )
}
