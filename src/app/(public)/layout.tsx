// Single public root layout for both languages so switching locale never crosses root layouts.
// The first response's <html lang> comes from proxy.ts (x-locale); LanguageSync keeps it right afterwards.
import type { ReactNode } from 'react'
import { headers } from 'next/headers'
import { Poppins } from 'next/font/google'
import { LanguageSync } from '@/i18n/LanguageSync'
import '@/styles/tokens.css'
import '@/styles/components.css'
import '@/styles/globals.css'

const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800'], variable: '--font-poppins', display: 'swap' })

export default async function PublicRootLayout({ children }: { children: ReactNode }) {
  const locale = (await headers()).get('x-locale') === 'id' ? 'id' : 'en'
  return (
    <html lang={locale} data-theme="light" className={poppins.variable} suppressHydrationWarning>
      <body className="af">
        <LanguageSync />
        {children}
      </body>
    </html>
  )
}
