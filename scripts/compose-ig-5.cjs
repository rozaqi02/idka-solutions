/**
 * Creative portfolio IG post #5 — real screenshots, dynamic collage layout.
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'public', 'marketing', 'ig-posts', '5.jpg');
const LOGO = path.join(ROOT, 'public', 'logo-idka-solutions.png');
const W = 1080;
const H = 1350;
const PRIMARY = '#5e17eb';

function resolveShot(base) {
  const png = path.join(ROOT, 'public', 'portfolio', `${base}.png`);
  const webp = path.join(ROOT, 'public', 'portfolio', `${base}.webp`);
  if (fs.existsSync(png)) return png;
  if (fs.existsSync(webp)) return webp;
  throw new Error(`Missing: ${base}`);
}

async function logoTransparent(maxH = 44) {
  const { data, info } = await sharp(LOGO)
    .resize({ height: maxH, fit: 'inside' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] < 28 && data[i + 1] < 28 && data[i + 2] < 28) data[i + 3] = 0;
  }
  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();
}

/**
 * Purple browser chrome + real screenshot + soft shadow + optional rotation
 */
async function browserMock({
  file,
  width,
  height,
  rotate = 0,
  bar = PRIMARY,
}) {
  const barH = 32;
  const contentH = height - barH;

  const shot = await sharp(file)
    .resize(width, contentH, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 91 })
    .toBuffer();

  const barSvg = Buffer.from(`
    <svg width="${width}" height="${barH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="b" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#4a10c4"/>
          <stop offset="100%" stop-color="#7c3aed"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#b)"/>
      <circle cx="16" cy="16" r="5" fill="#ff5f57"/>
      <circle cx="34" cy="16" r="5" fill="#febc2e"/>
      <circle cx="52" cy="16" r="5" fill="#28c840"/>
      <rect x="72" y="9" width="${Math.max(80, width - 100)}" height="14" rx="7" fill="rgba(255,255,255,0.22)"/>
    </svg>
  `);

  const frame = await sharp({
    create: {
      width: width + 6,
      height: height + 6,
      channels: 4,
      background: { r: 74, g: 16, b: 196, alpha: 1 },
    },
  })
    .composite([
      { input: await sharp(barSvg).png().toBuffer(), top: 3, left: 3 },
      { input: shot, top: 3 + barH, left: 3 },
    ])
    .png()
    .toBuffer();

  // Shadow plate
  const pad = 28;
  const fw = width + 6;
  const fh = height + 6;
  const shadowSvg = Buffer.from(`
    <svg width="${fw + pad * 2}" height="${fh + pad * 2}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="s" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#3b0764" flood-opacity="0.35"/>
        </filter>
      </defs>
      <rect x="${pad}" y="${pad}" width="${fw}" height="${fh}" rx="14" fill="#4a10c4" filter="url(#s)"/>
    </svg>
  `);

  let composed = await sharp({
    create: {
      width: fw + pad * 2,
      height: fh + pad * 2,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      { input: await sharp(shadowSvg).png().toBuffer(), top: 0, left: 0 },
      { input: frame, top: pad, left: pad },
    ])
    .png()
    .toBuffer();

  if (rotate !== 0) {
    composed = await sharp(composed)
      .rotate(rotate, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
  }

  return composed;
}

async function labelChip(text) {
  const w = Math.min(320, 28 + text.length * 11);
  const h = 36;
  const svg = Buffer.from(`
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" rx="18" fill="#ffffff"/>
      <rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="17" fill="none" stroke="#5e17eb" stroke-width="2"/>
      <text x="${w / 2}" y="24" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="800" fill="#5e17eb">${text}</text>
    </svg>
  `);
  return sharp(svg).png().toBuffer();
}

async function main() {
  const shots = [
    {
      file: resolveShot('cidika-travel'),
      w: 560,
      h: 360,
      rot: -8,
      x: -10,
      y: 280,
      label: 'Cidika Travel',
      lx: 40,
      ly: 620,
    },
    {
      file: resolveShot('pentagon-kontraktor'),
      w: 600,
      h: 390,
      rot: 7,
      x: 420,
      y: 340,
      label: 'Pentagon Kontraktor',
      lx: 700,
      ly: 720,
    },
    {
      file: resolveShot('nutri-bunga'),
      w: 580,
      h: 370,
      rot: -4,
      x: 60,
      y: 700,
      label: 'Nutri Bunga',
      lx: 120,
      ly: 1060,
    },
    {
      file: resolveShot('imzaqi-store'),
      w: 480,
      h: 320,
      rot: 5,
      x: 520,
      y: 820,
      label: 'Imzaqi Store',
      lx: 720,
      ly: 1140,
    },
  ];

  // Creative background
  const bgSvg = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stop-color="#f5f3ff"/>
          <stop offset="50%" stop-color="#ede9fe"/>
          <stop offset="100%" stop-color="#e9d5ff"/>
        </linearGradient>
        <radialGradient id="g1" cx="15%" cy="20%" r="40%">
          <stop offset="0%" stop-color="#5e17eb" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="#5e17eb" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="g2" cx="90%" cy="75%" r="45%">
          <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <rect width="100%" height="100%" fill="url(#g1)"/>
      <rect width="100%" height="100%" fill="url(#g2)"/>
      <!-- abstract dots -->
      <circle cx="980" cy="160" r="8" fill="#5e17eb" opacity="0.25"/>
      <circle cx="940" cy="200" r="4" fill="#7c3aed" opacity="0.3"/>
      <circle cx="100" cy="1100" r="6" fill="#5e17eb" opacity="0.2"/>
      <circle cx="160" cy="1140" r="3" fill="#8b5cf6" opacity="0.35"/>

      <!-- header -->
      <text x="72" y="100" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="800" fill="${PRIMARY}" letter-spacing="3">PORTOFOLIO NYATA</text>
      <text x="72" y="165" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="800" fill="#1a1f2e">Karya yang Bisa</text>
      <text x="72" y="220" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="800" fill="${PRIMARY}">Kamu Cek Langsung</text>
      <text x="72" y="262" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="600" fill="#5a6678">Screenshot website klien — live &amp; real</text>

      <text x="540" y="1295" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" fill="${PRIMARY}">@idkasolutions</text>
      <text x="540" y="1325" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="600" fill="#6b7280">Mau projectmu di sini? DM kami</text>
    </svg>
  `);

  const layers = [{ input: await sharp(bgSvg).png().toBuffer(), top: 0, left: 0 }];

  // Build mockups back-to-front (first = behind)
  for (const s of shots) {
    const mock = await browserMock({
      file: s.file,
      width: s.w,
      height: s.h,
      rotate: s.rot,
    });
    const meta = await sharp(mock).metadata();
    const left = Math.max(-40, Math.min(W - 80, s.x));
    const top = Math.max(0, Math.min(H - 80, s.y));
    layers.push({ input: mock, left, top });

    const chip = await labelChip(s.label);
    const cm = await sharp(chip).metadata();
    layers.push({
      input: chip,
      left: Math.max(8, Math.min(W - cm.width - 8, s.lx)),
      top: Math.max(8, Math.min(H - cm.height - 8, s.ly)),
    });
  }

  // Logo top-right
  try {
    const logo = await logoTransparent(40);
    const lm = await sharp(logo).metadata();
    layers.push({
      input: logo,
      left: W - lm.width - 48,
      top: 48,
    });
  } catch (_) {
    /* optional */
  }

  await sharp({
    create: { width: W, height: H, channels: 3, background: { r: 237, g: 232, b: 247 } },
  })
    .composite(layers)
    .jpeg({ quality: 93, mozjpeg: true })
    .toFile(OUT);

  console.log('OK →', OUT);
  console.log('Creative collage with 4 real portfolio PNGs');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
