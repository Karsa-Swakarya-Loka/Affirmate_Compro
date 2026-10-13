import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

// Prints document counts per collection and whether each global has content, for STEP status reports.
const payload = await getPayload({ config })
try {
  const rows: Record<string, number | string> = {}
  for (const c of ['services', 'group-entities', 'milestones', 'clients', 'cities', 'posts', 'media', 'inquiries', 'users'] as const) {
    const { totalDocs } = await payload.count({ collection: c, overrideAccess: true })
    rows[c] = totalDocs
  }
  for (const g of ['site', 'home', 'legal', 'ui'] as const) {
    const doc = (await payload.findGlobal({ slug: g, overrideAccess: true, depth: 0 })) as unknown as Record<string, unknown>
    rows[`global:${g}`] = Object.keys(doc).filter(k => !['id', 'createdAt', 'updatedAt', 'globalType', '_status'].includes(k) && doc[k] != null).length ? 'filled' : 'empty'
  }
  console.table(rows)
} finally {
  await payload.destroy()
}
process.exit(process.exitCode ?? 0)
