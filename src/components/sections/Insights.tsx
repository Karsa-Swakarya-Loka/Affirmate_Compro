import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import { href } from '@/i18n/routes'
import type { Post, Ui } from '@/payload-types'
import { NewsCard } from '@/components/ui/NewsCard'

export function Insights({ locale, posts, ui }: { locale: Locale; posts: Post[]; ui: Ui }) {
  if (!posts.length) return null
  return (
    <section className="af-section af-section--soft" id="insights">
      <div className="af-container">
        <div className="af-sechead">
          <div className="af-sechead__row"><span className="af-mark" aria-hidden="true" /><h2 className="af-h1">{ui.sections?.latestInsights || 'Insights'}</h2></div>
        </div>
        <div className="af-grid" style={{ display: 'grid', gap: 'var(--space-5)', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {posts.map(p => <NewsCard key={p.id} post={p} locale={locale} ui={ui} />)}
        </div>
        <p style={{ marginTop: 'var(--space-8)' }}><Link className="af-btn af-btn--outline" href={href(locale, 'insights')}>{ui.cta?.allInsights || 'All insights'}</Link></p>
      </div>
    </section>
  )
}
