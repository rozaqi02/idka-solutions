// IDKA Solutions - Content Data
// Tone: profesional, ringkas, jelas

export const company = {
  name: 'IDKA Solutions',
  tagline: 'Website Profesional untuk Bisnis yang Dipercaya',
  description:
    'IDKA Solutions membantu UMKM, personal brand, dan startup membangun website modern yang fungsional dan siap mendukung pertumbuhan bisnis.',
  whatsapp: '6282245964007',
  email: 'idkasolutions@gmail.com',
  instagram: '@idkasolutions',
  position:
    'Mitra digital untuk UMKM, personal brand, kreator, dan startup yang ingin tampil profesional di internet.',
};

export const stats = [
  { num: '6', label: 'Proyek', labelAlt: 'Website Selesai' },
  { num: '4.9/5', label: 'Rating Klien', labelAlt: 'Rating Klien' },
  { num: '4', label: 'Tim Ahli', labelAlt: 'Tim Ahli' },
];

export const services = [
  {
    id: 'company-profile',
    icon: '🏢',
    title: 'Company Profile',
    description:
      'Website profil perusahaan yang memperkuat kredibilitas dan kesan profesional di mata calon klien.',
  },
  {
    id: 'landing-page',
    icon: '🚀',
    title: 'Landing Page',
    description:
      'Satu halaman fokus konversi untuk promosi produk, event, atau kampanye peluncuran.',
  },
  {
    id: 'toko-online',
    icon: '🛒',
    title: 'Toko Online',
    description:
      'Katalog produk terstruktur dengan tombol pemesanan WhatsApp yang memudahkan transaksi.',
  },
  {
    id: 'portofolio',
    icon: '🎨',
    title: 'Website Portofolio',
    description:
      'Tampilan karya yang rapi untuk fotografer, desainer, kreator, dan freelancer.',
  },
  {
    id: 'jasa-profesional',
    icon: '💼',
    title: 'Website Jasa',
    description:
      'Presentasi layanan yang jelas agar calon klien memahami nilai bisnis Anda sejak awal.',
  },
  {
    id: 'katalog-produk',
    icon: '📦',
    title: 'Katalog Produk',
    description:
      'Susunan produk yang rapi, mudah ditelusuri, dan nyaman dilihat di perangkat apa pun.',
  },
  {
    id: 'personal-brand',
    icon: '⭐',
    title: 'Personal Brand',
    description:
      'Website personal untuk coach, konsultan, dan content creator yang ingin memperkuat otoritas digital.',
  },
  {
    id: 'website-event',
    icon: '🎉',
    title: 'Website Event',
    description:
      'Informasi event yang lengkap, alur registrasi yang jelas, dan tampilan yang profesional.',
  },
  {
    id: 'maintenance',
    icon: '🔧',
    title: 'Maintenance',
    description:
      'Pemeliharaan rutin agar website tetap cepat, aman, dan stabil setelah diluncurkan.',
  },
];

export const packages = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Untuk memulai kehadiran online',
    price: 'Mulai Rp 300.000',
    highlighted: false,
    features: [
      '1 halaman landing page',
      'Tombol WhatsApp',
      'Profil singkat bisnis',
      'Tampilan produk/layanan',
      'Kontak & lokasi',
      'Mobile-friendly',
      '1–2x revisi',
    ],
    cta: 'Pilih Starter',
  },
  {
    id: 'business',
    name: 'Business',
    tagline: 'Untuk tampilan bisnis yang lebih lengkap',
    price: 'Mulai Rp 900.000',
    highlighted: true,
    features: [
      '3–5 halaman lengkap',
      'Beranda, Tentang, Layanan',
      'Portofolio / Galeri',
      'Form kontak',
      'SEO dasar',
      'Mobile-friendly',
      '2–3x revisi',
    ],
    cta: 'Pilih Business',
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Untuk kebutuhan kustom dan pengembangan lanjutan',
    price: 'Mulai Rp 1.700.000',
    highlighted: false,
    features: [
      '5–8 halaman kustom',
      'Desain sesuai brand',
      'CMS (kelola konten mandiri)',
      'Katalog produk',
      'Blog & analytics',
      'Optimasi performa',
      'Dukungan awal peluncuran',
    ],
    cta: 'Pilih Premium',
  },
];

export const maintenancePackages = [
  {
    name: 'Basic',
    price: 'Rp 150.000/bln',
    features: [
      'Pemeriksaan website bulanan',
      'Update konten ringan',
      'Backup rutin',
      'Perbaikan error ringan',
    ],
  },
  {
    name: 'Standard',
    price: 'Rp 300.000/bln',
    features: [
      'Semua fitur Basic',
      'Update konten lebih luas',
      'Laporan bulanan',
      'Optimasi ringan',
      'Pemantauan form & tautan',
    ],
  },
  {
    name: 'Premium',
    price: 'Rp 500.000/bln',
    features: [
      'Semua fitur Standard',
      'Dukungan prioritas',
      'Update desain minor',
      'Optimasi performa',
      'Konsultasi bulanan',
      'Penambahan section ringan',
    ],
  },
];

export const portfolio = [
  {
    id: 1,
    title: 'Pentagon Kontraktor',
    category: 'Company Profile',
    period: 'Februari 2026 – Maret 2026',
    screenshot: '/portfolio/pentagon-kontraktor.webp',
    url: 'https://pentagonkontraktor.netlify.app',
    description:
      'Website company profile untuk CV. Pentagon Konstruksindo, perusahaan konstruksi dan arsitektur.',
    longDescription:
      'CV. Pentagon Konstruksindo menangani proyek dari desain hingga serah terima. Website menampilkan layanan, portofolio, legalitas, dan halaman konsultasi dengan desain yang mencerminkan profesionalisme. Dibangun dengan React JS, cepat, dan responsif di berbagai perangkat.',
    tech: ['React JS', 'Netlify'],
    tags: ['Company Profile', 'Konstruksi', 'Arsitektur'],
    color: '#f59e0b',
    icon: '🏗️',
  },
  {
    id: 2,
    title: 'Cidika Travel',
    category: 'Company Profile',
    period: 'September 2025 – November 2025',
    screenshot: '/portfolio/cidika-travel.webp',
    url: 'https://cidikatravel.com',
    description:
      'Website agen travel CIDIKA untuk destinasi Banyuwangi dan Nusa Penida, dengan paket private trip, open trip, dan charter.',
    longDescription:
      'CIDIKA Travel berbasis di Nusa Penida, Bali. Website menampilkan destinasi, paket, FAQ, dan kontak WhatsApp. Antarmuka bilingual (Indonesia & Inggris). Dibangun dengan React JS dan Supabase.',
    tech: ['React JS', 'Supabase', 'PostgreSQL', 'Bilingual'],
    tags: ['Travel', 'Company Profile', 'Full Stack'],
    color: '#06b6d4',
    icon: '✈️',
  },
  {
    id: 3,
    title: 'Nutri Bunga',
    category: 'Landing Page',
    period: 'Oktober 2025 – November 2025',
    screenshot: '/portfolio/nutri-bunga.webp',
    url: 'https://nutribunga.netlify.app',
    description:
      'Landing page dan katalog digital untuk Nutri Bunga, brand madu premium bersertifikat BPOM dan Halal dari Malang.',
    longDescription:
      'Nutri Bunga telah lebih dari 10 tahun di industri madu. Website menampilkan produk unggulan, informasi brand, FAQ, dan pemesanan via WhatsApp. Diselesaikan dalam 2 minggu dengan React JS.',
    tech: ['React JS', 'Netlify'],
    tags: ['Landing Page', 'UMKM', 'Produk Lokal'],
    color: '#f59e0b',
    icon: '🍯',
  },
  {
    id: 4,
    title: 'Imzaqi Store',
    category: 'Aplikasi E-Commerce',
    period: 'Januari 2026 – Februari 2026',
    screenshot: '/portfolio/imzaqi-store.webp',
    url: 'https://imzaqi.store',
    description:
      'Platform e-commerce akun digital untuk pelajar Indonesia, dengan pembayaran QRIS dan asisten AI.',
    longDescription:
      'Imzaqi Store v5.0 menyasar segmen pelajar dengan katalog 20+ produk, pencarian, dan alur pembelian singkat. Dibangun dengan React 19, Supabase, Framer Motion, dan Gemini API. Dilengkapi panel admin serta dukungan PWA.',
    tech: ['React 19', 'Supabase', 'Framer Motion', 'Gemini API', 'QRIS', 'PWA'],
    tags: ['E-Commerce', 'Full Stack', 'Pelajar'],
    color: '#5e17eb',
    icon: '🛒',
  },
  {
    id: 5,
    title: 'Jamu Sugih Waras',
    category: 'Full Stack Web App',
    period: 'Juli 2025 – September 2025',
    screenshot: '/portfolio/jamu-sugih-waras.webp',
    url: 'https://jamu-sugih-waras.netlify.app',
    description:
      'Website bisnis untuk Rumah Rempah Sugih Waras, UMKM jamu tradisional dari Malang.',
    longDescription:
      'Website menampilkan katalog produk, testimoni, FAQ, pemesanan WhatsApp, dan panel admin. Dibangun dengan React JS dan Supabase (PostgreSQL).',
    tech: ['React JS', 'Supabase', 'PostgreSQL'],
    tags: ['Full Stack', 'UMKM', 'Herbal'],
    color: '#84cc16',
    icon: '🌿',
  },
  {
    id: 6,
    title: 'Jakora',
    category: 'Landing Page',
    period: '2026',
    screenshot: '/portfolio/jakora.webp',
    url: 'https://jakora.netlify.app',
    description:
      'Landing page untuk Jakora, brand pangan inovatif dari Padang (rendang jamur dan snack Jatastik).',
    longDescription:
      'Jakora adalah social enterprise di Kota Padang. Website menampilkan produk, testimoni, donasi, FAQ, dan live chat WhatsApp. Dibangun dengan React JS dan di-deploy di Netlify.',
    tech: ['React JS', 'Netlify'],
    tags: ['Landing Page', 'UMKM', 'Pangan'],
    color: '#22c55e',
    icon: '🍄',
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Pak Dedi',
    role: 'Owner — CIDIKA Travel',
    business: 'cidikatravel.com',
    avatar: '✈️',
    content:
      'Website kami kini tampil lebih profesional. Banyak wisatawan yang langsung menghubungi. Tim IDKA responsif dan hasilnya sesuai kebutuhan.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Pak Rizal',
    role: 'Direktur — CV. Pentagon Konstruksindo',
    business: 'pentagonkontraktor.netlify.app',
    avatar: '🏗️',
    content:
      'Company profile kami jauh lebih kredibel. Calon klien datang dengan kesan yang lebih baik sejak awal. IDKA memahami kebutuhan kami dengan baik.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ibu Sari',
    role: 'Pemilik — Nutri Bunga',
    business: 'nutribunga.netlify.app',
    avatar: '🍯',
    content:
      'Selesai dalam dua minggu dan langsung dapat digunakan untuk promosi. Tampilan bersih, cepat, dan memudahkan pelanggan menemukan produk kami.',
    rating: 5,
  },
];

export const teamMembers = [
  {
    id: 1,
    name: 'Project Manager',
    role: 'Strategist & Client Relations',
    description:
      'Mengelola brief, timeline, dan komunikasi klien dari awal hingga website live.',
    icon: '🎯',
  },
  {
    id: 2,
    name: 'UI/UX Designer',
    role: 'Visual & Experience Designer',
    description:
      'Merancang wireframe, mockup, dan desain final yang rapi serta mudah digunakan.',
    icon: '🎨',
  },
  {
    id: 3,
    name: 'Web Developer',
    role: 'Frontend & Backend Engineer',
    description:
      'Membangun website, integrasi form/WhatsApp/CMS, hingga proses go-live.',
    icon: '💻',
  },
  {
    id: 4,
    name: 'Content & Admin',
    role: 'Content Creator & Admin',
    description:
      'Mengelola konten pendukung, portofolio, testimoni, dan komunikasi operasional.',
    icon: '✍️',
  },
];

export const techStack = [
  { name: 'React', category: 'frontend', icon: '⚛️' },
  { name: 'Next.js', category: 'frontend', icon: '▲' },
  { name: 'TypeScript', category: 'frontend', icon: '🔷' },
  { name: 'Tailwind CSS', category: 'frontend', icon: '🎨' },
  { name: 'WordPress', category: 'cms', icon: '📝' },
  { name: 'Node.js', category: 'backend', icon: '🟢' },
  { name: 'Supabase', category: 'backend', icon: '🗄️' },
  { name: 'Figma', category: 'design', icon: '✏️' },
  { name: 'Webflow', category: 'nocode', icon: '🌊' },
  { name: 'Netlify', category: 'deploy', icon: '🚀' },
  { name: 'Vite', category: 'frontend', icon: '⚡' },
  { name: 'Framer Motion', category: 'frontend', icon: '🎬' },
];

export const workValues = [
  {
    icon: '✅',
    title: 'Proses Sederhana',
    description: 'Alur kerja jelas. Anda menyiapkan materi, kami menangani pengerjaan.',
  },
  {
    icon: '🤝',
    title: 'Transparan',
    description: 'Harga, ruang revisi, dan tahapan kerja disampaikan di awal.',
  },
  {
    icon: '⚡',
    title: 'Respons Cepat',
    description: 'Komunikasi dibalas pada jam kerja agar progress tetap jelas.',
  },
  {
    icon: '🎯',
    title: 'Berorientasi Hasil',
    description: 'Website dirancang untuk mendukung kredibilitas dan konversi bisnis.',
  },
];

export const businessFlow = [
  { step: 1, label: 'Kontak', icon: '💬', description: 'Hubungi kami melalui WhatsApp, formulir, atau Instagram.' },
  { step: 2, label: 'Brief', icon: '📋', description: 'Sampaikan kebutuhan, tujuan, dan materi bisnis Anda.' },
  { step: 3, label: 'Proposal', icon: '📄', description: 'Kami kirim ruang lingkup, timeline, dan penawaran.' },
  { step: 4, label: 'DP & Mulai', icon: '💸', description: 'Setelah kesepakatan dan DP, pengerjaan dimulai.' },
  { step: 5, label: 'Desain', icon: '🎨', description: 'Wireframe dan mockup dikirim untuk persetujuan.' },
  { step: 6, label: 'Development', icon: '💻', description: 'Desain diimplementasikan menjadi website aktif.' },
  { step: 7, label: 'Review', icon: '🔍', description: 'Anda meninjau staging, kami menindaklanjuti revisi.' },
  { step: 8, label: 'Live', icon: '🚀', description: 'Pelunasan, pengaturan domain, dan website diluncurkan.' },
];

export const faq = [
  {
    question: 'Berapa lama pengerjaan website?',
    answer:
      'Perkiraan: Starter 3–5 hari kerja, Business 7–14 hari kerja, Premium 14–21 hari kerja. Durasi dipengaruhi kelengkapan materi dari klien.',
  },
  {
    question: 'Berapa kali revisi yang tersedia?',
    answer:
      'Starter 1–2 kali, Business 2–3 kali, Premium lebih fleksibel. Revisi di luar kuota dikenakan biaya sesuai kesepakatan awal.',
  },
  {
    question: 'Apakah konten harus disiapkan sendiri?',
    answer:
      'Idealnya teks, foto, dan logo disiapkan klien. Kami dapat membantu copywriting dasar dan pemilihan materi visual jika diperlukan.',
  },
  {
    question: 'Bagaimana sistem pembayarannya?',
    answer:
      'Umumnya DP 50% sebelum pengerjaan dan pelunasan 50% sebelum go-live. Pembayaran dapat melalui transfer bank, QRIS, atau e-wallet.',
  },
  {
    question: 'Bagaimana dengan domain dan hosting?',
    answer:
      'Kami dapat membantu proses penyiapan. Biaya domain dan hosting terpisah dari paket website, dengan rekomendasi sesuai kebutuhan.',
  },
  {
    question: 'Apakah ada dukungan setelah website live?',
    answer:
      'Ya. Tersedia paket maintenance bulanan (Basic, Standard, Premium) untuk menjaga performa, keamanan, dan pembaruan konten.',
  },
];
