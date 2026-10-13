import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const config: NextConfig = {
  // AVIF first (smallest), WebP for browsers without it.
  images: { formats: ['image/avif', 'image/webp'] },
  // Next writes an AGENTS.md on dev start; the repo keeps its own docs instead.
  agentRules: false,
  async redirects() {
    return [{ source: '/id/', destination: '/id', statusCode: 301 }]
  },
}
export default withPayload(config)
