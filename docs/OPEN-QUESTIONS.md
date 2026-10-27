# Open questions (menunggu klien: Pak Deny Y. Imran / tim Affirmate Administrative)

Nomor 1–6 menahan desain/go-live; sisanya bisa dijawab lewat CMS setelah launch.

| # | Pertanyaan | Dampak bila belum dijawab | Asumsi sementara |
|---|---|---|---|
| 1 | **Domain.** Compro mencetak `www.affirmate.co.id` di setiap halaman, tetapi itu situs Affirmate Group yang masih aktif. Website Affirmate Administrative akan di (a) subdomain mis. `administrative.affirmate.co.id`, (b) domain baru, atau (c) menggantikan affirmate.co.id? Siapa pemegang DNS? | Go-live, canonical, dan hubungan dengan situs grup tidak bisa difinalkan. Opsi (c) mengubah scope (konten grup harus lengkap). | Build dengan URL placeholder; desain tidak berubah untuk (a)/(b). |
| 2 | **Daftar layanan.** Empat layanan di compro hal. 5 (Conversant Expatriate, Expatriate Formalities, Management Advisory, Broad Expatriate Hosting) identik dengan layanan Apegale. Apakah Affirmate Administrative memang menjalankan layanan ini, dan apakah nama Apegale/GARIS perlu disebut? Apakah layanan administrasi lain (pendirian PT, payroll, corporate secretary) perlu kartu sendiri? | Section Services bisa salah menggambarkan unit. | Tampilkan 4 layanan compro + strip 3 pilar platform hal. 4; tanpa menyebut Apegale. |
| 3 | **Vision & Mission** hal. 2 berbicara tentang expatriate permit & manpower supply (visi-misi Apegale). Dipakai apa adanya, diganti versi grup, atau disembunyikan? | Teks About belum final. | Tampil sesuai compro, status draft. |
| 4 | **Hosting**: Node.js + PostgreSQL tersedia? Akses cPanel/VPS? Atau VPS yang dikelola KaryaLo? | Deploy tertunda. | Siapkan opsi SQLite. |
| 5 | **Istilah perizinan**: "Notification IMTA" sudah diganti Pengesahan RPTKA (PP 34/2021); kode visa juga berubah (2023). Ditulis sesuai compro atau diperbarui? | Risiko konten usang di halaman publik. | Sesuai compro, bertanda review. |
| 6 | **Font & logo**: compro memakai Cocogoose Pro *Trial* untuk judul besar. Ada lisensi resmi? Mohon file master logo Affirmate Administrative (SVG/AI) dan logo entitas lain. | Judul memakai Poppins ExtraBold; logo dari potongan PDF 200 dpi. | Poppins. |
| 7 | **Foto asli** resolusi tinggi: 4 foto kantor hal. 7, signage lobby hal. 3, foto gedung/skyline cover & hal. 6, globe hal. 2. Apakah foto gedung berlisensi? | Hero dan galeri memakai potongan PDF (kualitas sedang). | Potongan PDF. |
| 8 | **Logo klien**: file asli unicharm, Toda Corporation, dan logo resmi MUFG/BOT Finance (di compro masih teks "Finance and Leasing"), serta izin tampil. | Section Clients draft. | **Diputuskan pemilik 27 Okt 2026**: lima logo tayang (consent dicentang di seed) sebagai band di bawah hero, ditambah MSIG Life dan MSIG Insurance; logo MUFG masih versi compro, ganti bila file resmi diterima. |
| 9 | **Angka**: "35+ Cities Covered" dan "7+ Years Experience" (grup sejak 2019; Affirmate Administrative sejak 2023). Dipertahankan? | Stat bisa dipertanyakan pengunjung. | Tampil sesuai compro. |
| 10 | **Kontak**: 0819 0505 6482 itu WhatsApp? Tampilkan tombol WA? Email tujuan form (info@affirmate.co.id atau email unit)? Jam kerja? | WA tidak tampil; form ke info@. | **Revisi 23 Okt 2026: WA aktif.** Nomor 0819 0505 6482 dipakai sebagai WhatsApp (tombol mengambang + baris di Contact); ganti di Pengaturan situs bila nomor WA berbeda. |
| 11 | **Halaman 10 compro kosong.** Ada konten yang belum masuk (tim, sertifikasi, testimoni)? | Tidak ada. | **Selesai 23 Okt 2026**: klien mengirim 3 foto pimpinan → section Leadership (Yukifri Nazir, Group CEO · Deny Y. Imran, CEO PT Affirmate Tatakelola Nusantara · Mulyadi, Finance Director). Jabatan diambil dari nama file; sertifikasi/testimoni tetap tidak ada. |
| 12 | **Typo compro** ("deliever", "reliatble", "riskmanagement", "Retirment", baris misi ganda): boleh kami perbaiki di web? | — | Diperbaiki. |
| 13 | **Bahasa**: EN default + ID sesuai asumsi? Perlu JP? | Struktur URL. | EN default. |
| 14 | **Artikel awal** untuk Insights, atau KaryaLo drafkan 1 panduan untuk direview? | Section tersembunyi. | Draft 1 artikel. |
| 15 | **Review terjemahan ID** oleh siapa? | Teks ID tetap draft. | Preview CMS. |
| 16 | **Privacy policy**: teks standar KaryaLo dwibahasa cukup? | — | Standar. |
| 17 | **Revisi 23 Okt 2026, teks layanan.** Management Advisory diganti nama **Expatriate Advisory** dan **Corporate Secretary** ditambah sebagai layanan kelima, tetapi klien belum mengirim deskripsinya. | Ringkasan di kartu bisa tidak sesuai. | Expatriate Advisory memakai ringkasan compro hal. 5 apa adanya; Corporate Secretary memakai ringkasan singkat KaryaLo dari pilar platform hal. 4. Keduanya `needsReview`; ganti lewat CMS → Layanan. |
| 18 | **Revisi 23 Okt 2026, rincian Conversant Expatriate.** Klien memberi daftar visa (single entry tipe C: C1, C2, C6, C7, C10, C11, C17; multiple entry tipe D: D1, D2, D6, D17; kerja E23/E28; lansia E32; pendamping E31; Visa Global: Schengen, Australia, Jepang, China) dan minta KITAS "dijabarkan". | Jenis KITAS yang ditampilkan perlu konfirmasi. | KITAS dirinci dengan kode yang sama dengan visa klien: Kerja (E23, E28), Pendamping (E31), Lansia (E32); KITAP dan All in One Solutions tetap tag. Senior KITAS / Senior Visa Services dilebur ke Lansia (E32). |
| 19 | **Revisi 23 Okt 2026, payroll.** "Semua payroll dihapus": dihapus dari About, pilar & cakupan platform, kartu entitas ATN, deskripsi SEO, artikel contoh, dan preview desain; pilar ketiga jadi "HR / Corporate Secretary". | — | HR tetap disebut karena klien hanya meminta payroll dihapus. |

## Upsell yang dicatat, bukan scope ini
- Portal klien untuk memantau status perizinan/KITAS (berbagi inti dengan rencana GARIS 2.0 Apegale).
- Versi bahasa Jepang.
- Halaman per layanan untuk SEO.
- Penyelarasan/redesign situs grup affirmate.co.id dengan sistem desain yang sama.
