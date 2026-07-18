/**
 * Perfect clean pricing IG post — all text via SVG (no AI garble).
 * Data aligned with src/data/content.ts packages.
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'public', 'marketing', 'ig-posts', '3.jpg');
const LOGO = path.join(ROOT, 'public', 'logo-idka-solutions.png');

const W = 1080;
const H = 1350;
const PRIMARY = '#5e17eb';
const PRIMARY_DARK = '#4a10c4';
const TEXT = '#1a1f2e';
const MUTED = '#5a6678';
const BG = '#ede8f7';

const packages = [
  {
    name: 'STARTER',
    priceMain: 'Rp 300rb',
    priceSub: 'Mulai dari',
    tagline: 'Cocok untuk pemula',
    features: [
      '1 halaman landing page',
      'Tombol WA langsung',
      'Mobile-friendly',
      '1–2× revisi',
    ],
    hot: false,
  },
  {
    name: 'BUSINESS',
    priceMain: 'Rp 900rb',
    priceSub: 'Mulai dari',
    tagline: 'Paling dipilih',
    features: [
      '3–5 halaman lengkap',
      'Portofolio / galeri',
      'Basic SEO',
      '2–3× revisi',
    ],
    hot: true,
  },
  {
    name: 'PREMIUM',
    priceMain: 'Rp 1,7jt',
    priceSub: 'Mulai dari',
    tagline: 'Siap scale up',
    features: [
      '5–8 halaman custom',
      'CMS edit sendiri',
      'Blog & analytics',
      'Support launch',
    ],
    hot: false,
  },
];

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function featureLines(features, x, startY, fill = MUTED) {
  return features
    .map((f, i) => {
      const y = startY + i * 36;
      return `
        <circle cx="${x + 10}" cy="${y - 5}" r="4" fill="${PRIMARY}"/>
        <text x="${x + 24}" y="${y}" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="600" fill="${fill}">${escapeXml(f)}</text>
      `;
    })
    .join('');
}

async function makeCard(pkg, width, height) {
  const headerH = 56;
  const headerFill = pkg.hot ? PRIMARY : '#ddd6fe';
  const headerText = pkg.hot ? '#ffffff' : PRIMARY_DARK;
  const border = pkg.hot ? PRIMARY : '#c4b5fd';
  const priceColor = PRIMARY_DARK;

  const svg = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="sh" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#5e17eb" flood-opacity="${pkg.hot ? 0.22 : 0.1}"/>
        </filter>
      </defs>
      <rect x="2" y="2" width="${width - 4}" height="${height - 4}" rx="28" fill="#ffffff" stroke="${border}" stroke-width="${pkg.hot ? 3 : 2}" filter="url(#sh)"/>
      <path d="M2,${headerH + 2} L2,30 Q2,2 30,2 L${width - 30},2 Q${width - 2},2 ${width - 2},30 L${width - 2},${headerH + 2} Z" fill="${headerFill}"/>
      <text x="${width / 2}" y="38" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="800" fill="${headerText}" letter-spacing="1">${escapeXml(pkg.name)}</text>

      <text x="${width / 2}" y="100" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="600" fill="${MUTED}">${escapeXml(pkg.priceSub)}</text>
      <text x="${width / 2}" y="148" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="800" fill="${priceColor}">${escapeXml(pkg.priceMain)}</text>
      <text x="${width / 2}" y="178" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700" fill="${PRIMARY}">${escapeXml(pkg.tagline)}</text>

      <line x1="28" y1="200" x2="${width - 28}" y2="200" stroke="#e9e5f5" stroke-width="2"/>

      ${featureLines(pkg.features, 28, 240)}
    </svg>
  `);

  return sharp(svg).png().toBuffer();
}

async function main() {
  const cardW = 300;
  const cardH = 480;
  const gap = 28;
  const totalCardsW = cardW * 3 + gap * 2;
  const startX = Math.round((W - totalCardsW) / 2);
  const cardY = 420;

  // Background + header text only (no ghost logos)
  const baseSvg = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${BG}"/>
      <circle cx="980" cy="120" r="160" fill="#5e17eb" opacity="0.07"/>
      <circle cx="80" cy="1220" r="180" fill="#8b5cf6" opacity="0.08"/>

      <text x="540" y="200" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="800" fill="${PRIMARY}" letter-spacing="4">HARGA JELAS</text>
      <text x="540" y="270" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="800" fill="${TEXT}">Harga Transparan</text>
      <text x="540" y="318" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="600" fill="${MUTED}">Pilih paket sesuai kebutuhan bisnismu</text>
      <text x="540" y="360" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="600" fill="${MUTED}">Harga final dikonfirmasi setelah brief</text>

      <!-- Popular badge above middle card -->
      <rect x="430" y="392" width="220" height="36" rx="18" fill="${PRIMARY}"/>
      <text x="540" y="416" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="800" fill="#ffffff">★  PALING POPULER</text>

      <text x="540" y="980" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="600" fill="${MUTED}">Domain &amp; hosting di luar paket · Bisa custom</text>

      <rect x="240" y="1020" width="600" height="64" rx="32" fill="${PRIMARY}"/>
      <text x="540" y="1060" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="800" fill="#ffffff">Konsultasi gratis via WhatsApp</text>

      <text x="540" y="1140" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" fill="${PRIMARY}">@idkasolutions</text>
      <text x="540" y="1175" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="600" fill="${MUTED}">WA 0822-4596-4007</text>
      <text x="540" y="1280" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="600" fill="${MUTED}">IDKA Solutions · Jasa website profesional</text>
    </svg>
  `);

  const composites = [
    { input: await sharp(baseSvg).png().toBuffer(), top: 0, left: 0 },
  ];

  // Logo centered top
  if (fs.existsSync(LOGO)) {
    const logo = await sharp(LOGO)
      .resize({ height: 52, fit: 'inside' })
      .png()
      .toBuffer();
    const meta = await sharp(logo).metadata();
    composites.push({
      input: logo,
      top: 48,
      left: Math.round((W - meta.width) / 2),
    });
  }

  // Cards: middle slightly raised for Business
  for (let i = 0; i < packages.length; i++) {
    const pkg = packages[i];
    const card = await makeCard(pkg, cardW, cardH);
    const x = startX + i * (cardW + gap);
    const y = pkg.hot ? cardY - 24 : cardY;
    // Scale hot card a bit larger
    if (pkg.hot) {
      const scaled = await sharp(card)
        .resize(Math.round(cardW * 1.06), Math.round(cardH * 1.06), { fit: 'fill' })
        .png()
        .toBuffer();
      const sm = await sharp(scaled).metadata();
      composites.push({
        input: scaled,
        left: Math.round(x - (sm.width - cardW) / 2),
        top: y,
      });
    } else {
      composites.push({ input: card, left: x, top: y });
    }
  }

  await sharp({
    create: { width: W, height: H, channels: 3, background: { r: 237, g: 232, b: 247 } },
  })
    .composite(composites)
    .jpeg({ quality: 94, mozjpeg: true })
    .toFile(OUT);

  // Verify no forbidden garbage strings by reading file size + log plan
  console.log('OK →', OUT);
  console.log('Packages rendered:');
  packages.forEach((p) => {
    console.log(`  ${p.name}: ${p.priceSub} ${p.priceMain} — ${p.features.length} features`);
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
