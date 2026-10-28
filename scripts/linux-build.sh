#!/usr/bin/env bash
# Builds the production .next output on Linux (Docker, Node 22) and packs it as next-build.tar.gz split into
# parts under 10 MB (.linux-build/next-build.tar.gz.part00, 01, ...). Upload the parts to the cPanel home folder
# with File Manager, then Run JS script `hosting:next` joins and unpacks them into .next; then Restart the app.
# The hosting's glibc is too old for @next/swc, so `next build` cannot run there (28 Oct 2026).
#
#   bash scripts/linux-build.sh            # from the project root, Docker Desktop running
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
work="${LINUX_BUILD_DIR:-$root/.linux-build}"
rm -rf "$work" && mkdir -p "$work/.data"
git -C "$root" archive HEAD | tar -x -C "$work"
# The build needs a readable config and database; pages render at request time, so the content does not matter.
cp "$root/hosting-data/.data/affirmate.db" "$work/.data/affirmate.db" 2>/dev/null || cp "$root/.data/affirmate.db" "$work/.data/affirmate.db"
node -e "
const c=require('crypto');require('fs').writeFileSync(process.argv[1],[
'DATABASE_ADAPTER=sqlite','DATABASE_URI=file:./.data/affirmate.db','MEDIA_DIR=media',
'PAYLOAD_SECRET='+c.randomBytes(24).toString('hex'),'PREVIEW_SECRET='+c.randomBytes(16).toString('hex'),
'NEXT_PUBLIC_SITE_URL=https://tatakelola.affirmate.co.id','SMTP_HOST=','SMTP_PORT=465','SMTP_SECURE=true','SMTP_USER=','SMTP_PASS=','INQUIRY_RECIPIENTS=info@affirmate.co.id',''].join('
'))" "$work/.env"
MSYS_NO_PATHCONV=1 docker run --rm -v "$work:/app" -w /app -e NEXT_TELEMETRY_DISABLED=1 node:22-bookworm   bash -c "npm ci --no-audit --no-fund && npm run build && rm -rf .next/cache next-build.tar.gz*     && tar -czf next-build.tar.gz -C .next . && split -b 9m -d next-build.tar.gz next-build.tar.gz.part && ls -la next-build.tar.gz*"
echo "Upload $work/next-build.tar.gz.part* to /home/u1064437 (cPanel File Manager), then Run JS script hosting:next, then Restart."
