/**
 * Team intro IG — empty green frames, AI-like lavender style, no people, no em-dash
 */
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const OUT = path.join(
  __dirname,
  '..',
  'public',
  'marketing',
  'ig-posts',
  '31-tim-idka.jpg',
)

const W = 1080
const H = 1350
const GREEN = '#22c55e'
const PURPLE = '#5e17eb'

const members = [
  { name: 'Ahmad Abror Rozaqi Fatoni', role: 'QA + Full Stack Developer' },
  { name: 'Faiz Abiyu Atha Fawas', role: 'Full Stack Developer' },
  { name: 'Ervan Dwi Ardian', role: 'UI/UX' },
  { name: 'Agta Fadjrin Aminullah', role: 'Customer Service' },
]

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

async function greenCard(size = 360) {
  const r = 40
  const svg = `
  <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="sh" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#3b0764" flood-opacity="0.18"/>
      </filter>
    </defs>
    <rect x="4" y="4" width="${size - 8}" height="${size - 8}" rx="${r}" ry="${r}"
      fill="${GREEN}" filter="url(#sh)"/>
    <!-- subtle inner highlight for soft 3d frame look -->
    <rect x="10" y="10" width="${size - 20}" height="${size - 20}" rx="${r - 6}" ry="${r - 6}"
      fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="3"/>
  </svg>`
  return sharp(Buffer.from(svg)).png().toBuffer()
}

async function main() {
  const card = 360
  const gapX = 48
  const gapY = 110
  const gridW = card * 2 + gapX
  const startX = Math.round((W - gridW) / 2)
  const startY = 340

  const green = await greenCard(card)

  const bgSvg = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#f7f2ff"/>
        <stop offset="50%" stop-color="#f0e8ff"/>
        <stop offset="100%" stop-color="#ebe4ff"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#bg)"/>
    <!-- floating purple dots -->
    <circle cx="90" cy="180" r="16" fill="#c4b5fd" opacity="0.85"/>
    <circle cx="150" cy="240" r="10" fill="#a78bfa" opacity="0.7"/>
    <circle cx="980" cy="200" r="18" fill="#c4b5fd" opacity="0.8"/>
    <circle cx="1020" cy="280" r="9" fill="#8b5cf6" opacity="0.45"/>
    <circle cx="70" cy="900" r="14" fill="#ddd6fe" opacity="0.9"/>
    <circle cx="1000" cy="980" r="20" fill="#c4b5fd" opacity="0.7"/>
    <circle cx="160" cy="1100" r="11" fill="#a78bfa" opacity="0.55"/>
    <path d="M80 1050 Q120 1080 90 1120" stroke="#a78bfa" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.5"/>
    <path d="M980 1120 Q1020 1160 990 1200" stroke="#c4b5fd" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.55"/>
    <!-- title -->
    <text x="50%" y="120" text-anchor="middle"
      font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="78" font-weight="900"
      fill="#3b0764" stroke="#ffffff" stroke-width="10" paint-order="stroke fill">Kenalan Yuk!</text>
    <text x="50%" y="120" text-anchor="middle"
      font-family="Arial Black, Arial, Helvetica, sans-serif" font-size="78" font-weight="900"
      fill="#5e17eb">Kenalan Yuk!</text>
    <text x="50%" y="185" text-anchor="middle"
      font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700"
      fill="#3b0764">Tim di balik IDKA Solutions</text>
    <path d="M340 205 Q540 230 740 205" stroke="${PURPLE}" stroke-width="6" fill="none" stroke-linecap="round"/>
  </svg>`

  // labels without em-dash
  const labelLayers = []
  const positions = [
    { x: startX, y: startY },
    { x: startX + card + gapX, y: startY },
    { x: startX, y: startY + card + gapY },
    { x: startX + card + gapX, y: startY + card + gapY },
  ]

  for (let i = 0; i < 4; i++) {
    const m = members[i]
    const p = positions[i]
    const label = Buffer.from(`
    <svg width="${card}" height="80" xmlns="http://www.w3.org/2000/svg">
      <text x="50%" y="28" text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" fill="#1f2937">${esc(m.name)}</text>
      <text x="50%" y="56" text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="600" fill="#4b5563">${esc(m.role)}</text>
    </svg>`)
    labelLayers.push({
      input: await sharp(label).png().toBuffer(),
      left: p.x,
      top: p.y + card + 14,
    })
  }

  const composites = [
    { input: await sharp(Buffer.from(bgSvg)).png().toBuffer(), top: 0, left: 0 },
    { input: green, left: positions[0].x, top: positions[0].y },
    { input: green, left: positions[1].x, top: positions[1].y },
    { input: green, left: positions[2].x, top: positions[2].y },
    { input: green, left: positions[3].x, top: positions[3].y },
    ...labelLayers,
  ]

  await sharp({
    create: {
      width: W,
      height: H,
      channels: 3,
      background: { r: 243, g: 236, b: 255 },
    },
  })
    .composite(composites)
    .jpeg({ quality: 93, mozjpeg: true })
    .toFile(OUT)

  console.log('OK', OUT, Math.round(fs.statSync(OUT).size / 1024) + 'KB')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
