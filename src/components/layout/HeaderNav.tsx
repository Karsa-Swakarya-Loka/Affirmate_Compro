'use client'
// Anchor navigation (desktop row ≥1200px, mobile panel below). The panel locks page scroll while open,
// Escape closes it, and the current section is marked from the hash after navigation.
// The panel is portalled to <body>: the header's backdrop-filter would otherwise become the containing block
// of a position:fixed child and clip the panel to the header's 64px.
import Link from 'next/link'
import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from '@/components/ui/Icon'
import { LanguageToggle } from './LanguageToggle'

export type NavItem = { label: string; href: string }
type Labels = { openMenu: string; closeMenu: string; language: string; nav: string }
type Props = { items: NavItem[]; cta: { label: string; href: string }; labels: Labels }

function subscribeHash(cb: () => void) {
  window.addEventListener('hashchange', cb)
  window.addEventListener('popstate', cb)
  return () => { window.removeEventListener('hashchange', cb); window.removeEventListener('popstate', cb) }
}

export function HeaderNav({ items, cta, labels }: Props) {
  const [open, setOpen] = useState(false)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const uid = useId()
  // Current section: the URL hash (click / initial load) until scrolling takes over via the observer below.
  const hashCurrent = useSyncExternalStore(subscribeHash, () => window.location.hash.replace('#', ''), () => '')
  const [spied, setSpied] = useState<string | null>(null)
  const current = spied ?? hashCurrent

  // Scroll-spy: a section is "current" while it crosses a band about a third of the way down the viewport.
  useEffect(() => {
    const ids = items.map(i => i.href.split('#')[1]).filter(Boolean)
    const els = ids.map(id => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el))
    if (!els.length || !('IntersectionObserver' in window)) return
    const visible = new Map<string, number>()
    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting) visible.set(e.target.id, e.boundingClientRect.top)
        else visible.delete(e.target.id)
      }
      if (visible.size === 0) { if (window.scrollY < 80) setSpied('') ; return }
      // Several sections can touch the band at once; take the one whose top is highest (closest to the band).
      const [id] = [...visible.entries()].sort((a, b) => a[1] - b[1])[0]
      setSpied(id)
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [items])
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); burgerRef.current?.focus() } }
    // Rotating a tablet past the desktop breakpoint hides the panel; close it so the scroll lock goes too.
    const desktop = window.matchMedia('(min-width: 1200px)')
    const onDesktop = () => { if (desktop.matches) setOpen(false) }
    document.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onDesktop)
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey); desktop.removeEventListener('change', onDesktop) }
  }, [open])

  const isCurrent = (href: string) => href.includes('#') && href.split('#')[1] === current
  const links = items.map(item => (
    <Link key={item.href} href={item.href} aria-current={isCurrent(item.href) ? 'true' : undefined} onClick={() => { setOpen(false); setSpied(item.href.split('#')[1] ?? '') }}>{item.label}</Link>
  ))

  return (
    <>
      <nav className="af-nav" aria-label={labels.nav}>{links}</nav>
      <div className="af-header__end">
        <LanguageToggle label={labels.language} />
        <Link className="af-btn af-btn--primary af-btn--sm af-header__cta" href={cta.href}>{cta.label}</Link>
        <button ref={burgerRef} className="af-burger" type="button" aria-label={open ? labels.closeMenu : labels.openMenu} aria-expanded={open} aria-controls={`${uid}-panel`} onClick={() => setOpen(v => !v)}>
          <Icon name={open ? 'x' : 'list'} size={22} />
        </button>
      </div>
      {/* Only rendered while open, so server and first client render agree and document is always defined. */}
      {open ? createPortal(
        <div id={`${uid}-panel`} className="af-mobile">
          <nav className="af-mobile__nav" aria-label={labels.nav}>{links}</nav>
          <Link className="af-btn af-btn--primary af-mobile__cta" href={cta.href} onClick={() => setOpen(false)}>{cta.label}</Link>
        </div>,
        document.body,
      ) : null}
    </>
  )
}
