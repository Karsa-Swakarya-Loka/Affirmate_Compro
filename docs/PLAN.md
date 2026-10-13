# Rencana implementasi Affirmate Administrative

Tanggal: 12 Oktober 2026. Status: langkah 1–10 dikerjakan pada 12 Okt 2026 (lihat docs/STEP-*-STATUS.md); yang tersisa menunggu klien: domain, hosting, SMTP produksi, keputusan OPEN-QUESTIONS. Keputusan owner: desain baru dari compro, dikerjakan langsung dari plan, urutan section = compro, Office dipertahankan, evaluasi lewat preview lokal. Root aplikasi: folder `web/` ini. Semua path relatif terhadap `web/`.

Dasar: `docs/00-reset-analisis.md`, `docs/01-brief.md`, `docs/02-sitemap-dan-template.md`, `docs/03-cms-payload.md`, `docs/04-acceptance.md`, `docs/OPEN-QUESTIONS.md`, `design/README.md`, `design/tokens.json`, `design/components.css`, `design/preview-landing.html` (acuan visual yang sudah diperiksa pada 1440px dan 390px), `content/seed/*.json` (8 file), `../Compro Affirmate Rev 3_Compress.pdf`.

## 1. Ringkasan dalam 5 poin

1. Membangun website company profile baru **PT Affirmate Tatakelola Nusantara (Affirmate Administrative)**: satu landing page dengan 11 section mengikuti urutan compro Rev 3, ditambah Insights (list + detail) sebagai bonus CMS, dan halaman Privacy. English default di `/`, Indonesia di `/id`.
2. Stack sama dengan Apegale: **Next.js App Router + TypeScript + Payload CMS 3** dalam satu aplikasi, **PostgreSQL** (SQLite hanya cadangan hosting), upload lokal persisten, `next/image`, Poppins via `next/font/google`, ikon `@phosphor-icons/react` (regular, satu keluarga, tanpa SVG gambar tangan). Versi stable dipin di lockfile saat instalasi.
3. Visual mengikuti `design/`: kelas `af-*` dan token hijau compro; CSS biasa berbasis `tokens.css`, tanpa Tailwind/UI kit/CSS-in-JS, tanpa slider otomatis. Responsif 360–1920px, WCAG 2.2 AA, reveal sekali saat masuk viewport, hormati `prefers-reduced-motion`.
4. Konten seluruhnya dari `content/seed/*.json` (teks compro EN + terjemahan ID) ke CMS; tidak mengarang fakta. Entri `needsReview` tetap dipublikasikan di lingkungan dev agar preview penuh, tetapi ditandai di admin; status produksi ditentukan klien lewat OPEN-QUESTIONS.
5. Hasil: admin dapat mengubah semua section dua bahasa, draft/publish + preview, seed idempoten, form tersimpan + email, SEO (metadata, hreflang, sitemap, JSON-LD), Lighthouse mobile ≥ 90, panduan deploy ke hosting klien. Evaluasi owner/klien memakai preview lokal (`npm run dev`) dan screenshot 1440/390 per STEP.

## 2. Struktur folder

~~~text
web/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── layout.tsx                 # root layout publik EN/ID (lang dari segmen)
│   │   │   ├── page.tsx                   # EN landing
│   │   │   ├── insights/page.tsx · insights/[slug]/page.tsx · privacy/page.tsx · not-found.tsx
│   │   │   └── id/
│   │   │       ├── page.tsx               # ID landing
│   │   │       └── wawasan/page.tsx · wawasan/[slug]/page.tsx · privasi/page.tsx · not-found.tsx
│   │   ├── (payload)/                     # hasil scaffold Payload: admin + api
│   │   ├── api/inquiries/route.ts · api/preview/route.ts · api/exit-preview/route.ts
│   │   ├── sitemap.ts · robots.ts
│   ├── collections/  Services · GroupEntities · Milestones · Clients · Cities · Posts · Media · Inquiries · Users
│   ├── globals/      Site · Home · Legal · Ui
│   ├── components/
│   │   ├── ui/        Button, SectionHeading, IconCircle, Chip, Badge
│   │   ├── layout/    Header (nav anchor + burger), Footer, LanguageToggle, WhatsAppFloat
│   │   ├── sections/  Hero, About (+StatBar), Why, Group, Services (+PlatformStrip), Journey, Clients, Network (+Map), Office, Insights, Contact
│   │   ├── content/   RichText, NewsCard, Pagination
│   │   ├── forms/     ContactForm
│   │   ├── motion/    Reveal
│   │   ├── templates/ LandingTemplate, InsightsListTemplate, InsightDetailTemplate, PrivacyTemplate
│   │   └── seo/       JsonLd (Organization, Service, Article, BreadcrumbList)
│   ├── styles/        tokens.css (copy generate), components.css (basis af-*), globals.css, motion.css
│   ├── seed/          index.ts · normalize.ts · media.ts
│   ├── i18n/          config.ts · routes.ts · dictionary.ts · LanguageSync.tsx
│   ├── lib/           cms.ts (query), seo.ts, email.ts, validate.ts, access.ts
│   ├── migrations/
│   ├── payload.config.ts · payload-types.ts
├── public/            favicon (kubus hijau), og-default
├── media/             upload CMS (volume persisten)
├── scripts/           build-tokens.mjs · build-preview.mjs · build-map-svg.py (sudah ada; land SVG dari geojson + pin dari cities.json) · create-admin.ts · verify-cms.ts
├── content/seed/      8 JSON (sudah ada)
├── design/            sistem desain (sudah ada)
├── docs/              dokumen ini + STEP-n-STATUS
├── next.config.ts · package.json · .env.example · README.md
~~~

Route ID adalah pembungkus tipis yang mengirim `locale="id"` ke template bersama; satu root layout publik agar toggle bahasa tidak melintasi root layout. Query CMS di server component, memfilter `published` kecuali mode preview. Komponen client hanya untuk burger menu, toggle bahasa, accordion layanan di mobile, form, dan reveal.

## 3. Keputusan implementasi

| Topik | Keputusan |
|---|---|
| Locale | `defaultLocale: 'en'`, `fallback: true`. Slug artikel tidak dilokalkan. Pasangan URL di `i18n/routes.ts`. |
| Section kosong | Milestones/Clients/Insights/Office(gallery)/Stats tersembunyi bila data kosong atau `sectionsVisible` false; item menu ikut hilang. |
| Services di mobile | Kartu dengan daftar item >6 memakai accordion ("Show all") agar halaman tidak terlalu panjang; desktop tampil penuh. |
| Map | SVG dihasilkan saat build (`scripts/build-map-svg.mts`) dari geojson + `cities` CMS; disimpan sebagai komponen server, pin & label dari data CMS saat render agar admin bisa menambah kota tanpa build ulang (geojson land tetap statis). Atribusi ODbL di footer kecil. |
| Hero | Foto dari CMS (`home.hero.image`), bidang gradien diagonal CSS, angka tahun opsional dari CMS (kosong = tidak tampil). |
| Font | Poppins 300/400/500/600/700/800 via `next/font/google`, `display: swap`. |
| Form | Route handler: validasi zod, honeypot, rate-limit memori sederhana per IP (10/jam), simpan ke `inquiries`, email via Payload email adapter (nodemailer, `SMTP_*`). Tanpa reCAPTCHA. |
| Admin | Bahasa admin Indonesia; role `admin`/`editor`; editor tidak bisa ubah `site`, `legal`, `users`. |
| Preview draft | `api/preview` dengan secret, `draftMode()`; tombol "Lihat preview" di admin untuk `home` dan `posts`. |
| SEO | `generateMetadata` per halaman dari CMS, `alternates.languages` en/id/x-default, `sitemap.ts` dua bahasa, `robots.ts`, JSON-LD dari data yang tampil. |
| Gambar | `next/image` dengan `sizes` yang benar; media CMS dilayani dari `/media`. |
| Motion | `Reveal` memakai IntersectionObserver, kelas `af-reveal`/`is-in`; total JS motion <3 KB. |
| Hosting | Build standalone Node.js; README menjelaskan PostgreSQL + opsi SQLite (`DATABASE_URI=file:`); folder `media/` persisten; backup `pg_dump` + `media/`. |

## 4. Langkah pengerjaan (tiap langkah diakhiri `docs/STEP-n-STATUS.md` + screenshot 1440/390 bila ada UI)

| # | Langkah | Hasil yang diperiksa |
|---|---|---|
| 1 | Scaffold Next.js + Payload 3 + Postgres; `payload.config.ts` dengan localization, globals, collections, access, media sizes; `.env.example`; `create-admin.ts`; migrasi awal. | `/admin` login, semua koleksi/global tampil berbahasa Indonesia, tipe tergenerate. |
| 2 | Seed: `src/seed/*` membaca 8 JSON, unggah aset dari `design/assets/**`, isi dua locale, idempoten; `verify-cms.ts` mencetak ringkasan. | Jalankan 2× tanpa duplikat; hitungan: 4 services, 4 entities, 7 milestones, 3 clients (draft), 13 cities. |
| 3 | Fondasi frontend: layout publik, i18n routes + dictionary + LanguageSync, `styles/` (tokens, components, globals, motion), Header/Footer/LanguageToggle/WhatsAppFloat, 404 dua bahasa. | Header/footer cocok preview; toggle EN⇄ID; 404 berstatus 404. |
| 4 | Landing page section 1–5: Hero, About+StatBar, Why, Group, Services+PlatformStrip (+accordion mobile). | Cocok `design/preview-landing.html` pada 1440/390. |
| 5 | Landing page section 6–11: Journey, Clients, Network (map build script), Office, Insights, Contact (UI form). | Cocok preview; map pin dari CMS. |
| 6 | Form backend: `api/inquiries`, validasi, honeypot, rate-limit, email; koleksi `inquiries` + status; pesan sukses/error. | Submit tersimpan + email terkirim (SMTP uji); submit tanpa consent ditolak. |
| 7 | Insights list/detail + Privacy + Reveal motion + draft preview. | Pagination, filter kategori, preview draft dari admin. |
| 8 | SEO: metadata, hreflang, sitemap, robots, JSON-LD, OG image default; favicon. | Validasi dengan Rich Results test lokal (schema valid). |
| 9 | QA: 360–1920px, keyboard/screen reader, reduced motion, Lighthouse mobile ≥ 90 (landing + 1 artikel), `04-acceptance.md` dicentang. | Laporan di STEP-9-STATUS. |
| 10 | README deploy (Postgres + SQLite), `.env.example` final, skrip backup, paket evaluasi klien (screenshot + daftar OPEN-QUESTIONS yang harus dijawab untuk produksi). | Siap dievaluasi owner. |

Perkiraan: langkah 1–3 hari 1–2, langkah 4–5 hari 3–5, langkah 6–8 hari 6–7, langkah 9–10 hari 8. Sisa waktu untuk 2 putaran revisi desain sesuai quotation.

## 5. Risiko & cara menangani

- **Konten compro bermasalah** (Vision/Mission Apegale, "Notification IMTA", layanan identik Apegale): dibangun apa adanya, ditandai `needsReview` di admin, masuk paket evaluasi klien. Tidak menunda dev.
- **Domain belum jelas**: `NEXT_PUBLIC_SITE_URL` placeholder; semua URL absolut dibangun dari env.
- **Hosting klien tanpa Postgres**: adapter SQLite disiapkan sebagai opsi di README dan diuji sekali di langkah 10.
- **Font Cocogoose tidak berlisensi**: hanya `--font-display` yang perlu diganti bila lisensi datang.
- **Aset dari PDF**: resolusi 200 dpi cukup untuk preview; hero akan diganti foto asli lewat CMS tanpa deploy.
- **Payload 3 + Next versi**: pin versi stable yang kompatibel saat langkah 1; catat di STEP-1-STATUS.

## 6. Definisi selesai

Seluruh daftar di `docs/04-acceptance.md` dicentang, `docs/STEP-10-STATUS.md` memuat ringkasan, dan owner sudah melihat preview lokal + screenshot untuk dibawa ke klien.
