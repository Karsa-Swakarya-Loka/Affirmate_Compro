# STEP 8–10 — SEO final, QA, deploy & paket evaluasi (12 Okt 2026)

## Step 8 — SEO
- `generateMetadata` per halaman dari CMS; canonical + `hreflang` en/id/x-default (dirender sebagai `<link rel="alternate" hrefLang>`); OG/Twitter dengan `og` size media atau `public/brand/og-default.jpg`.
- `sitemap.xml` dinamis (home, insights, privacy, artikel published) dan `robots.txt` (blokir `/admin`, `/api/`, `/preview`).
- JSON-LD: `Organization` (+`parentOrganization`), `ItemList` layanan, `Article` + `BreadcrumbList` di artikel.
- Favicon `.ico`/`icon.png`/`apple-icon.png` lewat konvensi `src/app`.

## Step 9 — QA (build produksi, Lighthouse mobile, throttling simulasi)
Putaran 1 (`_review/lighthouse/*.report.html`):

| Halaman | Performance | Accessibility | Best practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| `/` | 80 | 92 | 100 | 100 | 3,8 s | 0 |
| `/id` | 89 | 92 | 100 | 100 | 3,5 s | 0 |
| `/insights` | 96 | 91 | 100 | 100 | 2,7 s | 0 |
| `/privacy` | 96 | 91 | 100 | 100 | 2,7 s | 0 |

Perbaikan setelah putaran 1:
- Kontras: hijau aksen `#4c8844` → `#3f7a3a` (krem di atasnya 4,7:1), gradien ikut disesuaikan.
- Heading order: judul kolom footer `h4` → `h2` bergaya kecil.
- Link di dalam teks (footer bar, kontak, prose) diberi garis bawah.
- Logo header diberi `sizes="160px"` (sebelumnya diminta varian 1920px).
- Peta: path daratan 96 KB dipindah dari HTML inline ke `public/brand/indonesia-land.svg` (di-cache browser), pin tetap dari CMS.
- Hero image diberi `fetchPriority="high"`, preload logo header dihapus agar tidak bersaing dengan LCP.

Hasil akhir (putaran 3, `_review/lighthouse/home.report.html`; `/id` putaran 2):

| Halaman | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| `/` | 91 | 100 | 100 | 100 | 3,3 s | 120 ms | 0 |
| `/id` | 91 | 100 | 100 | 100 | 3,3 s | 130 ms | 0 |

Target `docs/04-acceptance.md` (mobile ≥ 90 di empat kategori) terpenuhi. LCP 3,3 s adalah angka throttling simulasi Lighthouse (4G lambat); di jaringan nyata jauh lebih cepat. Perbaikan lanjutan bila diperlukan: foto hero diganti versi yang sudah dikompres klien, atau font Poppins dikurangi ke 4 bobot.

Cek struktur (skrip `_review/a11y-check.mjs`): tiap halaman punya satu `h1`, `lang` benar, semua `img` ber-`alt`, landmark header/main/footer/nav, skip link, canonical dan OG terisi.
Uji keyboard/manual: nav anchor, toggle bahasa, menu mobile (Escape menutup, fokus kembali ke tombol), form (label, error inline, fokus), tombol WhatsApp hanya muncul bila nomor diisi.
Catatan: `bf-cache` gagal karena `Cache-Control: no-store` pada halaman dinamis Next (bawaan App Router untuk halaman yang membaca cookie draft mode); tidak memengaruhi pengguna.

## Step 10 — Deploy & serah terima
- `README.md` berisi langkah produksi (Postgres/SQLite, env, migrate, build, PM2, Nginx, backup).
- Migrasi Postgres awal dibuat offline: `src/migrations/postgres/20261012_141706`.
- Paket evaluasi klien: `../_review/PAKET-EVALUASI-KLIEN.md` + screenshot `../_review/screenshots/`.
- Belum: domain final, hosting klien, SMTP produksi (menunggu OPEN-QUESTIONS #1, #4, #10).

## Revisi UI (12 Okt 2026, malam, permintaan owner)
- Peta Network: label kota hitam (`--ink`) dengan halo krem 3px, pin hitam, agar mudah dibaca.
- Kartu Affirmate Group: keempat kartu putih; hover/fokus mengisi kartu dengan gradien hijau (warna kartu 1 sebelumnya) lewat lapisan `::before` yang memudar 500 ms, teks ikut berubah krem; kartu ATN tetap ditandai border hijau + badge.
- Ruang kosong dipadatkan di semua section: padding section 48/64 (dari 64/80), jarak judul section 32, hero tanpa min-height dan foto 4:3, jarak platform/detail layanan/footer dikurangi. Screenshot `../_review/screenshots/` diperbarui.
- Revisi lanjutan Group (owner): empat kartu dibuat identik (grid 4 kolom, tinggi sama, tanpa varian `--self` dan tanpa badge "This website"); hover/fokus = zoom 5% + isi gradien hijau, halus 500 ms. Diverifikasi di Chrome.
- Navbar: scroll-spy (IntersectionObserver, pita 30–40% viewport) menandai link section yang sedang terlihat saat scroll; klik link langsung memindahkan garis bawah. Diverifikasi di Chrome.
