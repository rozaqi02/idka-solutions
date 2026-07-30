/**
 * IG team post — plain green background, real photos, name+role only
 * (clean base for Canva manual edit)
 */
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const ROOT = path.join(__dirname, '..')
const TEAM = path.join(ROOT, 'public', 'team')
const OUT = path.join(ROOT, 'public', 'marketing', 'ig-posts', '31-tim-idka.jpg')

// Solid plain green for Canva background replace / easy keying
const BG = { r: 34, g: 197, b: 94 } // #22c55e
const FRAME = { r: 94, g: 23, b: 235 } // brand purple frame (AI-card look)
const W = 1080
const H = 1350

const members = [
  {
    file: 'ahmad-abror-rozaqi-fatoni.webp',
    name: 'Ahmad Abror Rozaqi Fatoni',
    role: 'QA + Full Stack Developer',
  },
  {
    file: 'faiz-abiyu-atha-fawas.webp',
    name: "Fa'iz Abiyu Atha Fawas",
    role: 'Full Stack Developer',
  },
  {
    file: 'ervan-dwi-ardian.webp',
    name: 'Ervan Dwi Ardian',
    role: 'UI/UX',
  },
  {
    file: 'agta-fadjrin-aminullah.webp',
    name: 'Agta Fadjrin Aminullah',
    role: 'Customer Service',
  },
]

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

async function memberCard(m, size = 380) {
  const inset = 10
  const photoSize = size - inset * 2
  const photoRaw = await sharp(path.join(TEAM, m.file))
    .resize(photoSize, photoSize, { fit: 'cover', position: 'north' })
    .png()
    .toBuffer()

  const r = 32
  const mask = Buffer.from(
    `<svg width="${photoSize}" height="${photoSize}"><rect width="${photoSize}" height="${photoSize}" rx="${r}" ry="${r}" fill="white"/></svg>`,
  )
  const photo = await sharp(photoRaw)
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer()

  const frameR = 38
  const frameMask = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${frameR}" ry="${frameR}" fill="white"/></svg>`,
  )

  const framed = await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { ...FRAME, alpha: 1 },
    },
  })
    .composite([{ input: photo, top: inset, left: inset }])
    .png()
    .toBuffer()

  return sharp(framed)
    .composite([{ input: frameMask, blend: 'dest-in' }])
    .png()
    .toBuffer()
}

async function labelPng(name, role, width = 380) {
  const h = 86
  // White pill labels only (name + role) — easy to recolor/move in Canva
  const svg = `
  <svg width="${width}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="${width}" height="${h}" rx="20" fill="#ffffff"/>
    <text x="50%" y="34" text-anchor="middle"
      font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700" fill="#111827">${esc(name)}</text>
    <text x="50%" y="60" text-anchor="middle"
      font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="600" fill="#5e17eb">${esc(role)}</text>
  </svg>`
  return sharp(Buffer.from(svg)).png().toBuffer()
}

async function main() {
  const size = 380
  const gapX = 44
  const gapY = 22
  const labelH = 86
  const blockH = size + 12 + labelH
  const gridW = size * 2 + gapX
  const gridH = blockH * 2 + gapY
  const startX = Math.round((W - gridW) / 2)
  const startY = Math.round((H - gridH) / 2)

  const cards = []
  for (const m of members) {
    cards.push({
      photo: await memberCard(m, size),
      label: await labelPng(m.name, m.role, size),
    })
  }

  const positions = [
    { x: startX, y: startY },
    { x: startX + size + gapX, y: startY },
    { x: startX, y: startY + blockH + gapY },
    { x: startX + size + gapX, y: startY + blockH + gapY },
  ]

  const composites = []
  cards.forEach((c, i) => {
    composites.push({ input: c.photo, left: positions[i].x, top: positions[i].y })
    composites.push({
      input: c.label,
      left: positions[i].x,
      top: positions[i].y + size + 12,
    })
  })

  await sharp({
    create: {
      width: W,
      height: H,
      channels: 3,
      background: BG,
    },
  })
    .composite(composites)
    .jpeg({ quality: 93, mozjpeg: true })
    .toFile(OUT)

  console.log('OK', OUT, Math.round(fs.statSync(OUT).size / 1024) + 'KB')
  console.log('BG solid green #22c55e — only names + roles kept')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
