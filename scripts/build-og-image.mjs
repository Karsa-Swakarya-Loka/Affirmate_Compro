// Builds public/brand/og-default.jpg (1200x630), favicon PNGs and apple-touch-icon from design assets.
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
mkdirSync('public/brand', { recursive: true })
const green = { r: 0x2f, g: 0x6b, b: 0x3a, alpha: 1 }
const photo = await sharp('design/assets/Photography/hero-lobby-signage.jpg').resize(1200, 630, { fit: 'cover' }).modulate({ saturation: 0.6 }).toBuffer()
const tint = await sharp({ create: { width: 1200, height: 630, channels: 4, background: { r: 47, g: 107, b: 58, alpha: 0.45 } } }).png().toBuffer()
const logo = await sharp('design/assets/Photography/../Logos/affirmate-administrative-white.png').resize({ width: 420 }).toBuffer()
await sharp(photo).composite([{ input: tint, blend: 'multiply' }, { input: logo, left: 72, top: 630 - 72 - 110 }]).jpeg({ quality: 86 }).toFile('public/brand/og-default.jpg')
const mark = await sharp('design/assets/Logos/cube-mark.svg').resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer()
for (const size of [32, 192, 512]) await sharp(mark).resize(size, size).png().toFile(`public/brand/icon-${size}.png`)
await sharp({ create: { width: 180, height: 180, channels: 4, background: green } }).composite([{ input: await sharp(mark).resize(132, 132).toBuffer(), gravity: 'centre' }]).png().toFile('public/brand/apple-touch-icon.png')
console.log('brand images written')
