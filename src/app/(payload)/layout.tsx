import config from '@payload-config'
import '@payloadcms/next/css'
import './admin-theme.css'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import type { ServerFunctionClient } from 'payload'
import type { ReactNode } from 'react'
import { Poppins } from 'next/font/google'
import { importMap } from './admin/importMap.js'

const serverFunction: ServerFunctionClient = async (args) => {
  'use server'
  return handleServerFunctions({ ...args, config, importMap })
}
// The site's font in the CMS.
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], display: 'swap' })

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      <style>{`:root { --font-body: ${poppins.style.fontFamily}, "Segoe UI", Arial, sans-serif; }`}</style>
      {children}
    </RootLayout>
  )
}
