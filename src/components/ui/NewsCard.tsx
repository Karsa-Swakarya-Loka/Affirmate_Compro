import Image from 'next/image'
import Link from 'next/link'
import type { Locale } from '@/i18n/config'
import { href } from '@/i18n/routes'
import type { Post, Ui } from '@/payload-types'
import { asMedia } from '@/lib/cms'

export function categoryLabel(category: Post['category'], ui: Ui): string {
  const s = ui.sections ?? {}
  return { 'regulatory-update': s.categoryRegulatoryUpdate, guide: s.categoryGuide, 'company-news': s.categoryCompanyNews }[category] || category
}
export const formatDate = (iso: string, locale: Locale) => new Date(iso).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

export function NewsCard({ post, locale, ui }: { post: Post; locale: Locale; ui: Ui }) {
  const cover = asMedia(post.cover)
  const url = href(locale, 'insights', post.slug)
  return (
    <article className="af-news">
      {cover?.url ? <Link href={url} tabIndex={-1} aria-hidden="true"><Image src={cover.sizes?.card?.url || cover.url} alt="" width={cover.sizes?.card?.width ?? cover.width ?? 800} height={cover.sizes?.card?.height ?? cover.height ?? 450} sizes="(min-width: 1024px) 33vw, 100vw" /></Link> : null}
      <div className="af-news__body">
        <div className="af-news__meta"><span className="af-news__cat">{categoryLabel(post.category, ui)}</span><span>{formatDate(post.publishedAt, locale)}</span></div>
        <h3 className="af-h3"><Link href={url}>{post.title}</Link></h3>
        <p>{post.excerpt}</p>
      </div>
    </article>
  )
}
