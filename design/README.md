# Affirmate Administrative — Brand book & design system (v2, template brosur hijau-krem)

File: `tokens.json` (sumber nilai) → `tokens.css` (generate: `node scripts/build-tokens.mjs`, jangan diedit manual) · `components.css` (kelas `af-*`) · `preview-landing.src.html` + `node scripts/build-preview.mjs` → `preview-landing.html` (acuan visual utama) · `preview-foundations.html` · `assets/` · galeri `index.html`.

**Acuan visual v2 (12 Okt 2026 malam): `../../template_design.jpeg`**, template brosur hijau-krem pilihan klien. Struktur dan konten tetap seperti v1 (urutan compro, 11 section); yang berubah hanya bahasa visual, agar berbeda dari website Apegale (maroon, diagonal).

## v2.1 "flat & ruled" (23 Okt 2026)

Bahasa visual template v2 dipertahankan (leaf corners, mark, hatch, petal diagram, tab hijau, foto bertint, Poppins). Yang diubah hanya ini:

- **Tanpa gradien**: `--gradient-brand` = `var(--green-deep)`, `--gradient-overlay: none`. Section hijau, petal (dua nada hijau berselang-seling), platform strip, footer: satu warna.
- **Tanpa kartu berlebih**: panel krem About, kartu Group, kartu detail layanan, kartu klien, kartu berita, kotak form Kontak, panel peta dihapus. Konten berdiri di atas garis (`--rule`, otomatis krem transparan di section hijau).
- **Tanpa pill**: tag/chip jadi daftar inline bergaris pemisah (`.af-specs`); ikon lingkaran jadi kotak leaf (`.af-ico`); filter Insights jadi tab bergaris bawah.
- **Kepala section** (`.af-sechead`): satu garis selebar kontainer; kiri mark + judul, kanan sub-judul + lead (grid 5/7 di >=1024px; `stack` untuk kolom sempit).
- **Layanan tanpa diagram kelopak** (23 Okt malam): daftar bergaris `.af-ledger` (indeks besar Poppins 300, judul, ringkasan, tautan ke katalog) di samping foto setinggi daftar; katalog sub-layanan per kategori (`.af-cats`, `.af-catlist`); Platform Administrasi jadi bidang hijau penuh selebar layar yang menutup section (`.af-platform`, bukan kotak).
- **Kolom kiri-kanan sama tinggi**: foto mengisi kolom (`.af-photo--fill`, Hero/About/Journey; frame Why; foto Layanan), daftar fakta (`.af-facts`) dibagi rata setinggi kolom sebelahnya (Office, Contact), hatch di kaki kolom (`.af-side`). Hero: foto lari sampai tepi kanan viewport.

## Bahasa visual template (apa yang diterjemahkan ke web)

| Elemen template | Terjemahan web (kelas) |
|---|---|
| Hijau lumut `#4c8844` dengan gradien ke `#2f6b3a`, kertas krem `#f4f2ec`, teks hijau-hitam `#1d2a21` | Token `green`, `green-deep`, `gradient-brand`, `surface`, `ink`. Logo tetap hijau brand `#006838`. |
| Bentuk **leaf**: tiga sudut membulat + satu sudut siku | `--radius-leaf` (6px) pada satu sudut: tombol `md/leaf`, chip `sm/2px`, kartu & panel `lg/leaf`, foto `xl/leaf`. Posisi sudut siku bergantian (`af-leaf--tr`, `--tl`, `--br`). |
| Tanda leaf kecil hijau sebelum judul halaman | `.af-mark` + judul uppercase bold `.af-h1` dalam satu baris (`.af-sechead__row`). Menggantikan eyebrow; eyebrow teks hanya di hero. |
| Tab judul hijau berteks krem ("OUR VISION", "COMPANY PROFILE") | `.af-tab`; di hero menjadi tile "Company Profile" + tile panah di bawah foto cover. |
| Garis arsir diagonal di kaki halaman | `.af-hatch` (repeating-linear-gradient), dipakai di hero, services, network, contact. |
| Foto gelap/desaturasi dengan nuansa hijau | `.af-photo` (saturate .6 + overlay `photo-tint` multiply). |
| Halaman hijau penuh dengan panel krem (About) | `.af-section--green` + `.af-panel`; visi = pernyataan besar `.af-vision` di bawah cerita, misi = baris penuh `.af-mission` (label kiri, poin bernomor kanan, hairline per poin). |
| Foto berbingkai hijau + tab judul di bawahnya (Our Vision) | `.af-split__photo--frame` di section Why. |
| Diagram 4 kelopak bernomor 01–04 dengan lingkaran tengah (Our Service) | `.af-petals` + `.af-petal` (radius berbeda tiap kuadran) + `.af-petals__core`. Empat layanan compro persis empat kelopak. |
| Daftar bernomor blok hijau (Table of Content) | `.af-toc` untuk Corporate Journey: tahun di blok hijau leaf. |
| Peta putih di panel hijau | Section Network `.af-section--green`, daratan krem (`public/brand/indonesia-land.svg`), pin hitam, **label kota hitam** dengan halo krem (`paint-order: stroke`) agar terbaca di atas laut hijau. |
| Foto tim berbentuk leaf | Galeri Office `.af-gallery .af-photo` dengan sudut siku bergantian. |
| Bentuk leaf besar di sampul belakang | Footer `.af-footer::after`. |

Tipografi tetap **Poppins** (compro): judul uppercase ExtraBold, isi Light/Regular. Ikon **Phosphor** regular.

## Konten

**Bahasa.** English (default) dan Indonesia, lewat `LanguageToggle`. Semua teks dua versi di CMS; jangan mencampur bahasa dalam satu kalimat.

**Sumber teks.** Hanya compro Rev 3 (lihat `../docs/00-reset-analisis.md` §2). Typo compro diperbaiki. Tidak menambah angka, klien, testimoni, atau klaim di luar compro.

**Penyebutan.** "Affirmate Administrative" untuk brand; "PT Affirmate Tatakelola Nusantara" pada penyebutan legal pertama dan footer; "Affirmate Group" untuk grup. Kalimat kunci: *A dedicated unit of Affirmate Group* dan *More than a service, we deliver value and peace of mind*.

**Heading** judul section memakai **UPPERCASE dua baris** seperti compro ("WHO WE ARE", "OUR SERVICES") dengan `af-h1` warna `brand-text`; eyebrow kapital dengan garis pendek hijau; sub-judul `af-subtitle` hijau tua dengan satu frasa hijau segar (`<em>`), meniru "Nationwide Coverage, *Global Connections*". Kalimat isi sentence case.

**Istilah izin** sesuai compro: KITAS, KITAP, RPTKA, MERP, SKTT, STM. Tanpa emoji.

## Warna

- Halaman di `surface` (krem), section selang-seling `surface-soft`, panel/kartu `surface-raised` + `line`.
- `green` = hijau lumut template: tombol utama, tab, tanda leaf, ikon lingkaran, kelopak, blok tahun. Teks di atasnya `on-brand` (krem, bukan putih murni).
- `green-deep` / `gradient-brand` = panel section hijau (About, Network), footer, kartu entitas ATN.
- `brand-tint` untuk tag dan ikon lembut. `photo-tint` hanya overlay foto.
- Tidak ada maroon, emas, atau hijau neon `#0c9042` lama; logo tetap `#006838`.
- Kontras: krem `#f7f5ee` di atas `green #4c8844` = 4.6:1 (AA teks normal), di atas `green-deep` 7.9:1.

## Tipografi

- **Poppins** untuk semua teks (compro). Judul besar ExtraBold 800 menggantikan Cocogoose Pro Trial; bila klien memberi lisensi, hanya `--font-display` yang diganti.
- Skala: `display-xl` hero; `heading-1` judul section (uppercase); `heading-2` judul sekunder; `heading-3` kartu; `subtitle`; `eyebrow`; `body-lg` (Light 300) untuk lead/intro; `body`; `small`; `caption`; `stat` untuk 35+/7+ dan tahun timeline.
- Mobile (<768px) otomatis turun lewat `tokens.css`. Panjang baris teks isi maks. 70 karakter. Heading `text-wrap: balance`.

## Bentuk & tata letak

- **Motif utama: bidang diagonal hijau** (cover, hal. 6, 9) lewat `clip-path`, sudut ±26°. Hero: bidang gradien dari kiri bawah ke kanan; section gelap: bidang `green-deep` di satu sudut. Maksimal satu bidang besar per layar.
- **Motif kedua: watermark kubus** (`assets/Logos/cube-mark.svg`, opacity 5% di terang / 12% di hijau). Ini aproksimasi; ganti dengan SVG master klien.
- **Kartu**: putih, radius `lg`/`xl`, garis hijau 4px di tepi atas (`af-card`), bayangan lembut, naik 4px saat hover. Kartu entitas grup memakai border hijau 2px tanpa garis atas (hal. 4).
- **Ikon**: garis 2px putih dalam lingkaran `green` 64px (hal. 3, 5, 9). Lucide di implementasi.
- **Foto**: dipotong miring/diagonal atau sudut besar (`radius-xl`), seperti hal. 2, 6, 7. Overlay `gradient-overlay` bila ada teks di atasnya.
- Container 1200px, gutter 16/32, section padding 48/64 (dipadatkan 12 Okt malam: tanpa ruang kosong besar antar section, hero mengikuti tinggi konten, foto hero rasio 4:3). Grid 4 → 2 → 1 (pilar), 3 → 1 (kartu), 2 → 1 (entitas, layanan).
- Fokus keyboard outline 2px `focus`. Area sentuh ≥44px.
- Gerak: hover 220ms, reveal 500ms sekali saat masuk viewport (`af-reveal`), tanpa slider otomatis/parallax, hormati `prefers-reduced-motion`.

## Aset

- `assets/Logos/`: logo Administrative (hitam, putih), 3 entitas lain, grup putih, `cube-mark.svg`.
- `assets/Photography/`: potongan compro 200 dpi (hero gedung, globe-city, skyline, 5 foto kantor). Placeholder sampai klien kirim foto asli.
- `assets/Clients/`: unicharm, MUFG Finance and Leasing, Toda (potongan compro, draft sampai izin).
- `assets/Map/`: `IDN-geoboundaries-simplified.geo.json` (geoBoundaries ADM0 IDN, lisensi ODbL, sumber OpenStreetMap; cantumkan atribusi "Map data © OpenStreetMap contributors, geoBoundaries" di footer atau halaman privacy) → `indonesia-map.fragment.html` (SVG land, pulau kecil disaring, 13 pin dari `content/seed/cities.json`). `IDN.geo.json` (johan/world.geo.json, public domain) disimpan sebagai cadangan kasar.

## Aturan anti-slop (hasil audit taste-skill, 12 Okt 2026)

Design read: redesign-preserve sebuah company profile B2B untuk manajer perusahaan asing, bahasa visual korporat yang tenang dan trust-first. Dial: variance 5, motion 3, density 4.

- **Eyebrow maksimal 3 di seluruh landing** (Hero, About, Services). Section lain cukup judul uppercase + garis + sub-judul.
- **Hero menjawab 4 pertanyaan di atas fold** (13 Okt 2026, menggantikan aturan 4 elemen): *siapa* = eyebrow kalimat audiens (bukan nama brand), *apa* = headline + 3 pilar Administrative Platform sebagai checklist, *kenapa* = lead + panel statistik 35+/7+ di atas foto (menggantikan tile "Company Profile"), *langkah berikut* = satu tombol "Contact Us" + kalimat Contact dari CMS di bawahnya. Semua teks dari CMS/compro; tetap tanpa strip "trusted by".
- **Satu label per intent**: tombol kontak selalu "Contact Us" (header, hero, section). Tidak ada "Get in touch"/"Let's talk".
- **Tanpa em-dash dan en-dash** di semua teks. Titik tengah maksimal satu per baris.
- **Keluarga layout tidak diulang**: hero split, about split+stat bar, why foto+icon-list, group bento 1+3, services strip+kartu tag, journey timeline+foto, clients band, network peta+pilar inline, office info+galeri bento 1+4, leadership judul sticky+3 potret leaf tanpa kartu, contact info+form. Tidak ada tiga kartu identik berjajar.
- **Daftar panjang jadi tag/chip**, bukan bullet 11 baris (daftar izin di Services).
- **Ikon dari satu keluarga: Phosphor** (`@phosphor-icons/web` di preview, `@phosphor-icons/react` di app). Tidak menggambar path SVG sendiri. Watermark kubus adalah satu-satunya SVG dekoratif dan akan diganti SVG master klien.
- **Foto asli klien** (`assets/Photography/*.jpg`, 11 foto kantor dari klien, 12 Okt 2026) menggantikan semua potongan PDF.
- **Shape lock**: tombol/chip/tag pill; kartu & media radius lg/xl; input radius md.
- Nav satu baris ≥1200px, tinggi 72px; di bawah itu burger.
- Motion: hover lift 4px, reveal sekali per section; semuanya mati di `prefers-reduced-motion`.

## Section landing page (urutan compro)

1. **Hero** — terjemahan cover compro: foto lobby asli **full-bleed** di 56–58% sisi kanan setinggi ±82dvh, dipotong tiga lapis diagonal (wedge gradien hijau, celah putih tipis, foto) lewat `clip-path`; tanpa bingkai kotak. Teks di kiri: eyebrow, judul 3–4 baris, lead ≤20 kata, 2 CTA. Mobile: teks dulu, lalu foto full-width 300–460px dengan tepi atas diagonal dan wedge hijau di bawahnya.
2. **About** — eyebrow ABOUT US, "WHO WE ARE", sub-judul, paragraf grup, Vision & Mission dua kolom, foto globe-city dipotong V (hal. 2), bar statistik hijau tua 35+ / 7+.
2b. **Leadership** (revisi klien 23 Okt 2026) — kolom judul sticky ("OUR LEADERSHIP" + sub-judul + hatch) dan tiga potret `af-leader` rasio 4:5 berbentuk leaf dengan sudut siku bergantian, nomor hijau + nama + jabatan di bawahnya; potret kedua turun satu langkah agar tidak jadi tiga kartu identik. Potret memakai desaturasi ringan tanpa overlay hijau supaya warna kulit wajar.
3. **Why** — foto signage lobby di kiri, judul "WHY AFFIRMATE" + tagline di kanan, paragraf definisi ATN, 4 `af-pillar`.
4. **Group** — "AFFIRMATE GROUP", paragraf ekosistem, 4 `af-entity` **identik** (4 kolom sama lebar, tinggi sama, semua putih, tanpa badge). Hover/fokus: kartu membesar `scale(1.05)` dan terisi `gradient-brand` lewat `::before` yang memudar masuk (500 ms), teks berubah krem; mati pada `prefers-reduced-motion`.
5. **Services** — "OUR SERVICES", eyebrow END-TO-END BUSINESS SOLUTIONS, `af-platform` (3 pilar + 7 chip), 4 `af-service`.
6. **Journey** — "CORPORATE JOURNEY", sub-judul, paragraf, `af-timeline` 7 titik, foto skyline sticky.
7. **Clients** — "OUR CLIENT", "Trusted by Leading Companies", grid logo.
8. **Network** — "OUR NETWORK", sub-judul, `af-map` SVG + daftar kota, 4 `af-netpillar`.
9. **Office** — "OFFICE LOCATION", "Head Office", alamat + 2 telepon, galeri 4 foto.
10. **Insights** — 3 `af-news` (tersembunyi bila kosong).
11. **Contact** — info kontak + `af-form`.
12. **Footer** — hijau tua ala back cover: logo putih, paragraf grup, kontak, link, "A dedicated unit of Affirmate Group", copyright PT Affirmate Tatakelola Nusantara.
