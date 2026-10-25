'use client'
// Reveals a block once when it first enters the viewport (fade + short rise). Content stays visible without
// JavaScript, with reduced motion, and when already on screen at load. Motion dial 3: besides the network map's pins
// (components.css, keyed on this component's `is-in`), this is the only motion.
import { useEffect, useRef, type ReactNode } from 'react'

export function Reveal({ children, className, as: Tag = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'section' | 'li' }) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || el.getBoundingClientRect().top < window.innerHeight || !('IntersectionObserver' in window)) { el.classList.add('is-in'); return }
    el.classList.add('af-reveal')
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { el.classList.add('is-in'); io.disconnect() }
    }, { rootMargin: '0px 0px -10% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Element = Tag as any
  return <Element ref={ref} className={className}>{children}</Element>
}
