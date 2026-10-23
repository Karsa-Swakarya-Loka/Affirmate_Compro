# 03 — CMS (Payload 3)

Localization: `locales: [{ code: 'en', label: 'English' }, { code: 'id', label: 'Bahasa Indonesia' }]`, `defaultLocale: 'en'`, `fallback: true`. **L** = `localized: true`. Admin `/admin`, bahasa admin Indonesia. Koleksi publik punya draft/published (`versions: { drafts: true }`), kecuali `inquiries` dan `cities`.

## Globals
### `site`
`legalName` · `brandName` · `groupName` ("Affirmate Group") · `logo` · `logoWhite` · `phone` ("021 5092 8670") · `phone2` ("0819 0505 6482") · `whatsapp` (digits, kosong = tombol WA sembunyi) · `email` ("info@affirmate.co.id") · `address` **L** · `mapsUrl` · `workingHours` **L** · `social` (array: platform, url) · `groupUrl` · `groupBlurb` **L** (paragraf back cover) · `seoDefault` (title **L**, description **L**, ogImage) · `inquiryRecipients` (array email).

### `home`
- `hero`: `eyebrow` **L**, `headline` **L**, `highlight` **L**, `lead` **L**, `image`, `primaryCta`/`secondaryCta` (label **L**, href).
- `about`: `eyebrow` **L**, `title` **L**, `subtitle` **L**, `body` **L** (richText), `vision` **L**, `mission` **L** (array text), `showVisionMission` (checkbox), `stats` (array: `value`, `label` **L**, `sublabel` **L**, `icon`).
- `leadership` (23 Okt 2026): `title` **L**, `subtitle` **L**, `body` **L**, `people` (array ≤8: `name`, `role` **L**, `photo` upload). Section tampil bila ≥1 orang berfoto.
- `why`: `title` **L**, `tagline` **L**, `body` **L**, `image`, `pillars` (array 4: `icon`, `title` **L**, `text` **L**).
- `group`: `title` **L**, `body` **L** (richText).
- `services`: `eyebrow` **L**, `title` **L**, `intro` **L**, `platformTitle` **L**, `platformPillars` (array 3: `title` **L**), `platformScope` (array 7: `label` **L**).
- `journey`: `title` **L**, `subtitle` **L**, `body` **L**, `image`.
- `clients`: `title` **L**, `subtitle` **L**, `body` **L**.
- `network`: `title` **L**, `subtitle` **L**, `body` **L**, `pillars` (array 4: `icon`, `title` **L**, `text` **L**).
- `office`: `title` **L**, `gallery` (array upload).
- `contact`: `title` **L**, `text` **L**, `consentText` **L**.
- `sectionsVisible`: checkbox per section.

### `legal`
`privacyTitle` **L**, `privacyBody` **L**, `updatedAt`.

### `ui`
Kamus label UI dua bahasa. Seed `content/seed/ui-dictionary.json`.

## Collections
### `services`
`title` **L** · `slug` · `order` · `icon` (select Lucide) · `summary` **L** · `items` **L** (array text; daftar KITAS, RPTKA, dst.) · `groups` (array: `title` **L**, `label` **L** opsional, `items` **L**; rincian berkelompok, dipakai Conversant Expatriate untuk jenis KITAS dan Visa Indonesia / Global, 23 Okt 2026) · `body` **L** (richText, opsional) · `seo`. Seed: 5 layanan (4 dari compro hal. 5 dengan Management Advisory → Expatriate Advisory, plus Corporate Secretary; revisi klien 23 Okt 2026).

### `groupEntities`
`name` (PT lengkap) · `brand` ("Affirmate Business Advisory") · `category` **L** ("Business Advisory / Investment") · `summary` **L** · `bullets` **L** (array) · `logo` · `url` · `isSelf` (checkbox; ATN = true) · `order`. Seed: 4 entitas hal. 4.

### `milestones`
`year` · `label` **L** ("Founded", "Expansion"…) · `text` **L** · `order`. Seed: 7 milestone hal. 6.

### `clients`
`name` · `logo` · `url` · `order` · `consent` (wajib true untuk publish). Seed: 3 klien hal. 8 (**draft** sampai izin logo dikonfirmasi).

### `cities`
`name` · `lat` · `lng` · `order`. Seed: 13 kota hal. 9 dengan koordinat publik.

### `posts`
`title` **L** · `slug` · `category` · `cover` · `excerpt` **L** · `body` **L** · `publishedAt` · `seo`. Tanpa seed.

### `media`
Upload, `alt` **L** wajib. Sizes: thumb 400, card 800, hero 1600, og 1200×630.

### `inquiries`
`name` · `company` · `email` · `phone` · `country` · `services` (rel → services, hasMany) · `message` · `consent` · `locale` · `status` (new/contacted/closed) · `createdAt`. Create publik via route handler (validasi + honeypot + rate-limit); baca hanya admin; email ke `site.inquiryRecipients`.

### `users`
Role `admin`, `editor` (editor tidak bisa ubah `site`, `legal`, `users`).

## Seed
`src/seed/index.ts` membaca `content/seed/*.json`, upsert by `slug`/`name`/`year`, unggah aset dari `design/assets/**` ke `media` dengan alt dua bahasa, isi kedua locale. Idempoten; tidak menimpa suntingan editor tanpa flag. Entri bertanda `needsReview` disimpan sebagai **draft**.
