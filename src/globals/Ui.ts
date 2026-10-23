import type { Field, GlobalConfig } from 'payload'
import { globalAccess } from '../lib/access.ts'
import { row, tab, tabs, text } from '../lib/fields.ts'

// Short texts used across the site. Labels say where each text appears; fields sit three per row.
const group = (name: string, items: [string, string][]): Field => ({
  name, type: 'group', label: false, admin: { hideGutter: true },
  fields: [row(...items.map(([key, label]) => text(key, false, label, { width: '33%' })))],
})

/** UI labels in both languages (seed: content/seed/ui-dictionary.json). */
export const Ui: GlobalConfig = {
  slug: 'ui',
  label: 'Teks tombol & menu',
  access: globalAccess,
  versions: { drafts: true },
  admin: { hideAPIURL: true, group: 'Pengaturan', description: 'Versi Indonesia diisi setelah mengganti bahasa di kanan atas.' },
  fields: [
    tabs(
      tab('Menu', [group('nav', [['about', 'Tentang'], ['leadership', 'Pimpinan'], ['why', 'Mengapa kami'], ['group', 'Group'], ['services', 'Layanan'], ['journey', 'Perjalanan'], ['clients', 'Klien'],
        ['network', 'Jaringan'], ['office', 'Kantor'], ['insights', 'Insights'], ['contact', 'Kontak']])]),
      tab('Tombol', [group('cta', [['contact', 'Hubungi kami'], ['services', 'Lihat layanan'], ['whatsapp', 'WhatsApp'], ['readMore', 'Baca selengkapnya'], ['allInsights', 'Semua artikel'],
        ['openMaps', 'Buka peta'], ['visitGroup', 'Kunjungi grup']])]),
      tab('Formulir', [group('form', [['name', 'Label nama'], ['company', 'Label perusahaan'], ['email', 'Label email'], ['phone', 'Label telepon'], ['country', 'Label negara'],
        ['services', 'Label layanan'], ['message', 'Label pesan'], ['submit', 'Tombol kirim'], ['sending', 'Sedang mengirim'], ['success', 'Pesan terkirim'], ['error', 'Pesan gagal'],
        ['required', 'Wajib diisi'], ['invalid', 'Isian tidak valid'], ['consentRequired', 'Persetujuan wajib'], ['rateLimited', 'Terlalu sering mengirim']])]),
      tab('Teks bagian', [group('sections', [['youAreHere', 'Anda di sini'], ['memberOf', 'Anggota dari'], ['headOffice', 'Kantor pusat'], ['phone', 'Telepon'], ['email', 'Email'],
        ['address', 'Alamat'], ['latestInsights', 'Artikel terbaru'], ['relatedPosts', 'Artikel terkait'], ['categoryAll', 'Kategori: semua'],
        ['categoryRegulatoryUpdate', 'Kategori: regulasi'], ['categoryGuide', 'Kategori: panduan'], ['categoryCompanyNews', 'Kategori: berita']])]),
      tab('Footer & lainnya', [
        group('footer', [['rights', 'Hak cipta'], ['privacy', 'Link privasi'], ['mapCredit', 'Kredit peta']]),
        group('lang', [['switchTo', 'Ganti bahasa'], ['label', 'Label bahasa']]),
        group('notFound', [['title', 'Judul halaman 404'], ['text', 'Teks halaman 404'], ['home', 'Tombol ke beranda']]),
        group('a11y', [['skipToContent', 'Lewati ke konten'], ['openMenu', 'Buka menu'], ['closeMenu', 'Tutup menu'], ['previewOn', 'Mode pratinjau aktif'], ['previewExit', 'Keluar pratinjau']]),
      ]),
    ),
  ],
}
