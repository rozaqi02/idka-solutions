const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const team = path.join(__dirname, '..', 'public', 'team')
const out = path.join(team, 'team-grid-ref.png')
const size = 420
const pad = 20
const W = size * 2 + pad * 3
const H = size * 2 + pad * 3

async function photoCard(file) {
  return sharp(path.join(team, file))
    .rotate()
    .resize(size, size, { fit: 'cover', position: 'attention' })
    .png()
    .toBuffer()
}

async function main() {
  // Prefer webp close-ups for consistent framing
  const a = await photoCard('ahmad-abror-rozaqi-fatoni.webp')
  const f = await photoCard('faiz-abiyu-atha-fawas.webp')
  const e = await photoCard('ervan-dwi-ardian.webp')
  const g = await photoCard('agta-fadjrin-aminullah.webp')

  await sharp({
    create: {
      width: W,
      height: H,
      channels: 3,
      background: { r: 245, g: 240, b: 255 },
    },
  })
    .composite([
      { input: a, left: pad, top: pad },
      { input: f, left: pad * 2 + size, top: pad },
      { input: e, left: pad, top: pad * 2 + size },
      { input: g, left: pad * 2 + size, top: pad * 2 + size },
    ])
    .png()
    .toFile(out)

  console.log('OK', out, Math.round(fs.statSync(out).size / 1024) + 'KB')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
