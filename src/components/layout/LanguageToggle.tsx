'use client'
// EN | ID pill. Moves to the same page in the other language with client navigation and remembers the choice.
import { usePathname, useRouter } from 'next/navigation'
import { locales, type Locale } from '@/i18n/config'
import { localeFromPath, switchLocalePath } from '@/i18n/routes'

export const LANGUAGE_STORAGE_KEY = 'affirmate-language'

export function LanguageToggle({ label, className }: { label: string; className?: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const current = localeFromPath(pathname)
  function choose(target: Locale) {
    try { localStorage.setItem(LANGUAGE_STORAGE_KEY, target) } catch { /* optional */ }
    if (target === current) return
    router.push(switchLocalePath(pathname, target, window.location.search, window.location.hash))
  }
  return (
    <div className={['af-lang', className].filter(Boolean).join(' ')} role="group" aria-label={label}>
      {locales.map(l => (
        <button key={l} type="button" lang={l} aria-pressed={l === current} onClick={() => choose(l)}>{l.toUpperCase()}</button>
      ))}
    </div>
  )
}
