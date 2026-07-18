/**
 * Story 03 portfolio — Cidika + Imzaqi, logo without black box.
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'public', 'marketing', 'stories', 'story-03-porto.jpg');
const LOGO = path.join(ROOT, 'public', 'logo-idka-solutions.png');
const CIDIKA = path.join(ROOT, 'public', 'portfolio', 'cidika-travel.webp');
const IMZAQI = path.join(ROOT, 'public', 'portfolio', 'imzaqi-store.webp');
const W = 1080;
const H = 1920;
const PRIMARY = '#5e17eb';

async function logoNoBlack(maxH = 72) {
  const { data, info } = await sharp(LOGO)
    .resize({ height: maxH, fit: 'inside' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    // black / near-black → transparent
    if (r < 40 && g < 40 && b < 40) data[i + 3] = 0;
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();
}

async function phoneMock(shotPath, phoneW, phoneH, rotateDeg) {
  const bezel = 14;
  const notchH = 22;
  const screenW = phoneW - bezel * 2;
  const screenH = phoneH - bezel * 2 - 8;

  const screen = await sharp(shotPath)
    .resize(screenW, screenH, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 90 })
    .toBuffer();

  const frameSvg = Buffer.from(`
    <svg width="${phoneW}" height="${phoneH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#2a2a2e"/>
          <stop offset="100%" stop-color="#0f0f12"/>
        </linearGradient>
        <filter id="s" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="22" stdDeviation="20" flood-color="#1a0a3a" flood-opacity="0.45"/>
        </filter>
      </defs>
      <rect x="2" y="2" width="${phoneW - 4}" height="${phoneH - 4}" rx="42" fill="url(#g)" filter="url(#s)"/>
      <rect x="${bezel}" y="${bezel + 4}" width="${screenW}" height="${screenH}" rx="28" fill="#111"/>
      <rect x="${phoneW / 2 - 48}" y="12" width="96" height="${notchH}" rx="12" fill="#0a0a0c"/>
    </svg>
  `);

  let phone = await sharp(await sharp(frameSvg).png().toBuffer())
    .composite([
      {
        input: await sharp(screen)
          .composite([
            {
              input: Buffer.from(
                `<svg width="${screenW}" height="${screenH}"><rect width="100%" height="100%" rx="28" fill="white"/></svg>`
              ),
              blend: 'dest-in',
            },
          ])
          .png()
          .toBuffer()
          .catch(async () => screen),
        top: bezel + 4,
        left: bezel,
      },
    ])
    .png()
    .toBuffer();

  // Simpler composite without complex mask if above fails awkwardly
  phone = await sharp({
    create: {
      width: phoneW,
      height: phoneH,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: Buffer.from(`
          <svg width="${phoneW}" height="${phoneH}" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="s" x="-25%" y="-15%" width="150%" height="140%">
                <feDropShadow dx="0" dy="24" stdDeviation="22" flood-color="#1a0a3a" flood-opacity="0.5"/>
              </filter>
            </defs>
            <rect x="3" y="3" width="${phoneW - 6}" height="${phoneH - 6}" rx="44" fill="#1c1c20" filter="url(#s)"/>
          </svg>
        `),
        top: 0,
        left: 0,
      },
      {
        input: await sharp(shotPath)
          .resize(screenW, screenH, { fit: 'cover', position: 'top' })
          .png()
          .toBuffer(),
        top: bezel + 6,
        left: bezel,
      },
      {
        input: Buffer.from(`
          <svg width="${phoneW}" height="${phoneH}" xmlns="http://www.w3.org/2000/svg">
            <rect x="${phoneW / 2 - 50}" y="14" width="100" height="24" rx="12" fill="#0a0a0c"/>
          </svg>
        `),
        top: 0,
        left: 0,
      },
    ])
    .png()
    .toBuffer();

  if (rotateDeg) {
    phone = await sharp(phone)
      .rotate(rotateDeg, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
  }
  return phone;
}

async function main() {
  if (!fs.existsSync(CIDIKA) || !fs.existsSync(IMZAQI)) {
    throw new Error('Missing portfolio screenshots');
  }

  const bg = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stop-color="#4c1d95"/>
          <stop offset="55%" stop-color="#5e17eb"/>
          <stop offset="100%" stop-color="#2e1065"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <circle cx="900" cy="200" r="180" fill="#a78bfa" opacity="0.12"/>
      <circle cx="120" cy="1600" r="220" fill="#7c3aed" opacity="0.15"/>

      <text x="540" y="280" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="800" fill="#ffffff">Karya klien kami</text>
      <text x="540" y="1680" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="600" fill="#e9d5ff">Travel · E-commerce · UMKM</text>
      <text x="540" y="1780" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" fill="#ffffff">@idkasolutions</text>
    </svg>
  `);

  const logo = await logoNoBlack(80);
  // Soft white pill behind logo so purple logo pops, NO black box
  const logoMeta = await sharp(logo).metadata();
  const padX = 28;
  const padY = 18;
  const plateW = logoMeta.width + padX * 2;
  const plateH = logoMeta.height + padY * 2;
  const plate = await sharp({
    create: {
      width: plateW,
      height: plateH,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([
      {
        input: Buffer.from(
          `<svg width="${plateW}" height="${plateH}"><rect width="100%" height="100%" rx="20" fill="white"/></svg>`
        ),
        top: 0,
        left: 0,
      },
      { input: logo, top: padY, left: padX },
    ])
    .png()
    .toBuffer();

  // rounded plate properly
  const plateFinal = await sharp(plate)
    .composite([
      {
        input: Buffer.from(
          `<svg width="${plateW}" height="${plateH}"><rect width="100%" height="100%" rx="20" fill="white"/></svg>`
        ),
        blend: 'dest-in',
      },
    ])
    .png()
    .toBuffer();

  const phoneL = await phoneMock(CIDIKA, 380, 760, -12);
  const phoneR = await phoneMock(IMZAQI, 360, 720, 10);
  const lMeta = await sharp(phoneL).metadata();
  const rMeta = await sharp(phoneR).metadata();

  await sharp(bg)
    .composite([
      {
        input: plateFinal,
        top: 100,
        left: Math.round((W - plateW) / 2),
      },
      {
        input: phoneL,
        top: 380,
        left: 60,
      },
      {
        input: phoneR,
        top: 460,
        left: W - rMeta.width - 40,
      },
    ])
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(OUT);

  console.log('OK', OUT);
  console.log('Logo plate', plateW, 'x', plateH, '(white, no black)');
  console.log('Phones: Cidika + Imzaqi');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
