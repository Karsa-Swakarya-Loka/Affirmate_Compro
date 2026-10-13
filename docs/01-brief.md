# 01 — Brief

## Proyek
Website company profile **baru** (landing page + CMS) untuk **PT Affirmate Tatakelola Nusantara**, unit Affirmate Group dengan sub-brand **Affirmate Administrative**. Dikerjakan KaryaLo (PT Karsa Swakarya Loka), PIC: Lucky Ramdani Reza. Pemberi kerja: Deny Y. Imran, Founder & CEO Affirmate Group.
Dokumen komersial: QTN-WEB-AFM-2026-004, INV-WEB-AFM-2026-002 (09 Okt 2026). Rp 2.000.000, DP 40% / pelunasan 60%, 2 minggu sejak DP + materi, revisi desain maks. 2 kali.

**Acuan konten dan visual: `Compro Affirmate Rev 3_Compress.pdf` (2026, 11 hal.)**. Pemetaan halaman ke section ada di `00-reset-analisis.md` §2. Situs grup affirmate.co.id di luar scope.

## Scope (sesuai quotation)
| Komponen | Isi |
|---|---|
| Konsep visual & UI | Arahan desain baru KaryaLo, diturunkan dari compro: hijau Administrative, bidang diagonal, kartu putih, Poppins. |
| Development responsive | Landing page desktop & mobile, CTA, form kontak. |
| CMS | Admin mengubah teks, gambar, layanan, milestone, klien, entitas grup, kota jaringan, kontak. |
| SEO dasar, QA, go-live | Metadata, sitemap, hreflang, kecepatan, deploy ke hosting klien. |
| Bonus | Koleksi artikel (Insights) dengan list + detail. |

**Di luar scope:** ERP, hosting & domain, portal klien/pelacakan perizinan, GARIS, bahasa Jepang, halaman per layanan, blog multi-penulis, pembayaran online, perubahan situs grup.

## Fakta yang dipakai (semua dari compro, kecuali disebut lain)
- Nama: PT Affirmate Tatakelola Nusantara · brand: Affirmate Administrative · "a dedicated unit of Affirmate Group" · ATN berdiri 2023 (hal. 6).
- Tagline: "More than a service, we deliver value and peace of mind" (hal. 3). Tagline grup: "Indonesia Business & Investment Platform" (cover), "A locally executed cross-border platform for Indonesia and the world" (hal. 2).
- Stat: 35+ Cities Covered · 7+ Years Experience (hal. 2).
- 4 pilar Why: Digital Monitoring, Fast Response, Compliance Driven, Nation Wide Service (hal. 3).
- 4 entitas grup + bullet layanan masing-masing (hal. 4).
- 4 layanan: Conversant Expatriate, Expatriate Formalities Services, Management Advisory, Broad Expatriate Hosting (hal. 5), plus 3 pilar Administrative Platform (hal. 4) dan 7 cakupan (hal. 3).
- Corporate Journey 2019–2026, 7 milestone (hal. 6).
- Head office: Ascott Sudirman Jakarta, 31st Floor Affirmate Office, Ciputra World 2, Jl. Prof. Dr. Satrio Kav. 11, Jakarta 12930 · 021 5092 8670 · 0819 0505 6482 · info@affirmate.co.id (hal. 7, 11).
- Klien: unicharm, MUFG Finance and Leasing, Toda Corporation (hal. 8).
- Jaringan: 13 kota + 4 pilar Network (hal. 9).

## Yang tidak dipakai
51 logo klien situs grup, testimoni situs grup, warna emas/maroon, teks "Your Gateway to Indonesian Market" (boleh sebagai meta grup saja), klaim apa pun yang tidak ada di compro.

## Keputusan owner (12 Okt 2026)
1. Sistem desain dibuat **baru dari compro**, bukan meminjam kerangka Apegale (hasil: `design/`).
2. Dikerjakan **langsung dari `PLAN.md`** oleh KaryaLo, tanpa CODEX-PROMPTS.
3. Urutan section mengikuti urutan halaman compro.
4. Section Office dipertahankan sebagai section sendiri.
5. Evaluasi klien lewat **preview lokal + screenshot**, tanpa staging VPS pada tahap ini.
6. Pertanyaan OPEN-QUESTIONS adalah bahan evaluasi klien untuk tahap produksi; dev berjalan dengan asumsi sementara yang tercantum di sana.

## Bahasa
**English default (`/`)**, Indonesia di `/id`. Compro berbahasa Inggris; versi ID adalah terjemahan KaryaLo bertanda `needsReview` sampai klien menyetujui. Jepang tidak termasuk.

## Sumber konten
- `content/seed/*.json` — seluruh teks compro (EN apa adanya dengan typo diperbaiki, ID terjemahan).
- `design/assets/` — logo entitas, 10 foto kantor asli klien, 3 logo klien (potongan compro), peta.

## Yang masih ditunggu dari klien
Lihat `OPEN-QUESTIONS.md`. Penahan desain: domain, hosting, lisensi font Cocogoose, file logo SVG, foto asli resolusi tinggi, konfirmasi Vision/Mission dan daftar layanan.
