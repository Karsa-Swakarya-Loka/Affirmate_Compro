// Startup file for Phusion Passenger (cPanel "Setup Node.js App" on the client's Hostinger plan, 28 Oct 2026).
// Passenger requires this file and replaces `listen` with its own socket, so the port is only a fallback for
// running it by hand: `NODE_ENV=production node server.cjs`. Build first with `npm run build`.
// CommonJS on purpose: Passenger loads the entry with require(), and the package is otherwise ESM.
// CloudLinux counts threads against the account's process limit (NPROC, hit 169x on 28 Oct 2026) and the shared
// server reports many cores, so libvips (sharp, image optimisation) and the libuv pool must not size their thread
// pools from the core count. Set before anything that may initialise them.
process.env.VIPS_CONCURRENCY ||= '1'
process.env.UV_THREADPOOL_SIZE ||= '2'
process.env.TOKIO_WORKER_THREADS ||= '2' // libsql (SQLite driver) runs a Tokio runtime

const { createServer } = require('node:http')
const next = require('next')

const port = Number(process.env.PORT) || 3000
const app = next({ dev: false, port })
const handle = app.getRequestHandler()
app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`Affirmate ready on port ${port}`)
  })
}).catch(err => {
  console.error('Affirmate failed to start', err)
  process.exit(1)
})
