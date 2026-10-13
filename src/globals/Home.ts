import type { Field, GlobalConfig } from 'payload'
import { globalAccess } from '../lib/access.ts'
import { checkbox, flat, icon, listAdmin, localizedList, review, row, tab, tabs, text, textarea, upload } from '../lib/fields.ts'
import { previewUrl } from '../lib/admin-preview.ts'

const cta = (name: string, label: string): Field => ({ name, type: 'group', label, admin: { hideGutter: true }, fields: [
  row(text('label', true, 'Tulisan tombol', { width: '50%' }),
    { name: 'href', type: 'text', required: true, defaultValue: '#contact', label: 'Tujuan tombol', admin: { width: '50%', description: 'Bagian halaman (mis. #contact, #services) atau link lengkap.' } }),
] })
const pillars = (name: string, label: string): Field => ({ name, type: 'array', label, labels: { singular: 'Pilar', plural: 'Pilar' }, maxRows: 6, admin: listAdmin(), fields: [
  row(text('title', true, 'Judul', { width: '65%' }), icon('icon', '35%')), textarea('text', true, 'Penjelasan'),
] })
const heading = (titleRequired = true) => [
  row(text('eyebrow', false, 'Teks kecil di atas judul', { width: '35%' }), text('title', titleRequired, 'Judul bagian', { width: '65%' })),
]
const sections: [string, string][] = [
  ['about', 'Tentang kami'], ['visionMission', 'Visi & misi'], ['stats', 'Angka'], ['why', 'Mengapa kami'], ['group', 'Affirmate Group'], ['services', 'Layanan'],
  ['journey', 'Perjalanan'], ['clients', 'Klien'], ['network', 'Jaringan'], ['office', 'Kantor'], ['insights', 'Insights'], ['contact', 'Kontak'],
]

/** Every landing-page section in compro order (docs/02). Sections with collections only hold their headings here. */
export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Beranda',
  access: globalAccess,
  versions: { drafts: true },
  admin: { group: 'Halaman', preview: previewUrl('home'), description: 'Isi halaman utama, satu tab per bagian halaman.' },
  fields: [
    tabs(
      tab('Hero', [flat('hero', [
        text('eyebrow', false, 'Teks kecil di atas judul (untuk siapa)'),
        row(text('headline', true, 'Judul besar', { width: '60%' }), text('highlight', false, 'Kata yang disorot', { width: '40%', description: 'Harus sama persis dengan bagian dari judul.' })),
        textarea('lead', true, 'Paragraf pembuka'),
        row(upload('image', false, 'Foto hero', { width: '60%' }), text('coverLabel', false, 'Teks tile cover', { width: '40%', placeholder: 'Company Profile' })),
        cta('primaryCta', 'Tombol utama'), cta('secondaryCta', 'Tombol kedua'),
      ])]),
      tab('Tentang', [flat('about', [
        ...heading(), text('subtitle', false, 'Subjudul'), textarea('body', true, 'Paragraf'), upload('image', false, 'Foto'),
        textarea('vision', false, 'Visi'), localizedList('mission', 'Misi'),
        checkbox('showVisionMission', 'Tampilkan visi & misi', { defaultValue: true }),
        { name: 'stats', type: 'array', maxRows: 4, label: 'Angka (maks. 4)', labels: { singular: 'Angka', plural: 'Angka' }, admin: listAdmin(), fields: [
          row({ name: 'value', type: 'text', required: true, label: 'Angka', admin: { width: '25%', placeholder: '20+' } }, text('label', true, 'Keterangan', { width: '40%' }),
            text('sublabel', false, 'Keterangan kecil', { width: '35%' })),
          icon(),
        ] },
      ])]),
      tab('Mengapa kami', [flat('why', [
        row(text('title', true, 'Judul bagian', { width: '60%' }), text('tagline', false, 'Tagline', { width: '40%' })),
        textarea('body', true, 'Paragraf'), upload('image', false, 'Foto'), pillars('pillars', 'Pilar keunggulan'),
      ])]),
      tab('Group', [flat('group', [text('title', true, 'Judul bagian'), textarea('body', true, 'Paragraf', { description: 'Daftar perusahaan diatur di Konten situs → Entitas grup.' })])]),
      tab('Layanan', [flat('services', [
        ...heading(), text('subtitle', false, 'Subjudul'), textarea('intro', true, 'Paragraf pembuka', { description: 'Daftar layanan diatur di Konten situs → Layanan.' }), upload('image', false, 'Foto'),
        text('platformTitle', false, 'Judul platform'), localizedList('platformPillars', 'Pilar platform (3)'), localizedList('platformScope', 'Cakupan (chip)'),
      ])]),
      tab('Perjalanan', [flat('journey', [row(text('title', true, 'Judul bagian', { width: '60%' }), text('subtitle', false, 'Subjudul', { width: '40%' })), textarea('body', false, 'Paragraf'), upload('image', false, 'Foto')])]),
      tab('Klien', [flat('clients', [row(text('title', true, 'Judul bagian', { width: '60%' }), text('subtitle', false, 'Subjudul', { width: '40%' })), textarea('body', false, 'Paragraf')])]),
      tab('Jaringan', [flat('network', [
        row(text('title', true, 'Judul bagian', { width: '60%' }), text('subtitle', false, 'Subjudul', { width: '40%' })),
        textarea('body', false, 'Paragraf', { description: 'Titik kota diatur di Konten situs → Kota jaringan.' }), pillars('pillars', 'Pilar jaringan'),
      ])]),
      tab('Kantor', [flat('office', [
        row(text('title', true, 'Judul bagian', { width: '60%' }), text('label', false, 'Label', { width: '40%' })),
        { name: 'gallery', type: 'array', maxRows: 8, label: 'Foto kantor (maks. 8)', labels: { singular: 'Foto', plural: 'Foto' }, admin: listAdmin(), fields: [upload('image', true, 'Foto')] },
      ])]),
      tab('Kontak', [flat('contact', [text('title', true, 'Judul bagian'), textarea('text', false, 'Paragraf'), text('consentText', true, 'Teks persetujuan di formulir')])]),
      tab('Tampilkan bagian', [
        { name: 'sectionsVisible', type: 'group', label: false, admin: { hideGutter: true, description: 'Hapus centang untuk menyembunyikan bagian dari halaman utama.' },
          fields: [row(...sections.map(([name, label]) => checkbox(name, label, { defaultValue: true, width: '33%' })))] },
      ]),
    ),
    review,
  ],
}
