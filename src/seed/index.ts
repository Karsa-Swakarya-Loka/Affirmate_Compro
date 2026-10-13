import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config.ts'
import { runSeed } from './run.ts'
import { payloadStore } from './store.ts'

const payload = await getPayload({ config })
try {
  console.table(await runSeed(payloadStore(payload), process.cwd(), process.env.SEED_OVERWRITE === 'true'))
} finally {
  await payload.destroy()
}
process.exit(process.exitCode ?? 0)
