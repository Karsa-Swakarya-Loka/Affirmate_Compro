'use client'
// Keeps <html lang> equal to the URL's locale after client-side navigation. The URL decides the language.
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { localeFromPath } from './routes'

export function LanguageSync() {
  const pathname = usePathname()
  useEffect(() => {
    document.documentElement.lang = localeFromPath(pathname)
  }, [pathname])
  return null
}
