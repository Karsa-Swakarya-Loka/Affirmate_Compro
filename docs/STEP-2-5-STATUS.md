# STEP 2–5 — Seed, fondasi frontend, dan landing page lengkap (selesai 12 Okt 2026)

Tiga langkah PLAN digabung karena saling bergantung dan selesai dalam satu sesi.

## Step 2 — Seed
- `src/seed/{manifest,normalize,store,run,index}.ts`: upsert idempoten by `seedKey`/`slug`, media hanya dari `design/assets/**`, dua locale (EN lalu ID), `SEED_OVERWRITE=true` untuk reset dari JSON.
- `content/seed/legal.json` ditambahkan (teks privasi standar). Seed JSON lain disesuaikan dengan skema CMS (nama ikon Phosphor, kamus UI, galeri Office, foto per section).
- Hasil (`npm run verify:cms`): media 19, services 4, group-entities 4, milestones 7, clients 3 (draft, menunggu izin), cities 13, globals site/home/legal/ui terisi. Dijalankan dua kali tanpa duplikat.

## Step 3 — Fondasi frontend
- Routing EN `/` dan ID `/id` (`src/i18n/routes.ts`), `proxy.ts` mengirim `x-locale` ke root layout dan menghapus trailing slash, `LanguageSync` + `LanguageToggle` (client navigation, ingat pilihan).
- `src/lib/cms.ts` (hanya published, draft preview untuk admin), `seo.ts` (canonical, hreflang en/id/x-default, OG), `whatsapp.ts`, `preview.ts`; route `/preview` dan `/preview/exit`.
- Shell: `Header` (nav anchor satu baris ≥1200px, burger + panel mobile), `Footer`, skip link, bar pratinjau, WhatsApp float (muncul hanya bila nomor diisi).
- Styles: `src/styles/tokens.css` (generate), `components.css` (salinan design tanpa @import), `globals.css` (shell, menu mobile, prose, pagination).
- Ikon: `@phosphor-icons/react` SSR lewat `components/ui/Icon.tsx`; peta: `src/lib/indonesia-land.ts` di-generate dari geojson oleh `scripts/build-map-svg.py`, pin dari koleksi `cities`.

## Step 4–5 — Landing page
- 11 section (`components/sections/*`) sesuai urutan compro dan desain v2 template brosur; tiap section sembunyi bila toggle CMS mati atau koleksinya kosong, dan menunya ikut hilang.
- `templates/HomePage.tsx` menyusun semuanya + JSON-LD `Organization` (dengan `parentOrganization` Affirmate Group) dan `ItemList` layanan.
- Halaman tambahan: Insights list (filter kategori, pagination 9), detail artikel (JSON-LD Article + Breadcrumb), Privacy, 404 dua bahasa, `sitemap.xml`, `robots.txt`.
- Form kontak: server action `app/actions/inquiry.ts` (honeypot → validasi → duplikat → rate limit 10/jam/IP → simpan → email ke `site.inquiryRecipients` atau `INQUIRY_RECIPIENTS`), `ContactForm` client dengan `useActionState` dan error inline. Tanpa SMTP, `emailStatus` dicatat `failed` dan data tetap tersimpan.

## Verifikasi
- `tsc` dan `eslint` bersih. Semua route 200: `/`, `/id`, `/insights`, `/id/wawasan`, `/privacy`, `/id/privasi`, `/sitemap.xml`, `/robots.txt`; path acak 404 di kedua bahasa.
- Render di 1440 dan 390 diperiksa lewat screenshot headless; perbaikan: URL media dibuat same-origin untuk `next/image`, eyebrow hero diperpendek, misi dipisah titik, foto services diberi rasio tetap, label nav "Office".
- Admin lokal dibuat lewat `setup:admin` (kredensial dev saja, tidak disimpan di repo).

## Belum / langkah berikutnya
- Step 6: uji kirim form lewat browser (JS dan tanpa JS) dan SMTP sungguhan.
- Step 7: tombol "Preview" di admin (livePreview/`admin.preview` di global `home` dan koleksi `posts`), artikel contoh draft.
- Step 8–9: audit Lighthouse, aksesibilitas keyboard, 360–1920px; migrasi Postgres pertama.
- Step 10: README deploy final, paket evaluasi klien.
