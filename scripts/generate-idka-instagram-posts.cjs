const sharp = require('sharp');
const path = require('path');

const W = 864;
const H = 1152;
const ROOT = path.resolve(__dirname, '..');

const posts = [
  { id: '01', kicker: 'IDKA SOLUTIONS / 01', title: ['Website bukan', 'sekadar', 'pajangan.'], body: 'Ia adalah ruang pertama tempat calon pelanggan mengenal bisnismu.', tag: 'BRAND PRESENCE', theme: 'paper', shape: 'orbit' },
  { id: '02', kicker: 'CATATAN UNTUK UMKM', title: ['Bisnis kecil.', 'Kesan', 'besar.'], body: 'Mulai dari website yang rapi, cepat, dan mudah dihubungi pelanggan.', tag: 'UMKM DIGITAL', theme: 'plum', shape: 'stairs' },
  { id: '03', kicker: 'CHECKLIST WEBSITE', title: ['3 hal yang', 'pelanggan cari', 'lebih dulu.'], body: 'Jelas produknya. Mudah menghubungi. Terlihat tepercaya.', tag: '01 / JELAS   02 / MUDAH   03 / YAKIN', theme: 'cream', shape: 'check' },
  { id: '04', kicker: 'STRATEGI DIGITAL', title: ['Jangan biarkan', 'pelanggan', 'menebak.'], body: 'Website yang baik menjawab: siapa kamu, apa yang kamu tawarkan, dan bagaimana cara memulai.', tag: 'MAKE IT CLEAR', theme: 'orange', shape: 'arrow' },
  { id: '05', kicker: 'IDKA WEB STUDIO', title: ['Dari ide', 'menjadi', 'halaman hidup.'], body: 'Kami merancang pengalaman digital yang terasa tepat untuk cara bisnismu bekerja.', tag: 'DESIGN + BUILD', theme: 'ink', shape: 'wave' },
  { id: '06', kicker: 'WEBSITE TIP', title: ['Tombol WhatsApp', 'bukan hiasan.', 'Itu pintu masuk.'], body: 'Buat pelanggan bisa bertanya ketika minat mereka sedang tinggi.', tag: 'CONVERSION PATH', theme: 'green', shape: 'chat' },
  { id: '07', kicker: 'PORTOFOLIO / REAL WORK', title: ['Karya yang', 'bisa dilihat.', 'Bukan janji.'], body: 'Setiap proyek dimulai dari konteks bisnis, lalu diterjemahkan menjadi pengalaman yang jelas.', tag: 'SEE THE WORK', theme: 'paper', shape: 'frame' },
  { id: '08', kicker: 'PROSES IDKA', title: ['Dengar.', 'Rancang.', 'Luncurkan.'], body: 'Proses yang sederhana membuat keputusan besar terasa lebih ringan.', tag: '01 BRIEF  /  02 BUILD  /  03 GO-LIVE', theme: 'blue', shape: 'path' },
  { id: '09', kicker: 'WEBSITE YANG BAIK', title: ['Cepat dibuka.', 'Mudah', 'dipahami.'], body: 'Karena setiap detik dan setiap kalimat menentukan apakah orang bertahan.', tag: 'PERFORMANCE MATTERS', theme: 'cream', shape: 'speed' },
  { id: '10', kicker: 'FOR PERSONAL BRAND', title: ['Namamu', 'juga perlu', 'punya rumah.'], body: 'Satukan karya, cerita, layanan, dan cara menghubungimu dalam satu tautan yang meyakinkan.', tag: 'PERSONAL SITE', theme: 'plum', shape: 'house' },
  { id: '11', kicker: 'PRODUK IDKA / NGELAMAR', title: ['Kariermu', 'butuh ruang', 'untuk tertata.'], body: 'Ngelamar membantu mencatat proses, memantau status, dan menyiapkan setiap lamaran kerja.', tag: 'PERSONAL CAREER CRM', theme: 'green', shape: 'briefcase' },
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
  const s = `stroke="${p.accent}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"`;
  const light = p.ink === '#fffaf1' ? '#fffaf1' : p.ink;
  const c = `fill="${p.accent2}"`;
  const shapes = {
    orbit: `<ellipse cx="654" cy="769" rx="155" ry="57" ${s}/><ellipse cx="654" cy="769" rx="57" ry="155" ${s}/><circle cx="654" cy="769" r="24" ${c}/><circle cx="506" cy="713" r="11" ${c}/><circle cx="797" cy="825" r="9" ${c}/>`,
    stairs: `<path d="M492 901h86V815h86V729h86V643h86" ${s}/><path d="M739 620l32 23-23 32" ${s}/><circle cx="535" cy="901" r="16" ${c}/><circle cx="621" cy="815" r="16" ${c}/><circle cx="707" cy="729" r="16" ${c}/><circle cx="793" cy="643" r="16" ${c}/>`,
    check: `<circle cx="652" cy="765" r="151" ${s}/><path d="M559 767l61 61 126-151" stroke="${p.accent}" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="777" cy="643" r="12" ${c}/>`,
    arrow: `<path d="M480 862c73-190 188-270 307-201 43 25 58 77 33 117-29 47-102 44-128-3" ${s}/><path d="M684 807l9-32 31 11" ${s}/><circle cx="505" cy="849" r="20" ${c}/>`,
    wave: `<path d="M465 744c55-106 108-106 163 0s108 106 163 0 108-106 163 0" ${s}/><path d="M465 840c55-106 108-106 163 0s108 106 163 0 108-106 163 0" ${s}/><circle cx="552" cy="694" r="12" ${c}/><circle cx="795" cy="887" r="12" ${c}/>`,
    chat: `<path d="M491 670h282a25 25 0 0 1 25 25v154a25 25 0 0 1-25 25H619l-70 58v-58h-58a25 25 0 0 1-25-25V695a25 25 0 0 1 25-25z" ${s}/><path d="M526 733h211M526 777h152" ${s}/><circle cx="747" cy="777" r="12" ${c}/>`,
    frame: `<rect x="493" y="621" width="315" height="233" rx="14" ${s}/><path d="M493 673h315M523 646h8M548 646h8M573 646h8" ${s}/><path d="M534 809l62-61 55 38 59-75 59 98" ${s}/><circle cx="730" cy="730" r="17" ${c}/>`,
    path: `<path d="M491 853c0-116 55-216 142-216 84 0 107 103 171 103 52 0 70-55 70-109" ${s}/><circle cx="491" cy="853" r="19" ${c}/><circle cx="633" cy="637" r="19" ${c}/><circle cx="804" cy="631" r="19" ${c}/>`,
    speed: `<path d="M499 837a158 158 0 0 1 307 0" ${s}/><path d="M652 839l98-116" ${s}/><circle cx="652" cy="839" r="18" ${c}/><path d="M547 769l-35-13M594 702l-19-32M711 702l19-32M757 769l35-13" ${s}/>`,
    house: `<path d="M498 753l153-126 153 126v134H498z" ${s}/><path d="M604 887v-86h95v86M585 735h1M717 735h1" ${s}/><circle cx="766" cy="653" r="14" ${c}/>`,
    briefcase: `<rect x="501" y="688" width="302" height="182" rx="20" ${s}/><path d="M606 688v-37a25 25 0 0 1 25-25h42a25 25 0 0 1 25 25v37M501 756h302M620 756v24h64v-24" ${s}/><circle cx="757" cy="836" r="13" ${c}/>`,
    badge: `<path d="M651 617l43 44 61-2 24 57 56 28-8 61 38 48-38 48 8 61-56 28-24 57-61-2-43 44-43-44-61 2-24-57-56-28 8-61-38-48 38-48-8-61 56-28 24-57 61 2z" ${s}/><circle cx="651" cy="805" r="55" ${s}/><path d="M625 805l18 18 35-43" ${s}/>`,
    map: `<path d="M501 689l99-43 120 43 93-43v205l-93 43-120-43-99 43zM600 646v205M720 689v205" ${s}/><path d="M650 721c-30 0-54 22-54 50 0 41 54 91 54 91s54-50 54-91c0-28-24-50-54-50z" ${s}/><circle cx="650" cy="771" r="13" ${c}/>`,
    hands: `<path d="M505 834c52-15 78-91 118-91 23 0 27 18 18 36l-23 42 60-82c14-18 41-2 30 17l-47 69 64-61c18-17 41 5 23 24l-60 65 65-35c21-12 35 17 13 30l-90 56c-38 24-80 25-116 10z" ${s}/><circle cx="772" cy="682" r="14" ${c}/>`,
    spark: `<path d="M650 633l21 91 91 21-91 21-21 91-21-91-91-21 91-21z" ${s}/><circle cx="780" cy="640" r="14" ${c}/><circle cx="530" cy="885" r="11" ${c}/>`,
  };
  return `<g>${shapes[shape] || shapes.spark}<text x="646" y="1017" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" font-weight="700" letter-spacing="3" fill="${light}" opacity=".72">IDKA / ${shape.toUpperCase()}</text></g>`;
}

function render(post) {
  const p = palettes[post.theme];
  const title = post.title.map((line, index) => `<text x="64" y="${310 + index * 89}" font-family="Georgia, serif" font-size="${index === 1 ? 72 : 68}" font-weight="700" letter-spacing="-2" fill="${p.ink}">${esc(line)}</text>`).join('');
  const deco = post.theme === 'paper' || post.theme === 'cream'
    ? `<path d="M0 110 C185 15 328 205 500 116s243 27 364-89" stroke="${p.accent}" stroke-width="2" fill="none" opacity=".32"/>`
    : `<path d="M0 110 C185 15 328 205 500 116s243 27 364-89" stroke="${p.accent2}" stroke-width="2" fill="none" opacity=".45"/>`;
  const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 .06"/></feComponentTransfer></filter>
      <linearGradient id="wash" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p.accent}" stop-opacity=".2"/><stop offset="1" stop-color="${p.accent2}" stop-opacity=".04"/></linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="${p.bg}"/>
    <rect width="100%" height="100%" filter="url(#noise)"/>
    <circle cx="820" cy="128" r="245" fill="url(#wash)"/>
    <circle cx="-70" cy="1035" r="188" fill="${p.pale}" opacity=".58"/>
    ${deco}
    <line x1="64" y1="74" x2="800" y2="74" stroke="${p.ink}" stroke-opacity=".35"/>
    <text x="64" y="116" font-family="Arial, sans-serif" font-size="15" font-weight="700" letter-spacing="3.2" fill="${p.accent}">${post.kicker}</text>
    <text x="800" y="116" text-anchor="end" font-family="Arial, sans-serif" font-size="15" font-weight="700" letter-spacing="2" fill="${p.muted}">864 / 1152</text>
    ${title}
    <rect x="64" y="${592 + (post.title.length - 3) * 20}" width="76" height="7" rx="3.5" fill="${p.accent2}"/>
    <foreignObject x="64" y="${632 + (post.title.length - 3) * 20}" width="390" height="170"><div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial,sans-serif;font-size:25px;line-height:1.38;font-weight:500;color:${p.muted};">${esc(post.body)}</div></foreignObject>
    ${graphic(post.shape, p)}
    <rect x="64" y="1050" width="736" height="1" fill="${p.ink}" opacity=".26"/>
    <text x="64" y="1090" font-family="Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="2.2" fill="${p.ink}">@IDKASOLUTIONS</text>
    <text x="800" y="1090" text-anchor="end" font-family="Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="1.2" fill="${p.accent}">${post.tag}</text>
  </svg>`;
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9, palette: false }).toFile(path.join(ROOT, `idka-instagram-${post.id}.png`));
}

Promise.all(posts.map(render)).then(() => console.log(`Generated ${posts.length} PNG posts in ${ROOT}`));
