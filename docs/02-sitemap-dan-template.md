# 02 — Sitemap, section, dan template

## Routes
English tanpa prefix (default), Indonesia di `/id`. Slug artikel sama di dua bahasa. Tidak ada redirect lama.

| Template | EN | ID | Sumber data |
|---|---|---|---|
| Landing page | `/` | `/id` | global `site`, `home`; koleksi `services`, `groupEntities`, `milestones`, `clients`, `cities`, `posts` (3 terbaru) |
| Insights (list) | `/insights` | `/id/wawasan` | `posts` |
| Detail artikel | `/insights/[slug]` | `/id/wawasan/[slug]` | `posts` |
| Privacy | `/privacy` | `/id/privasi` | global `legal` |
| 404 | — | — | dwibahasa |

Layout global: **Header** (logo Affirmate Administrative, nav anchor, toggle EN/ID, tombol "Contact Us") · konten · **Footer** hijau tua ala back cover compro (logo putih, paragraf grup, alamat, telepon, email, LinkedIn, "A dedicated unit of Affirmate Group" + link affirmate.co.id, copyright) · **WhatsAppFloat** (aktif bila `site.whatsapp` terisi).

## Menu (anchor)
About · Leadership · Why Us · Group · Services · Journey · Network · Office · Insights · Contact (Clients hanya di footer, bandnya di bawah hero). Item Leadership/Clients/Insights hilang bila isinya kosong.

## Susunan section landing page (mengikuti urutan compro)
| # | Section | Isi (sumber hal. compro) | Komponen | Tampil bila |
|---|---|---|---|---|
| 1 | Hero | Eyebrow "AFFIRMATE ADMINISTRATIVE · A dedicated unit of Affirmate Group"; headline "Corporate & administrative support for your business in Indonesia" (dari paragraf hal. 3); highlight tagline "More than a service, we deliver value and peace of mind"; lead = paragraf grup cover; CTA "Contact Us" (→ #contact) dan "Our Services" (→ #services). Visual: foto gedung CBD + bidang diagonal gradien hijau (cover). | `Hero` | selalu |
| 2 | About | Eyebrow "ABOUT US", judul "Who We Are", sub "A locally executed cross-border platform for Indonesia and the world", paragraf Affirmate Group, kolom Vision & Mission (4 poin), bar stat 35+ / 7+ (hal. 2). Latar peta Indonesia samar. | `About` + `StatBar` | selalu; Vision/Mission bisa disembunyikan dari CMS |
| 2b | Leadership (revisi klien 23 Okt 2026) | "Our Leadership", subjudul, tiga potret leaf (Yukifri Nazir Group CEO, Deny Y. Imran CEO ATN, Mulyadi Finance Director) dengan nomor, nama, jabatan; kolom judul sticky di desktop, tanpa kartu. | `Leadership` | ≥1 orang berfoto |
| 3 | Why Affirmate | Judul "Why Affirmate", tagline, paragraf definisi ATN, 4 kartu pilar dengan ikon lingkaran hijau (hal. 3). Foto signage lobby di kiri atas. | `Why` | selalu |
| 4 | Affirmate Group | Paragraf ekosistem + 4 kartu entitas (logo, nama PT, kategori, deskripsi, 3 bullet) (hal. 4). Kartu ATN diberi tanda "You are here". | `GroupGrid` | selalu |
| 5 | Our Services | Eyebrow "END-TO-END BUSINESS SOLUTIONS", paragraf intro, 5 layanan: diagram 4 kelopak (Conversant Expatriate, Expatriate Formalities, Expatriate Advisory, Broad Expatriate Hosting) + kelopak lebar Corporate Secretary (revisi klien 23 Okt 2026), lalu baris rincian: tag, dan untuk Conversant Expatriate kelompok KITAS / Visa Indonesia (single entry C, multiple entry D, E23/E28/E31/E32) / Visa Global. Di bawahnya strip "Administrative Platform" 3 pilar dari hal. 4 (Incorporation & Licensing · Visa / Work Permit · HR / Corp Secretary; payroll dihapus 23 Okt 2026) dengan 7 cakupan hal. 3 sebagai chip. Kartu bisa dibuka (accordion) untuk daftar item panjang di mobile. | `ServiceCard`, `PlatformStrip` | selalu |
| 6 | Corporate Journey | Judul, sub "Expanding Beyond Advisory into Principal Investment", paragraf, timeline vertikal 7 titik (tahun, label, teks) (hal. 6). Foto skyline di kanan (desktop). | `Timeline` | ≥1 published |
| 7 | Our Client (dipindah 27 Okt 2026) | Band logo tepat di bawah hero seperti situs Apegale: label "Our Client" kiri, logo kanan berjalan terus (marquee tanpa tombol jeda; statis bila OS reduce motion). Logo hal. 8 (unicharm, MUFG Finance and Leasing, Toda Corporation) + MSIG Life dan MSIG Insurance. Subjudul/paragraf hal. 8 tidak ditampilkan. | `Clients` | ≥1 published |
| 8 | Our Network | "Nationwide Coverage, Global Connections", paragraf, peta Indonesia SVG dengan 13 titik kota (label), 4 pilar (hal. 9). | `NetworkMap` + `Pillars` | selalu |
| 9 | Office | "Head Office" alamat + telepon + galeri 4 foto kantor (hal. 7). Bisa digabung ke Contact pada mobile. | `OfficeGallery` | ≥1 foto |
| 10 | Insights | 3 artikel terbaru. | `NewsCard` | ≥1 published |
| 11 | Contact | Info kontak (alamat, telepon, WhatsApp, email, jam kerja), link Google Maps, `ContactForm` (name, company, email, phone/WhatsApp, country, services[], message, consent). | `ContactForm` | selalu |

### Revisi layout setelah audit taste-skill (12 Okt 2026, lihat `design/README.md` bagian anti-slop)
- Hero: split asimetris, foto lobby asli di kanan, bidang gradien diagonal di belakang foto; teks hanya eyebrow, judul 2–3 baris, lead ≤20 kata, 2 CTA. Paragraf grup pindah ke About.
- Why: foto kiri (ruang meeting kaca), teks + 4 pilar sebagai **daftar ikon 2×2**, bukan kartu.
- Group: **bento 1+3**, kartu ATN hijau tua diperbesar sebagai "This website".
- Services: strip platform + kartu dengan **tag chip** untuk daftar izin; Expatriate Formalities jadi kartu lebar.
- Network: 4 pilar jadi baris ikon kecil inline, bukan kartu berikon besar.
- Office: galeri **bento 1+4** foto asli.
- Clients: band hairline di bawah hero, label eyebrow + leaf, logo berwarna tinggi 48px (36px mobile), marquee 22s; tidak ada item menu (ada di footer).
- Eyebrow hanya di Hero, About, Services.

## Insights (list & detail)
List: header, filter kategori (chip), grid `NewsCard` 9/halaman, pagination. Detail: breadcrumb, judul, tanggal, kategori, isi, artikel terkait, CTA. Kategori: `regulatory-update`, `guide`, `company-news`.

## Peta jaringan
SVG Indonesia dari data publik (Natural Earth, disederhanakan), titik kota dari koleksi `cities` (nama, lat, lng) diproyeksikan equirectangular. 13 kota seed dari compro. Warna peta `green-deep`, titik `accent` (compro memakai pin merah-oranye; di web pakai putih bergaris hijau agar tidak memunculkan warna di luar palet, kecuali klien minta sama persis).

## Catatan konten
- Nama entitas lengkap pada penyebutan pertama: "PT Affirmate Tatakelola Nusantara (Affirmate Administrative)".
- Istilah izin ditulis sesuai compro (KITAS, KITAP, RPTKA, MERP, SKTT, STM); "Notification IMTA" ditampilkan sesuai compro sampai klien menjawab OPEN-QUESTIONS #5.
- Typo compro diperbaiki di web ("deliver", "reliable", "risk management", "Retirement").

### Revisi visual v2 (12 Okt 2026 malam, template brosur klien)
Struktur dan urutan section tetap. Perubahan hanya presentasi: hero ala cover template (foto leaf + tile judul), About jadi halaman hijau dengan panel krem, Why memakai foto berbingkai hijau + tab, Services memakai diagram 4 kelopak (01–04) dengan rincian tag di bawahnya, Journey memakai blok tahun hijau ala daftar isi, Network jadi panel hijau dengan peta krem, galeri Office berbentuk leaf. Rincian di `design/README.md`.
