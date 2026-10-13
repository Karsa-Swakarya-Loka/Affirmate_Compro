# STEP 6–7 — Form kontak end-to-end, preview draft, artikel contoh (selesai 12 Okt 2026)

## Step 6 — Form kontak
Diuji di Chrome sungguhan (bukan curl) pada `http://127.0.0.1:3100`:
- Kirim data tidak valid (email salah, pesan kosong, consent kosong) → error inline di bawah tiap field, tombol tetap aktif. Pesan "Please check this value" ditambahkan untuk nilai tidak valid (kunci `ui.form.invalid`, migrasi `sqlite/20261012_140701`).
- Kirim data valid (EN) → panel sukses; baris tersimpan di `inquiries` (id 1) dengan relasi layanan, `emailStatus=failed` karena SMTP kosong (sesuai desain: data tidak hilang).
- Dengan SMTP diarahkan ke sink lokal (port 2525) dan form ID → email terkirim ke `info@affirmate.co.id` dengan `Reply-To` pengirim, subjek `[Website] New inquiry from …`, link ke admin; `emailStatus=sent` (id 2).
- Honeypot, rate limit (10/jam/IP), dan duplikat 10 menit diuji unit lewat `src/lib/inquiry.ts`.
- Catatan: `.env` dev sekarang menunjuk SMTP sink lokal; di produksi isi `SMTP_*` sungguhan.

## Step 7 — Preview draft & Insights
- Tombol **Preview** aktif di admin untuk global `home`, `legal`, dan koleksi `posts` (`src/lib/admin-preview.ts` → `/preview?path=…` sesuai locale editor).
- Diuji di browser: login admin → buka artikel draft → Preview membuka tab baru dengan bar "Draft preview is on" dan artikel tampil; tanpa login `/preview` menjawab 401; artikel draft tetap 404 untuk publik; "Exit preview" mematikan mode draf.
- `/preview` menyalin header dari `Request` dan mengisi `Origin` dari `Referer` same-site bila kosong, supaya cookie admin diterima Payload saat link Preview dibuka dari admin.
- Artikel contoh `content/seed/posts.json` (panduan PT PMA, EN+ID, status **draft**, `needsReview`) ikut seed; muncul di Insights hanya setelah dipublikasikan klien.

## Step 8 (sebagian, ikut di sini)
- Favicon `.ico` + `icon.png` + `apple-icon.png` lewat konvensi `src/app/`, `public/brand/og-default.jpg` 1200×630 dari foto lobby (skrip `scripts/build-og-image.mjs`), metadata OG/Twitter memakai gambar itu bila halaman/CMS tidak punya.

## Verifikasi
- `tsc`, `eslint` bersih. Migrasi Postgres awal `src/migrations/postgres/20261012_141706` dibuat offline dari skema (dijalankan di server saat deploy).
