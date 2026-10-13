# STEP 0 — Sistem desain & preview (selesai 12 Okt 2026)

Dibuat baru dari Compro Rev 3 sesuai keputusan owner.

- `design/tokens.json` → `design/tokens.css` (`node scripts/build-tokens.mjs`): palet hijau compro (`green-deep #006636`, `green #0c9042`, gradien, netral), Poppins, skala tipe, spasi, radius, motion, tema light/dark.
- `design/components.css`: kelas `af-*` untuk semua section (Header, Hero, About+StatBar, Why/PillarCard, GroupEntity, PlatformStrip, ServiceCard, Timeline, ClientStrip, NetworkMap, Office, NewsCard, ContactForm, Footer, WhatsAppFloat, Reveal).
- `design/preview-landing.src.html` + `node scripts/build-preview.mjs` → `design/preview-landing.html`: seluruh landing page EN dari seed compro. `design/preview-foundations.html`: warna, tipe, tombol, form.
- `scripts/build-map-svg.py`: peta Indonesia dari geoBoundaries (ODbL) + 13 pin kota.
- `design/assets/`: logo entitas, foto compro (200 dpi), logo klien, peta, `cube-mark.svg` (aproksimasi watermark).
- Screenshot verifikasi: `design/screenshots/landing-1440.png`, `design/screenshots/landing-390.png` (390 diambil lewat iframe karena Chrome headless punya lebar jendela minimum ±489px).

Diperiksa: judul section hijau tua uppercase, grid aman overflow (`minmax(0,1fr)`), hero mobile bidang hijau di bawah CTA, foto lobby tanpa teks compro, peta label tidak tumpang tindih.

Catatan untuk dev: nilai warna/spasi hanya dari `tokens.css`; `cube-mark.svg` dan foto PDF diganti aset asli klien lewat CMS tanpa ubah kode.

## Revisi 12 Okt 2026 sore: foto asli + audit taste-skill

- 11 foto kantor asli dari klien dikurasi ke `design/assets/Photography/*.jpg` (raw 32 foto WhatsApp dihapus saat bersih-bersih 12 Okt; sumber ada di klien); semua potongan PDF dihapus dari design assets.
- Audit anti-slop diterapkan (rincian di `design/README.md` bagian "Aturan anti-slop"): eyebrow 10 → 3, hero 7 elemen → 4 (judul 6 kata, lead 17 kata), Why kartu → daftar ikon, Group 2×2 → bento 1+3 dengan ATN hijau tua, daftar izin bullet → tag chip, pilar Network inline, galeri Office bento 1+4, ikon Phosphor menggantikan path SVG manual, nol em-dash, satu label CTA "Contact Us", shape lock pill/lg/md.
- Diverifikasi ulang di 1440, 1024, 390: `design/screenshots/landing-1440.png`, `landing-390.png`.
- Konsekuensi ke seed: `home.json` hero (headline, lead, image) diperbarui; `02-sitemap` bagian "Revisi layout"; PLAN memakai `@phosphor-icons/react`.

## Revisi hero (12 Okt 2026, permintaan owner: foto lebih besar dan profesional, bukan kotak)
- Hero diubah menjadi foto lobby full-bleed di sisi kanan (56–58% lebar, tinggi ±82dvh) dengan tiga lapis potongan diagonal ala cover compro: wedge gradien hijau, celah putih tipis, foto. Tanpa bingkai/radius.
- Tablet 1024–1439: visual 54%, kolom teks 44% agar lead tidak menabrak wedge. Mobile: teks dulu, foto full-width 300–460px dengan tepi atas diagonal.
- Markup: `.af-hero__visual` (band + img + shade) di luar container, `.af-hero__media` hanya untuk mobile. Screenshot: `design/screenshots/hero-1440.png`.

## Revisi v2 (12 Okt 2026 malam): bahasa visual dari template brosur klien
- Acuan: `template_design.jpeg` (template brosur hijau-krem). Struktur, urutan section, dan konten **tidak berubah**; hanya kulit visual, agar berbeda dari Apegale.
- Token v2: krem `#f4f2ec`, hijau lumut `#4c8844` → `#2f6b3a`, teks `#1d2a21`, `on-brand` krem; radius sistem leaf (`--radius-leaf` 6px).
- Komponen baru: `af-mark`, `af-tab`, `af-hatch`, `af-photo` (desaturasi + tint), `af-panel`, `af-vm__row`, `af-split__photo--frame`, `af-petals`/`af-petal`/`af-petals__core` (diagram 4 layanan), `af-svcrow`, `af-toc` (journey), peta krem di panel hijau, galeri leaf, footer leaf.
- Hero = cover template: foto leaf besar (radius 160px kiri-atas, siku kiri-bawah) + tile "Company Profile" + tile panah, arsir di bawah CTA.
- Pemetaan lengkap elemen template → kelas ada di `design/README.md`. Screenshot: `design/screenshots/landing-1440.png`, `landing-390.png`, `hero-1440.png`.
