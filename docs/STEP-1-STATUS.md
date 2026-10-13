# STEP 1 — Scaffold Next.js + Payload CMS (selesai 12 Okt 2026)

## Hasil
- Stack dipin sama dengan Apegale (terbukti jalan): Next 16.4.0, React 19.3.0, Payload 3.90.2 (+ db-sqlite, db-postgres, email-nodemailer, richtext-lexical), TypeScript 5.7.3, `@phosphor-icons/react` 2.1.10. Node 22.19, npm 11.
- `src/payload.config.ts`: localization EN (default) + ID, admin berbahasa Indonesia, 9 koleksi (`services`, `group-entities`, `milestones`, `clients`, `cities`, `posts`, `media`, `inquiries`, `users`), 4 global (`site`, `home`, `legal`, `ui`), email nodemailer bila `SMTP_HOST` diisi.
- Akses: publik hanya baca dokumen published; `inquiries` admin-only; global REST staff-only; editor tidak bisa ubah `site` dan `users`; user pertama otomatis admin.
- Validasi: slug, URL http(s), nomor telepon, email; logo klien hanya bisa published bila `consent` dicentang.
- Database: `src/lib/database.ts` memilih SQLite (dev, `.data/affirmate.db`) atau Postgres (produksi) dari env; schema push mati, migrasi di `src/migrations/<adapter>`. Migrasi awal `sqlite/20261012_132733` dibuat dan dijalankan.
- Route Payload (`/admin`, `/api/*`), layout publik dasar dengan Poppins via `next/font`, `src/styles/tokens.css` hasil generate dari `design/tokens.json`.
- Skrip: `setup:admin`, `verify:cms`, `tokens`, `preview`, `map`, `migrate*`, `seed` (langkah 2).

## Verifikasi
- `npx tsc --noEmit` dan `npx eslint` bersih.
- `npm run dev` di `http://127.0.0.1:3100` (port 3000 dipakai proyek lain): `/` 200, `/admin` 200 (halaman create-first-user), `GET /api/services` 200 (kosong).
- `.env` lokal dibuat dengan secret acak dan **tidak** masuk git; `.env.example` berisi placeholder.

## Keamanan repo
- `.gitignore` menutup `.env*` (kecuali example), `media/`, `.data/`, `node_modules/`, `.next/`, `.npm-cache/`, log install, tipe & importMap hasil generate, `desktop.ini`.
- Tidak ada kredensial atau data klien di `content/seed` (hanya konten compro publik dan kontak resmi perusahaan).

## Catatan
- `.dev.log` dan `.npm-install.log` hanya artefak lokal (ignored).
- Dev log menampilkan satu baris `⨯ turbopackServerFastRefresh` dari Next saat start; halaman tetap 200. Dipantau di langkah berikutnya.
