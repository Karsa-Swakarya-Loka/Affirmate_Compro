# 04 — Definition of done

## Kesesuaian dengan compro Rev 3
- [ ] Semua section compro hal. 1–9 dan 11 ada di landing page dengan urutan yang sama: Hero, About (+Vision/Mission, stat), Why (4 pilar), Group (4 entitas), Services (4 layanan + platform 3 pilar), Corporate Journey (7 milestone), Clients (3), Network (13 kota + 4 pilar), Office, Contact.
- [ ] Teks EN sama dengan compro kecuali perbaikan typo yang dicatat di `02` dan jawaban OPEN-QUESTIONS; teks ID adalah terjemahan yang sudah direview klien atau masih draft.
- [ ] Logo, nama, dan warna = Affirmate Administrative (hijau); tidak ada emas ABN atau maroon Apegale.
- [ ] Tidak ada konten di luar compro (testimoni, logo klien tambahan, angka lain) kecuali klien memberi lewat CMS.
- [ ] Section Clients, Insights, Office tersembunyi bila kosong; item menu ikut hilang.

## Visual
- [ ] Setiap section cocok dengan preview `design/components/*` pada 1440px dan 390px.
- [ ] Palet hanya dari `tokens.css`: `green-deep #006636`, `green #0c9042`, gradien hero, overlay, netral. Tidak ada warna hard-coded di komponen.
- [ ] Font Poppins via `next/font`; judul besar memakai Poppins ExtraBold/Bold kecuali lisensi Cocogoose Pro diberikan klien.
- [ ] Bidang diagonal, watermark kubus, ikon lingkaran hijau, kartu putih bergaris hijau atas sesuai arahan `design/README.md`.
- [ ] Tidak ada scroll horizontal 360–1920px. Peta SVG tetap terbaca di 390px (label kota boleh jadi tooltip/daftar).

## Bahasa
- [ ] Semua teks UI dan konten EN + ID dari CMS; toggle berpindah ke halaman setara tanpa reload penuh, mengubah `<html lang>`, mengingat pilihan.

## CMS
- [ ] Admin bisa ubah: hero, about, why, group, services (+item), journey, clients, network (kota + pilar), office gallery, contact, SEO default, penerima email, visibilitas section, artikel.
- [ ] Draft/publish + preview berfungsi; `seed` idempoten; entri `needsReview` tersimpan sebagai draft.
- [ ] Form Contact tersimpan di `inquiries`, kirim email, tolak tanpa consent, honeypot + rate-limit.

## SEO & performa
- [ ] Metadata per halaman dari CMS dua bahasa; `hreflang` en/id + `x-default`; canonical; `sitemap.xml`; `robots.txt`.
- [ ] Schema.org `Organization` (ATN, `parentOrganization` Affirmate Group, alamat, telepon), `Service` ×4, `Article`, `BreadcrumbList`.
- [ ] Lighthouse mobile ≥ 90 (Performance, Accessibility, Best Practices, SEO) di landing dan satu artikel.
- [ ] Gambar via `next/image` (webp/avif); foto compro diganti file asli resolusi tinggi bila klien kirim.

## Aksesibilitas
- [ ] WCAG 2.2 AA: kontras `#006636` dan `#0c9042` terhadap putih (teks di atas `#0c9042` minimal 18px bold atau dipertebal), fokus terlihat, keyboard untuk nav/toggle/accordion/form, `prefers-reduced-motion`.

## Deploy
- [ ] `.env.example` lengkap; README deploy ke hosting klien (Node.js + PostgreSQL, opsi SQLite), folder media persisten, backup.
- [ ] Domain final (OPEN-QUESTIONS #1) terpasang + HTTPS sebelum serah terima.
