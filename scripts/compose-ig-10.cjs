/**
 * Clean brand closer IG post #10 — real logo, no AI clutter.
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'public', 'marketing', 'ig-posts', '10.jpg');
const LOGO = path.join(ROOT, 'public', 'logo-idka-solutions.png');
const W = 1080;
const H = 1350;
const PRIMARY = '#5e17eb';

/** Turn near-black background of logo into transparency */
async function logoTransparent(maxHeight = 160) {
  const resized = await sharp(LOGO)
    .resize({ height: maxHeight, fit: 'inside' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = resized;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    // near black → transparent
    if (r < 28 && g < 28 && b < 28) {
      data[i + 3] = 0;
    }
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();
}

async function main() {
  // Soft purple gradient background (SVG)
  const bgSvg = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#3b0764"/>
          <stop offset="45%" stop-color="#5e17eb"/>
          <stop offset="100%" stop-color="#2e1065"/>
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="35%" r="55%">
          <stop offset="0%" stop-color="#a78bfa" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="#5e17eb" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <rect width="100%" height="100%" fill="url(#glow)"/>
      <circle cx="140" cy="1180" r="200" fill="#8b5cf6" opacity="0.15"/>
      <circle cx="960" cy="200" r="160" fill="#c4b5fd" opacity="0.12"/>
    </svg>
  `);

  // Clean typography layer
  const textSvg = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <text x="540" y="420" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="800" fill="#e9d5ff" letter-spacing="5">IDKA SOLUTIONS</text>

      <text x="540" y="520" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="56" font-weight="800" fill="#ffffff">Bisnis Kamu Layak</text>
      <text x="540" y="595" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="56" font-weight="800" fill="#ffffff">Website yang Keren</text>

      <text x="540" y="680" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="600" fill="#ddd6fe">Website keren, bisnis makin dipercaya</text>

      <!-- soft underline -->
      <rect x="390" y="710" width="300" height="4" rx="2" fill="#c4b5fd" opacity="0.7"/>

      <text x="540" y="1180" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" fill="#f5f3ff">@idkasolutions</text>
      <text x="540" y="1225" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="600" fill="#c4b5fd">Jasa website profesional untuk UMKM &amp; startup</text>
      <text x="540" y="1275" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="600" fill="#a78bfa">Konsultasi gratis · WA 0822-4596-4007</text>
    </svg>
  `);

  const logo = await logoTransparent(200);
  const logoMeta = await sharp(logo).metadata();

  // Optional soft white plate behind logo for maximum clarity
  const plateW = logoMeta.width + 64;
  const plateH = logoMeta.height + 48;
  const plateSvg = Buffer.from(`
    <svg width="${plateW}" height="${plateH}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" rx="28" fill="#ffffff" opacity="0.96"/>
    </svg>
  `);
  const plate = await sharp(plateSvg).png().toBuffer();

  const plateX = Math.round((W - plateW) / 2);
  const plateY = 780;
  const logoX = Math.round((W - logoMeta.width) / 2);
  const logoY = plateY + Math.round((plateH - logoMeta.height) / 2);

  await sharp(bgSvg)
    .composite([
      { input: await sharp(textSvg).png().toBuffer(), top: 0, left: 0 },
      { input: plate, top: plateY, left: plateX },
      { input: logo, top: logoY, left: logoX },
    ])
    .jpeg({ quality: 94, mozjpeg: true })
    .toFile(OUT);

  console.log('OK →', OUT);
  console.log(`Logo size: ${logoMeta.width}x${logoMeta.height}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
