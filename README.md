# Affirmate Administrative — website company profile

Landing page + CMS untuk PT Affirmate Tatakelola Nusantara (unit Affirmate Group). Next.js 16 App Router + Payload CMS 3 dalam satu aplikasi. Bahasa: English (`/`) dan Indonesia (`/id`). Halaman: landing (12 section), Insights (`/insights`, `/id/wawasan`), Privacy, 404, `sitemap.xml`, `robots.txt`.

Dokumen: `docs/PLAN.md`, `docs/01-brief.md` … `docs/04-acceptance.md`, `docs/OPEN-QUESTIONS.md` (bahan evaluasi klien), `design/README.md` (sistem desain), `docs/STEP-*-STATUS.md` (progres dan bukti uji).

## Menjalankan lokal

```bash
cp .env.example .env         # isi PAYLOAD_SECRET dan PREVIEW_SECRET (acak, >=32 karakter)
npm install
npm run migrate              # SQLite lokal di .data/affirmate.db
npm run seed                 # konten compro + aset design/assets (idempoten)
npm run dev                  # http://127.0.0.1:3100 dan /admin
```

Admin pertama: form "create first user" di `/admin`, atau `ADMIN_EMAIL=… ADMIN_PASSWORD=… npm run setup:admin`.
Skrip lain: `npm run verify:cms` (hitung isi CMS), `npm run tokens` (design tokens), `npm run map` (peta SVG dari geojson), `npm run og` tidak ada: gunakan `node scripts/build-og-image.mjs`.

## Alur konten
- Semua teks dua bahasa dikelola di `/admin` (Beranda, Pengaturan situs, Teks antarmuka, Kebijakan privasi, koleksi Layanan, Entitas grup, Milestone, Klien, Kota jaringan, Artikel).
- Section tersembunyi otomatis bila kosong atau dimatikan di tab **Visibilitas**.
- Logo klien hanya bisa dipublikasikan bila "Izin tampil" dicentang.
- Tombol **Preview** di admin membuka draf di situs (mode draf per browser; "Exit preview" untuk keluar).
- `npm run seed` tidak menimpa suntingan editor; `SEED_OVERWRITE=true npm run seed` mengembalikan ke JSON.
- File di `design/assets` diganti (ukuran berbeda) → `npm run media:refresh [People]` meng-upload ulang hanya file itu, tanpa menyentuh teks; di produksi cPanel jalankan dari server lewat **Run JS script** (lihat "Produksi: Hostinger cPanel"); `ENV_FILE=.env.production.local` hanya berlaku untuk prototype Vercel yang sudah dihapus.

## Produksi (hosting klien)

Kebutuhan: Node.js 22+, PostgreSQL 14+ (disarankan) atau SQLite bila hosting tidak punya Postgres, SMTP untuk email form.

```bash
# .env produksi
DATABASE_ADAPTER=postgres
DATABASE_URI=postgresql://affirmate:<password>@127.0.0.1:5432/affirmate
PAYLOAD_SECRET=<acak 32+>
PREVIEW_SECRET=<acak>
NEXT_PUBLIC_SITE_URL=https://<domain final>      # lihat docs/OPEN-QUESTIONS.md #1
MEDIA_DIR=/var/www/affirmate/media                 # folder persisten, di luar build
SMTP_HOST=… SMTP_PORT=587 SMTP_USER=… SMTP_PASS=… SMTP_FROM_ADDRESS=website@<domain>
INQUIRY_RECIPIENTS=info@affirmate.co.id

npm ci
npm run migrate          # menjalankan src/migrations/postgres
npm run build
npm run start -- --port 3100   # atau PM2: pm2 start npm --name affirmate -- start -- --port 3100
```

- Reverse proxy (Nginx/Caddy) ke port 3100 dengan HTTPS. Pastikan header `X-Forwarded-For` diteruskan (rate limit form).
- Seed produksi sekali: `npm run seed`, lalu buat admin lewat `/admin`.
- Backup: `pg_dump` + folder `MEDIA_DIR`. Upgrade: `git pull && npm ci && npm run migrate && npm run build && pm2 restart affirmate`.
- Skema berubah → `npm run migrate:create` untuk **kedua** adapter (sqlite untuk dev, postgres dengan `DATABASE_ADAPTER=postgres`), commit, lalu `npm run migrate` di server.

## Keamanan repo
`.env`, `media/`, `.data/`, `node_modules/`, `.next/`, log, dan file hasil generate tidak masuk git (lihat `.gitignore`). Jangan commit kredensial, data klien (`inquiries`), atau dump database. Admin publik hanya menerima dokumen `published`; form kontak lewat server action dengan honeypot, validasi, rate limit.

## Produksi: Hostinger cPanel (tatakelola.affirmate.co.id, sejak 28 Okt 2026)

Paket klien adalah cPanel shared hosting (Niagahoster `srv152`, Node 22 lewat **Setup Node.js App**/Passenger, tanpa Postgres). Jadi produksi memakai SQLite + media di disk, satu folder app `~/repositories/affirmate` (clone cPanel **Git Version Control**). Domain utama `affirmate.co.id` (WordPress lama di `public_html`) tidak disentuh; subdomain punya document root sendiri.

- Entry Passenger: `server.cjs` (CommonJS, `next` production server). Node.js App: versi 22, mode production, root `repositories/affirmate`, URL `tatakelola.affirmate.co.id`, startup `server.cjs`.
- cPanel hanya bisa menjalankan npm script lewat tombol **Run JS script**, maka langkah server ada di `package.json`: `hosting:env` (tulis `.env` dengan secret acak di server), `hosting:pull`, `hosting:unpack` (zip ekspor konten di `~`), `hosting:data` (unzip database + media siapan lokal), `hosting:next` (unduh hasil build), lalu **Restart**.
- CloudLinux membatasi ruang alamat proses 8 GB, sedangkan V8 memesan 10 GB per memori WebAssembly (dipakai tsx saat memuat config Payload) sehingga muncul `RangeError: WebAssembly.instantiate(): Out of memory`. Obatnya opsi Node `--disable-wasm-trap-handler`: skrip `hosting:*` sudah memasangnya lewat `NODE_OPTIONS`, dan variabel `NODE_OPTIONS=--disable-wasm-trap-handler` juga diset di Environment variables Node.js App agar server runtime ikut.
- Skrip Payload (`payload migrate`, `content:import`) ternyata tidak bisa jalan di cPanel ini: proses mati `process out of memory` saat memuat config meski heap baru 55 MB (batas LVE/ruang alamat). Jalan keluarnya: siapkan database di lokal (`DATABASE_URI=file:./.data/hosting.db MEDIA_DIR=./hosting-media npx payload migrate` lalu `npx tsx scripts/import-content.ts ./export-content`), zip `.data/affirmate.db` + `media/` jadi `hosting-data.zip`, unggah ke `~` lewat File Manager, lalu **Run JS script** `hosting:data` (unzip ke root app).
- `next build` juga tidak bisa di server: glibc-nya terlalu tua untuk `@next/swc-linux-x64-gnu` (butuh GLIBC 2.29) dan fallback WASM mati kehabisan memori. Maka build dilakukan di Linux lokal lewat Docker: `bash scripts/linux-build.sh` (Docker Desktop jalan, `gh` login) → `npm ci` + `next build` di `node:22-bookworm` → `.linux-build/next-build.tar.gz.part00..` (potongan < 10 MB) diunggah ke `~` lewat File Manager → di cPanel **Run JS script** `hosting:next` (gabung + ekstrak ke `.next`) lalu **Restart**.
- Pindah konten antar hosting: `ENV_FILE=<env sumber> npm run content:export` → folder `export-content/` (semua koleksi + global, semua bahasa, versi published + draft terakhir, file media asli) → zip → `content:import` ke database **kosong** (id dokumen dipertahankan). Pengguna admin tidak ikut: buat lewat `/admin/create-first-account`.
- Upgrade: push ke `main`, lalu di cPanel Git Version Control **Update from Remote** (atau `hosting:pull`), `Run NPM Install` bila dependensi berubah, migrasi database dijalankan lokal lalu `.data/affirmate.db` dikirim ulang lewat `hosting:data` bila skemanya berubah (unduh dulu DB server dari File Manager agar isi klien tidak hilang), `bash scripts/linux-build.sh` + `hosting:next`, **Restart**.
- **Batas proses CloudLinux (insiden 28 Okt 2026)**: akun dibatasi NPROC 100 (thread ikut dihitung), PMEM 2 GB, I/O 4 MB/s, EP 30. Dua penyebab tembus batas: (1) `next.config.ts` membuat `next start` memuat @next/swc tiap boot, gagal (glibc), lalu mencoba mengunduh fallback WASM lewat npm → kini config berupa `next.config.mjs`; (2) libvips/sharp, libuv, dan Tokio (libsql) membuat thread sebanyak core server → `server.cjs` mematok `VIPS_CONCURRENCY=1`, `UV_THREADPOOL_SIZE=2`, `TOKIO_WORKER_THREADS=2` (VIPS_CONCURRENCY juga diset sebagai env var Node.js App). Hasil: satu proses app ≈ 11 thread, RSS ±540 MB. Saat fork gagal, cPanel Node.js/Resource Usage ikut error `cagefs_enter: Unable to fork`; yang masih jalan hanya File Manager (UAPI `Fileman/save_file_content` dan `get_file_content`, API2 `Fileman::fileop op=unlink`) dan restart lewat tulis `tmp/restart.txt`.
- **Proses app yatim**: proses LiteSpeed bernama `lsnode:/home/u1064437/repositories/affirmate/` bisa lepas dari kendali tombol RESTART/STOP/START dan `tmp/restart.txt` (situs terus menyajikan build lama). Cek dengan Run JS script `hosting:ps`; matikan dengan `hosting:kill-app` (LiteSpeed spawn ulang pada request berikutnya, request pertama ±4 detik). Setelah `hosting:next`, selalu verifikasi dengan `curl -sI https://tatakelola.affirmate.co.id/` bahwa header dan markup sudah dari build baru.
- `hosting:clean` menghapus file transfer di `~` (zip konten, zip data, potongan build, clone lama `repositories/Affirmate_Compro`) setelah deploy.
- Form kontak: tanpa `SMTP_*` inquiry tetap tersimpan di CMS (`emailStatus: failed`) tapi email tidak terkirim. **Status 28 Okt 2026: SMTP belum diisi.** Temuan: Email Routing cPanel untuk `affirmate.co.id` masih **Local Mail Exchanger** padahal MX domain menunjuk Google Workspace (`aspmx.l.google.com`), sehingga email yang dikirim lewat SMTP server ini ke `info@affirmate.co.id` akan diantar ke kotak lokal (tidak ada) dan tidak pernah sampai ke Google. SPF (`+a` = IP server 217.21.72.208) dan DKIM `default._domainkey` sudah valid. Dua jalan: (a) ubah Email Routing `affirmate.co.id` ke **Remote Mail Exchanger** (cPanel → Email Routing; juga membetulkan email WordPress), buat mailbox `noreply@affirmate.co.id` di Email Accounts, lalu isi `SMTP_HOST=srv152.niagahoster.com`, `SMTP_PORT=465`, `SMTP_SECURE=true`, `SMTP_USER`/`SMTP_FROM_ADDRESS=noreply@affirmate.co.id`, `SMTP_PASS` sebagai Environment variables Node.js App (menang atas `.env`) → SAVE → **Restart**; atau (b) pakai SMTP Google Workspace klien (`smtp.gmail.com:465`, app password sebuah mailbox) tanpa menyentuh routing. Uji: kirim form di situs, buka CMS → Inquiries, `emailStatus` harus `sent` dan email tiba di `info@`.
- **Akun admin pertama**: sampai dibuat, `/admin/create-first-user` terbuka untuk siapa pun. Buat segera lewat `https://tatakelola.affirmate.co.id/admin/create-first-user` (peran Admin, email KaryaLo), lalu tambahkan pengguna klien dari CMS → Users. Payload otomatis menutup halaman itu setelah pengguna pertama ada.
- Backup: folder `.data/` (SQLite) + `media/` ikut JetBackup cPanel.

## Deploy ke Vercel (prototype lama: `affirmate-compro`, SUDAH dikosongkan 28 Okt 2026)

**Status 28 Okt 2026**: project Vercel `affirmate-compro` dan resource Neon `affirmate-db` sudah dihapus (backup terakhir konten: `export-content-vercel-final-2026-10-28.zip`, gitignored, hasil `content:export`). Blob store `affirmate-media` (`store_SmW7yT1uxtDlwjEb`, 87 file) belum terhapus karena CLI menolak penghapusan non-interaktif; pemilik akun menjalankan sendiri `vercel blob delete-store store_SmW7yT1uxtDlwjEb --scope awwalakhalqins-projects` di terminal. `.env.production.local` dan `.vercel/` tidak dipakai lagi. Catatan di bawah dipertahankan sebagai arsip.

Vercel serverless tanpa disk permanen: database Postgres Neon (Singapura) dan media di Vercel Blob (`BLOB_READ_WRITE_TOKEN`; tanpa token, media tetap di `MEDIA_DIR`). Functions di `sin1` (`vercel.json`).

- Env Production + Preview: `PAYLOAD_SECRET`, `DATABASE_ADAPTER=postgres`, `DATABASE_URI` (Neon pooled), `NEXT_PUBLIC_SITE_URL` (domain persis, dipakai CSRF login admin), `BLOB_READ_WRITE_TOKEN`, SMTP_* opsional. Development sengaja kosong agar laptop tidak menyentuh produksi.
- Build membaca CMS: migrasi dijalankan dari laptop ke Neon **sebelum** push (`npm run migrate`, koneksi unpooled). Build tidak menjalankan migrasi.
- Skema berubah → `npm run migrate:create` untuk postgres **dengan `BLOB_READ_WRITE_TOKEN` aktif** (plugin Blob menambah kolom `_objectKey`), dan untuk sqlite tanpa token.
- Seed ke produksi dengan `MEDIA_DIR` folder kosong; kalau tidak, nama file bentrok dengan `media/` lokal dan diberi akhiran `-1`.
