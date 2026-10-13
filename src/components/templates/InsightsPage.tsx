import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Locale } from '@/i18n/config'
import { href } from '@/i18n/routes'
import { getPost, getPosts, getUi, getLatestPosts } from '@/lib/cms'
import { pageMetadata } from '@/lib/seo'
import { SiteShell } from '@/components/layout/SiteShell'
import { NewsCard, categoryLabel, formatDate } from '@/components/ui/NewsCard'
import { RichText } from '@/components/ui/RichText'
import { Photo } from '@/components/ui/Photo'
import { JsonLd } from '@/components/seo/JsonLd'
import { absoluteUrl } from '@/lib/seo'

const categories = ['regulatory-update', 'guide', 'company-news'] as const

export async function insightsMetadata(locale: Locale): Promise<Metadata> {
  const ui = await getUi(locale)
  return pageMetadata({ locale, route: 'insights', title: ui.nav?.insights || 'Insights' })
}

export async function InsightsPage({ locale, page, category }: { locale: Locale; page: number; category?: string }) {
  const ui = await getUi(locale)
  const cat = categories.find(c => c === category)
  const { docs, totalPages } = await getPosts(locale, page, cat)
  const base = href(locale, 'insights')
  const link = (p: number, c?: string) => `${base}${c ? `?category=${c}` : ''}${p > 1 ? `${c ? '&' : '?'}page=${p}` : ''}`
  return (
    <SiteShell locale={locale}>
      <div className="af-container af-pagehead">
        <div className="af-sechead__row"><span className="af-mark" aria-hidden="true" /><h1 className="af-h1">{ui.nav?.insights || 'Insights'}</h1></div>
      </div>
      <div className="af-container" style={{ paddingBottom: 'var(--space-20)' }}>
        <nav className="af-filter" aria-label="Category">
          <Link href={link(1)} aria-current={!cat ? 'true' : undefined}>{ui.sections?.categoryAll || 'All'}</Link>
          {categories.map(c => <Link key={c} href={link(1, c)} aria-current={cat === c ? 'true' : undefined}>{categoryLabel(c, ui)}</Link>)}
        </nav>
        {docs.length ? (
          <div style={{ display: 'grid', gap: 'var(--space-5)', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {docs.map(p => <NewsCard key={p.id} post={p} locale={locale} ui={ui} />)}
          </div>
        ) : <p className="af-lead">{locale === 'id' ? 'Belum ada artikel.' : 'No articles yet.'}</p>}
        {totalPages > 1 ? (
          <nav className="af-pagination" aria-label="Pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (p === page ? <span key={p} aria-current="page">{p}</span> : <Link key={p} href={link(p, cat)}>{p}</Link>))}
          </nav>
        ) : null}
      </div>
    </SiteShell>
  )
}

export async function insightMetadata(locale: Locale, slug: string): Promise<Metadata> {
  const post = await getPost(locale, slug)
  if (!post) return {}
  return pageMetadata({ locale, route: 'insights', slug, title: post.seo?.title || post.title, description: post.seo?.description || post.excerpt, image: post.seo?.ogImage || post.cover, type: 'article', publishedTime: post.publishedAt, modifiedTime: post.updatedAt })
}

export async function InsightPage({ locale, slug }: { locale: Locale; slug: string }) {
  const [post, ui] = await Promise.all([getPost(locale, slug), getUi(locale)])
  if (!post) notFound()
  const related = (await getLatestPosts(locale, 4)).filter(p => p.id !== post.id).slice(0, 3)
  return (
    <SiteShell locale={locale}>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Article', headline: post.title, datePublished: post.publishedAt, dateModified: post.updatedAt, inLanguage: locale, mainEntityOfPage: absoluteUrl(href(locale, 'insights', post.slug)), ...(post.author ? { author: { '@type': 'Person', name: post.author } } : {}) }} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: ui.nav?.insights || 'Insights', item: absoluteUrl(href(locale, 'insights')) },
        { '@type': 'ListItem', position: 2, name: post.title, item: absoluteUrl(href(locale, 'insights', post.slug)) },
      ] }} />
      <article className="af-container" style={{ paddingBlock: 'var(--space-12) var(--space-20)' }}>
        <div className="af-pagehead" style={{ paddingTop: 0 }}>
          <p className="af-breadcrumb"><Link href={href(locale, 'insights')}>{ui.nav?.insights || 'Insights'}</Link> / {categoryLabel(post.category, ui)}</p>
          <h1 className="af-h1" style={{ textTransform: 'none', maxWidth: '24ch' }}>{post.title}</h1>
          <p className="af-small" style={{ marginTop: 'var(--space-3)' }}>{formatDate(post.publishedAt, locale)}{post.author ? ` · ${post.author}` : ''}</p>
        </div>
        <Photo media={post.cover} className="af-leaf--xl" sizes="(min-width: 1024px) 60vw, 100vw" />
        <div style={{ marginTop: 'var(--space-8)' }}><RichText value={post.body} /></div>
        {related.length ? (
          <section style={{ marginTop: 'var(--space-16)' }}>
            <div className="af-sechead__row" style={{ marginBottom: 'var(--space-6)' }}><span className="af-mark" aria-hidden="true" /><h2 className="af-h2">{ui.sections?.relatedPosts || 'Related articles'}</h2></div>
            <div style={{ display: 'grid', gap: 'var(--space-5)', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>{related.map(p => <NewsCard key={p.id} post={p} locale={locale} ui={ui} />)}</div>
          </section>
        ) : null}
      </article>
    </SiteShell>
  )
}
