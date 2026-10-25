import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const config: NextConfig = {
  // AVIF first (smallest), WebP for browsers without it.
  // CMS files carry a `?v=` stamp (lib/cms.ts asMedia) so a replaced upload is not served from the year-long image
  // cache; static brand images under /public take no query.
  images: { formats: ['image/avif', 'image/webp'], localPatterns: [{ pathname: '/api/media/file/**' }, { pathname: '/brand/**', search: '' }] },
  // Next writes an AGENTS.md on dev start; the repo keeps its own docs instead.
  agentRules: false,
  // Security-advisory reminders for coding-agent upgrades (next upgrade --agent); does not upgrade on its own.
  experimental: { agentUpgrade: 'security' },
  async redirects() {
    return [{ source: '/id/', destination: '/id', statusCode: 301 }]
  },
}
export default withPayload(config)
