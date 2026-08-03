const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const W = 1080;
const H = 1350;
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'public', 'marketing', 'ig-posts');

const posts = [
  { id: '01', kicker: 'IDKA SOLUTIONS / 01', title: ['Website bukan', 'sekadar', 'pajangan.'], body: 'Ia adalah ruang pertama tempat calon pelanggan mengenal bisnismu secara utuh.', tag: 'BRAND PRESENCE', theme: 'paper', shape: 'orbit' },
  { id: '02', kicker: 'CATATAN UNTUK UMKM', title: ['Bisnis kecil.', 'Kesan', 'besar.'], body: 'Mulai dari website yang rapi, cepat, dan mudah dihubungi pelanggan.', tag: 'UMKM DIGITAL', theme: 'plum', shape: 'stairs' },
  { id: '03', kicker: 'CHECKLIST WEBSITE', title: ['3 hal yang', 'pelanggan cari', 'lebih dulu.'], body: 'Jelas produknya. Mudah menghubungi. Terlihat tepercaya.', tag: '01 JELAS / 02 MUDAH / 03 YAKIN', theme: 'cream', shape: 'check' },
  { id: '04', kicker: 'STRATEGI DIGITAL', title: ['Jangan biarkan', 'pelanggan', 'menebak.'], body: 'Website yang baik menjawab: siapa kamu, apa yang kamu tawarkan, dan bagaimana cara memulai.', tag: 'MAKE IT CLEAR', theme: 'orange', shape: 'arrow' },
  { id: '05', kicker: 'IDKA WEB STUDIO', title: ['Dari brief', 'menjadi', 'halaman hidup.'], body: 'Kami merancang pengalaman digital yang terasa tepat untuk cara bisnismu bekerja.', tag: 'DESIGN + BUILD', theme: 'ink', shape: 'wave' },
  { id: '06', kicker: 'WEBSITE TIP', title: ['Tombol WhatsApp', 'bukan hiasan.', 'Itu pintu masuk.'], body: 'Buat pelanggan bisa bertanya ketika minat mereka sedang tinggi.', tag: 'CONVERSION PATH', theme: 'green', shape: 'chat' },
  { id: '07', kicker: 'PORTOFOLIO / REAL WORK', title: ['Karya yang', 'bisa dilihat.', 'Bukan janji.'], body: 'Setiap proyek dimulai dari konteks bisnis, lalu diterjemahkan menjadi pengalaman yang jelas.', tag: 'SEE THE WORK', theme: 'paper', shape: 'frame' },
  { id: '08', kicker: 'PROSES IDKA', title: ['Dengar.', 'Rancang.', 'Luncurkan.'], body: 'Proses yang sederhana membuat keputusan besar terasa lebih ringan.', tag: '01 BRIEF / 02 BUILD / 03 LIVE', theme: 'blue', shape: 'path' },
  { id: '09', kicker: 'WEBSITE YANG BAIK', title: ['Cepat dibuka.', 'Mudah', 'dipahami.'], body: 'Karena setiap detik dan setiap kalimat menentukan apakah orang bertahan.', tag: 'PERFORMANCE MATTERS', theme: 'cream', shape: 'speed' },
  { id: '10', kicker: 'FOR PERSONAL BRAND', title: ['Namamu', 'juga perlu', 'punya rumah.'], body: 'Satukan karya, cerita, layanan, dan cara menghubungimu dalam satu tautan yang meyakinkan.', tag: 'PERSONAL SITE', theme: 'plum', shape: 'house' },
  { id: '11', kicker: 'PRODUK IDKA / NGELAMAR', title: ['Kariermu', 'butuh ruang', 'untuk tertata.'], body: 'Ngelamar membantu mencatat proses, memantau status, dan menyiapkan setiap lamaran kerja.', tag: 'CAREER CRM', theme: 'green', shape: 'briefcase' },
  { id: '12', kicker: 'KEPERCAYAAN DIGITAL', title: ['Tampil rapi.', 'Bicara', 'meyakinkan.'], body: 'Detail visual yang baik membantu bisnis kecil terlihat siap melayani dengan serius.', tag: 'TRUST BY DESIGN', theme: 'orange', shape: 'badge' },
  { id: '13', kicker: 'BISNIS LOKAL, ONLINE', title: ['Dekat di', 'lingkungan.', 'Luas di internet.'], body: 'Jangkau pelanggan baru tanpa kehilangan karakter lokal yang membuat bisnismu berbeda.', tag: 'LOCAL TO DIGITAL', theme: 'blue', shape: 'map' },
  { id: '14', kicker: 'IDKA CARE+', title: ['Website sudah', 'live. Kami', 'tetap ada.'], body: 'Dukungan, pembaruan, dan perbaikan agar ruang digitalmu terus siap digunakan.', tag: 'AFTER GO-LIVE', theme: 'ink', shape: 'hands' },
  { id: '15', kicker: 'MULAI DARI SINI', title: ['Punya ide', 'yang ingin', 'dibuat nyata?'], body: 'Mari bicara tentang website yang benar-benar berguna untuk langkah bisnismu berikutnya.', tag: 'KONSULTASI GRATIS', theme: 'paper', shape: 'spark' },
];

const palettes = {
  paper: { bg: '#f2eee7', ink: '#29221e', muted: '#685f58', accent: '#5b2c83', accent2: '#e39a3b', pale: '#e4d8c8' },
  plum: { bg: '#4a236b', ink: '#fffaf1', muted: '#e5d6ef', accent: '#f1b95c', accent2: '#bd91dc', pale: '#65328e' },
  cream: { bg: '#fff9ed', ink: '#2b2721', muted: '#6d6256', accent: '#386052', accent2: '#dc8b31', pale: '#e6d8bf' },
  orange: { bg: '#e7a242', ink: '#2b211a', muted: '#553c29', accent: '#5b2c83', accent2: '#fff8eb', pale: '#f1be71' },
  ink: { bg: '#29221e', ink: '#fffaf1', muted: '#ded2c5', accent: '#e39a3b', accent2: '#a571c6', pale: '#42362e' },
  green: { bg: '#386052', ink: '#fffaf1', muted: '#d9e6dd', accent: '#f0bb60', accent2: '#aa7ec8', pale: '#4d7567' },
  blue: { bg: '#315d7d', ink: '#fffaf1', muted: '#d6e5ed', accent: '#edb65d', accent2: '#9f78c4', pale: '#43718f' },
};

function esc(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function graphic(shape, p) {
  const s = `stroke="${p.accent}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"`;
  const light = p.ink === '#fffaf1' ? '#fffaf1' : p.ink;
  const c = `fill="${p.accent2}"`;
  const shapes = {
    orbit: `<ellipse cx="800" cy="880" rx="190" ry="70" ${s}/><ellipse cx="800" cy="880" rx="70" ry="190" ${s}/><circle cx="800" cy="880" r="30" ${c}/><circle cx="620" cy="810" r="14" ${c}/><circle cx="980" cy="950" r="12" ${c}/>`,
    stairs: `<path d="M600 1020h110V910h110V800h110V690h110" ${s}/><path d="M910 660l40 30-30 40" ${s}/><circle cx="655" cy="1020" r="20" ${c}/><circle cx="765" cy="910" r="20" ${c}/><circle cx="875" cy="800" r="20" ${c}/><circle cx="985" cy="690" r="20" ${c}/>`,
    check: `<circle cx="800" cy="880" r="180" ${s}/><path d="M685 885l75 75 155-185" stroke="${p.accent}" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="950" cy="730" r="15" ${c}/>`,
    arrow: `<path d="M580 990c90-230 230-330 380-245 53 30 71 94 40 143-35 57-125 54-157-4" ${s}/><path d="M830 920l11-40 38 13" ${s}/><circle cx="610" cy="970" r="24" ${c}/>`,
    wave: `<path d="M560 850c68-130 135-130 203 0s135 130 203 0 135-130 203 0" ${s}/><path d="M560 970c68-130 135-130 203 0s135 130 203 0 135-130 203 0" ${s}/><circle cx="660" cy="790" r="15" ${c}/><circle cx="960" cy="1030" r="15" ${c}/>`,
    chat: `<path d="M590 760h340a30 30 0 0 1 30 30v190a30 30 0 0 1-30 30H750l-85 70v-70h-75a30 30 0 0 1-30-30V790a30 30 0 0 1 30-30z" ${s}/><path d="M635 840h250M635 895h180" ${s}/><circle cx="905" cy="895" r="15" ${c}/>`,
    frame: `<rect x="600" y="730" width="380" height="280" rx="18" ${s}/><path d="M600 790h380M640 760h10M670 760h10M700 760h10" ${s}/><path d="M650 960l75-75 66 46 71-90 71 118" ${s}/><circle cx="880" cy="860" r="20" ${c}/>`,
    path: `<path d="M590 1010c0-140 68-260 175-260 103 0 131 126 210 126 64 0 86-68 86-134" ${s}/><circle cx="590" cy="1010" r="23" ${c}/><circle cx="765" cy="750" r="23" ${c}/><circle cx="975" cy="742" r="23" ${c}/>`,
    speed: `<path d="M600 990a190 190 0 0 1 380 0" ${s}/><path d="M790 990l120-140" ${s}/><circle cx="790" cy="990" r="22" ${c}/><path d="M660 905l-43-16M718 823l-23-39M862 823l23-39M920 905l43-16" ${s}/>`,
    house: `<path d="M590 890l200-155 200 155v165H590z" ${s}/><path d="M730 1055v-105h120v105M700 870h1M860 870h1" ${s}/><circle cx="920" cy="770" r="17" ${c}/>`,
    briefcase: `<rect x="600" y="800" width="370" height="220" rx="24" ${s}/><path d="M730 800v-45a30 30 0 0 1 30-30h50a30 30 0 0 1 30 30v45M600 880h370M745 880v30h80v-30" ${s}/><circle cx="910" cy="980" r="16" ${c}/>`,
    badge: `<path d="M790 720l52 54 75-2 30 70 69 34-10 75 47 59-47 59 10 75-69 34-30 70-75-2-52 54-52-54-75 2-30-70-69-34 10-75-47-59 47-59-10-75 69-34 30-70 75 2z" ${s}/><circle cx="790" cy="950" r="68" ${s}/><path d="M758 950l22 22 43-53" ${s}/>`,
    map: `<path d="M600 800l120-53 148 53 114-53v250l-114 53-148-53-120 53zM720 747v250M868 800v250" ${s}/><path d="M780 840c-36 0-66 27-66 61 0 50 66 111 66 111s66-61 66-111c0-34-30-61-66-61z" ${s}/><circle cx="780" cy="901" r="16" ${c}/>`,
    hands: `<path d="M600 1000c64-18 96-112 145-112 28 0 33 22 22 44l-28 52 74-101c17-22 50-2 37 21l-58 85 79-75c22-21 50 6 28 30l-74 80 80-43c26-15 43 21 16 37l-111 69c-47 30-98 31-143 12z" ${s}/><circle cx="930" cy="810" r="17" ${c}/>`,
    spark: `<path d="M790 740l26 112 112 26-112 26-26 112-26-112-112-26 112-26z" ${s}/><circle cx="950" cy="750" r="17" ${c}/><circle cx="640" cy="1050" r="14" ${c}/>`,
  };
  return `<g>${shapes[shape] || shapes.spark}<text x="790" y="1210" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="4" fill="${light}" opacity=".72">IDKA / ${shape.toUpperCase()}</text></g>`;
}

function render(post) {
  const p = palettes[post.theme];
  const title = post.title.map((line, index) => `<text x="80" y="${370 + index * 105}" font-family="Georgia, serif" font-size="${index === 1 ? 84 : 78}" font-weight="700" letter-spacing="-2" fill="${p.ink}">${esc(line)}</text>`).join('');
  const deco = post.theme === 'paper' || post.theme === 'cream'
    ? `<path d="M0 130 C220 18 390 240 600 136s290 32 480-106" stroke="${p.accent}" stroke-width="3" fill="none" opacity=".35"/>`
    : `<path d="M0 130 C220 18 390 240 600 136s290 32 480-106" stroke="${p.accent2}" stroke-width="3" fill="none" opacity=".48"/>`;
  const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 .06"/></feComponentTransfer></filter>
      <linearGradient id="wash" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p.accent}" stop-opacity=".24"/><stop offset="1" stop-color="${p.accent2}" stop-opacity=".06"/></linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="${p.bg}"/>
    <rect width="100%" height="100%" filter="url(#noise)"/>
    <circle cx="980" cy="160" r="300" fill="url(#wash)"/>
    <circle cx="-80" cy="1200" r="230" fill="${p.pale}" opacity=".6"/>
    ${deco}
    <line x1="80" y1="90" x2="1000" y2="90" stroke="${p.ink}" stroke-opacity=".35"/>
    <text x="80" y="140" font-family="Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="4" fill="${p.accent}">${post.kicker}</text>
    <text x="1000" y="140" text-anchor="end" font-family="Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="2" fill="${p.muted}">1080 / 1350</text>
    ${title}
    <rect x="80" y="${700 + (post.title.length - 3) * 24}" width="95" height="9" rx="4.5" fill="${p.accent2}"/>
    <foreignObject x="80" y="${750 + (post.title.length - 3) * 24}" width="480" height="220"><div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial,sans-serif;font-size:29px;line-height:1.4;font-weight:500;color:${p.muted};">${esc(post.body)}</div></foreignObject>
    ${graphic(post.shape, p)}
    <rect x="80" y="1240" width="920" height="1.5" fill="${p.ink}" opacity=".28"/>
    <text x="80" y="1290" font-family="Arial, sans-serif" font-size="17" font-weight="700" letter-spacing="2.8" fill="${p.ink}">@IDKASOLUTIONS</text>
    <text x="1000" y="1290" text-anchor="end" font-family="Arial, sans-serif" font-size="16" font-weight="700" letter-spacing="1.5" fill="${p.accent}">${post.tag}</text>
  </svg>`;
  
  const fileOut = path.join(OUT, `51-creative-${post.id}.jpg`);
  return sharp(Buffer.from(svg)).jpeg({ quality: 95 }).toFile(fileOut);
}

fs.mkdirSync(OUT, { recursive: true });
Promise.all(posts.map(render)).then(() => console.log(`Generated ${posts.length} pure creative vector IG posts (1080x1350) in ${OUT}`));
