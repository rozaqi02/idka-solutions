/**
 * Clean Before vs After IG post using real portfolio screenshot as "After".
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'public', 'marketing', 'ig-posts', '6.jpg');
const LOGO = path.join(ROOT, 'public', 'logo-idka-solutions.png');
const AFTER = path.join(ROOT, 'public', 'portfolio', 'pentagon-kontraktor.png');
const W = 1080;
const H = 1350;
const PRIMARY = '#5e17eb';

async function browserFrame(contentBuf, width, height, barColor = '#5e17eb') {
  const barH = 34;
  const barSvg = Buffer.from(`
    <svg width="${width}" height="${barH}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${barColor}"/>
      <circle cx="18" cy="17" r="5.5" fill="#ff5f57"/>
      <circle cx="38" cy="17" r="5.5" fill="#febc2e"/>
      <circle cx="58" cy="17" r="5.5" fill="#28c840"/>
      <rect x="80" y="10" width="${width - 100}" height="14" rx="7" fill="rgba(255,255,255,0.22)"/>
    </svg>
  `);
  const shot = await sharp(contentBuf)
    .resize(width, height - barH, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 90 })
    .toBuffer();

  return sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .composite([
      { input: await sharp(barSvg).png().toBuffer(), top: 0, left: 0 },
      { input: shot, top: barH, left: 0 },
    ])
    .png()
    .toBuffer();
}

/** Intentionally outdated "before" website mock (SVG — not a real client) */
async function makeBeforeSite(width, height) {
  const svg = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#c8c8c8"/>
      <rect x="0" y="0" width="100%" height="48" fill="#333333"/>
      <text x="16" y="32" font-family="Times New Roman, serif" font-size="18" fill="#ffff00">Beranda | Profil | Hubungi Kami</text>
      <rect x="24" y="70" width="${width - 48}" height="120" fill="#999999"/>
      <text x="${width / 2}" y="140" text-anchor="middle" font-family="Comic Sans MS, Arial" font-size="28" fill="#0000ee" text-decoration="underline">SELAMAT DATANG</text>
      <text x="24" y="230" font-family="Times New Roman, serif" font-size="16" fill="#000000">Website perusahaan kami. Silakan hubungi kami.</text>
      <text x="24" y="260" font-family="Times New Roman, serif" font-size="14" fill="#0000ee" text-decoration="underline">klik disini klik disini klik disini</text>
      <rect x="24" y="290" width="140" height="90" fill="#666666"/>
      <rect x="180" y="290" width="140" height="90" fill="#777777"/>
      <rect x="336" y="290" width="140" height="90" fill="#555555"/>
      <text x="24" y="420" font-family="Times New Roman, serif" font-size="13" fill="#333333">© 2012 — Best viewed in Internet Explorer 6</text>
      <text x="24" y="450" font-family="Times New Roman, serif" font-size="12" fill="#cc0000">Marquee text running here..............</text>
    </svg>
  `);
  return sharp(svg).png().toBuffer();
}

async function main() {
  const panelW = 470;
  const panelH = 680;
  const frameH = 560;

  const beforeContent = await makeBeforeSite(panelW, frameH - 34);
  const beforeFrame = await browserFrame(beforeContent, panelW, frameH, '#555555');

  const afterFrame = await browserFrame(
    await sharp(AFTER).png().toBuffer(),
    panelW,
    frameH,
    PRIMARY
  );

  // Card wrappers
  async function card(frame, title, bg, titleBg, titleColor) {
    const titleSvg = Buffer.from(`
      <svg width="${panelW + 24}" height="52" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" rx="14" fill="${titleBg}"/>
        <text x="${(panelW + 24) / 2}" y="34" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="800" fill="${titleColor}">${title}</text>
      </svg>
    `);
    return sharp({
      create: {
        width: panelW + 24,
        height: panelH,
        channels: 3,
        background: bg,
      },
    })
      .composite([
        { input: await sharp(titleSvg).png().toBuffer(), top: 18, left: 0 },
        { input: frame, top: 90, left: 12 },
      ])
      .png()
      .toBuffer();
  }

  const leftCard = await card(beforeFrame, 'SEBELUM', { r: 230, g: 230, b: 235 }, '#9ca3af', '#1f2937');
  const rightCard = await card(afterFrame, 'SESUDAH PAKAI IDKA', { r: 243, g: 238, b: 255 }, PRIMARY, '#ffffff');

  let logoBuf = null;
  if (fs.existsSync(LOGO)) {
    logoBuf = await sharp(LOGO)
      .resize({ height: 48, fit: 'inside' })
      .png()
      .toBuffer();
  }

  const headerSvg = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ede8f7"/>
      <circle cx="980" cy="100" r="160" fill="#5e17eb" opacity="0.08"/>
      <circle cx="80" cy="1200" r="180" fill="#8b5cf6" opacity="0.08"/>

      <text x="540" y="155" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="54" font-weight="800" fill="#1a1f2e">Before vs After</text>
      <text x="540" y="200" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="600" fill="${PRIMARY}">Website bisnis yang lebih dipercaya</text>

      <text x="540" y="1050" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" fill="#5a6678">Dari tampilan usang → profesional &amp; modern</text>

      <text x="540" y="1260" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" fill="${PRIMARY}">@idkasolutions</text>
      <text x="540" y="1298" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="600" fill="#6b7280">Contoh hasil: Pentagon Kontraktor</text>
    </svg>
  `);

  const composites = [
    { input: await sharp(headerSvg).png().toBuffer(), top: 0, left: 0 },
    { input: leftCard, top: 250, left: 32 },
    { input: rightCard, top: 250, left: 554 },
  ];

  if (logoBuf) {
    const logoMeta = await sharp(logoBuf).metadata();
    composites.push({
      input: logoBuf,
      top: 48,
      left: Math.round((W - logoMeta.width) / 2),
    });
  }

  await sharp({
    create: { width: W, height: H, channels: 3, background: { r: 237, g: 232, b: 247 } },
  })
    .composite(composites)
    .jpeg({ quality: 93, mozjpeg: true })
    .toFile(OUT);

  console.log(`OK → ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
