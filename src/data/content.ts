// IDKA Solutions - Content Data

export const company = {
  name: 'IDKA Solutions',
  tagline: 'Website Profesional untuk Bisnis',
  description: 'Kami membantu UMKM, personal brand, dan startup membangun website modern yang siap mendukung bisnis.',
  whatsapp: '6282245964007',
  email: 'idkasolutions@gmail.com',
  instagram: '@idkasolutions',
  position: 'Mitra digital untuk bisnis yang ingin tampil profesional di internet.',
};

export const stats = [
  { num: '6', label: 'Proyek', labelAlt: 'Website Selesai' },
  { num: '4.9/5', label: 'Rating Klien', labelAlt: 'Rating Klien' },
  { num: '4', label: 'Anggota Tim', labelAlt: 'Anggota Tim' },
];

export const services = [
  {
    id: 'website-profil',
    icon: '🏢',
    title: 'Website Profil',
    description: 'Company profile, portofolio, personal brand, atau landing page untuk bisnis dan profesional.',
  },
  {
    id: 'website-katalog',
    icon: '🛒',
    title: 'Website Katalog & Toko',
    description: 'Toko online dengan katalog produk dan pemesanan WhatsApp yang mudah digunakan.',
  },
  {
    id: 'website-kustom',
    icon: '⚡',
    title: 'Website Kustom',
    description: 'Aplikasi web, sistem informasi, atau website dengan fitur sesuai kebutuhan.',
  },
  {
    id: 'maintenance',
    icon: '🔧',
    title: 'Maintenance & Optimasi',
    description: 'Pemeliharaan rutin, update konten, dan optimasi performa website.',
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
      '1-2x revisi',
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
      '3-5 halaman lengkap',
      'Beranda, Tentang, Layanan',
      'Portofolio / Galeri',
      'Form kontak',
      'SEO dasar',
      'Mobile-friendly',
      '2-3x revisi',
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
      '5-8 halaman kustom',
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
    name: 'Maintenance',
    price: 'Rp 150.000/bln',
    features: [
      'Update konten & produk',
      'Backup rutin & keamanan',
      'Pemantauan performa',
      'Perbaikan error ringan',
      'Laporan bulanan',
      'Konsultasi ringan',
    ],
  },
];

export const portfolio = [
  {
    id: 1,
    title: 'Pentagon Kontraktor',
    category: 'Company Profile',
    period: 'Feb - Mar 2026',
    screenshot: '/portfolio/pentagon-kontraktor.webp',
    url: 'https://pentagonkontraktor.netlify.app',
    description: 'Company profile untuk CV. Pentagon Konstruksindo, perusahaan konstruksi dan arsitektur.',
    longDescription: 'Website menampilkan layanan, portofolio, legalitas, dan halaman konsultasi. Dibangun dengan React JS, cepat dan responsif.',
    tech: ['React JS', 'Netlify'],
    tags: ['Company Profile', 'Konstruksi', 'Arsitektur'],
    color: '#f59e0b',
    icon: '🏗️',
  },
  {
    id: 2,
    title: 'Cidika Travel',
    category: 'Company Profile',
    period: 'Sep - Nov 2025',
    screenshot: '/portfolio/cidika-travel.webp',
    url: 'https://cidikatravel.com',
    description: 'Website agen travel CIDIKA untuk destinasi Banyuwangi dan Nusa Penida.',
    longDescription: 'Menampilkan destinasi, paket wisata, FAQ, dan kontak WhatsApp. Antarmuka bilingual. Dibangun dengan React JS dan Supabase.',
    tech: ['React JS', 'Supabase', 'PostgreSQL', 'Bilingual'],
    tags: ['Travel', 'Company Profile', 'Full Stack'],
    color: '#06b6d4',
    icon: '✈️',
  },
  {
    id: 3,
    title: 'Nutri Bunga',
    category: 'Landing Page',
    period: 'Okt - Nov 2025',
    screenshot: '/portfolio/nutri-bunga.webp',
    url: 'https://nutribunga.netlify.app',
    description: 'Landing page untuk Nutri Bunga, brand madu premium bersertifikat BPOM dan Halal.',
    longDescription: 'Menampilkan produk unggulan, informasi brand, FAQ, dan pemesanan via WhatsApp. Selesai dalam 2 minggu.',
    tech: ['React JS', 'Netlify'],
    tags: ['Landing Page', 'UMKM', 'Produk Lokal'],
    color: '#f59e0b',
    icon: '🍯',
  },
  {
    id: 4,
    title: 'Imzaqi Store',
    category: 'Aplikasi E-Commerce',
    period: 'Jan - Feb 2026',
    screenshot: '/portfolio/imzaqi-store.webp',
    url: 'https://imzaqi.store',
    description: 'Platform e-commerce akun digital untuk pelajar Indonesia dengan pembayaran QRIS.',
    longDescription: 'Katalog 20+ produk, pencarian, dan alur pembelian singkat. Dilengkapi panel admin dan dukungan PWA.',
    tech: ['React 19', 'Supabase', 'Framer Motion', 'Gemini API', 'QRIS', 'PWA'],
    tags: ['E-Commerce', 'Full Stack', 'Pelajar'],
    color: '#5e17eb',
    icon: '🛒',
  },
  {
    id: 5,
    title: 'Jamu Sugih Waras',
    category: 'Full Stack Web App',
    period: 'Jul - Sep 2025',
    screenshot: '/portfolio/jamu-sugih-waras.webp',
    url: 'https://jamu-sugih-waras.netlify.app',
    description: 'Website untuk Rumah Rempah Sugih Waras, UMKM jamu tradisional dari Malang.',
    longDescription: 'Menampilkan katalog produk, testimoni, FAQ, pemesanan WhatsApp, dan panel admin.',
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
    description: 'Landing page untuk Jakora, brand pangan inovatif dari Padang.',
    longDescription: 'Menampilkan produk, testimoni, donasi, FAQ, dan live chat WhatsApp.',
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
    role: 'Owner, CIDIKA Travel',
    business: 'cidikatravel.com',
    avatar: '✈️',
    content: 'Website kami kini tampil lebih profesional. Banyak wisatawan langsung menghubungi. Tim IDKA responsif dan hasilnya sesuai kebutuhan.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Pak Rizal',
    role: 'Direktur, CV. Pentagon Konstruksindo',
    business: 'pentagonkontraktor.netlify.app',
    avatar: '🏗️',
    content: 'Company profile kami jauh lebih kredibel. Calon klien datang dengan kesan yang lebih baik. IDKA memahami kebutuhan kami.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ibu Sari',
    role: 'Pemilik, Nutri Bunga',
    business: 'nutribunga.netlify.app',
    avatar: '🍯',
    content: 'Selesai dalam dua minggu dan langsung bisa dipakai promosi. Tampilan bersih, cepat, dan memudahkan pelanggan menemukan produk kami.',
    rating: 5,
  },
];

export const teamMembers = [
  {
    id: 1,
    name: 'Ahmad Abror Rozaqi Fatoni',
    role: 'Quality Assurance + Full Stack Developer',
    description:
      'Menjaga kualitas produk dan ikut mengembangkan fitur end-to-end agar website stabil dan siap production.',
    photo: '/team/ahmad-abror-rozaqi-fatoni.webp?v=6',
  },
  {
    id: 2,
    name: "Fa'iz Abiyu Atha Fawas",
    role: 'Full Stack Developer',
    description:
      'Membangun frontend dan backend, integrasi form/WhatsApp/CMS, hingga website siap go-live.',
    photo: '/team/faiz-abiyu-atha-fawas.webp?v=6',
  },
  {
    id: 3,
    name: 'Ervan Dwi Ardian',
    role: 'UI/UX',
    description:
      'Merancang wireframe, antarmuka, dan pengalaman pengguna yang rapi serta mudah digunakan.',
    photo: '/team/ervan-dwi-ardian.webp?v=6',
  },
  {
    id: 4,
    name: 'Agta Fadjrin Aminullah',
    role: 'System Analyst',
    description:
      'Menganalisis kebutuhan sistem, merancang alur solusi, dan menyelaraskan brief klien dengan implementasi teknis.',
    photo: '/team/agta-fadjrin-aminullah.webp?v=6',
  },
];

/** Produk digital internal — coming soon */
export const products = [
  {
    id: 'dashboard-umkm',
    title: 'Dashboard UMKM',
    tagline: 'Pantau penjualan, stok, dan performa bisnis dalam satu layar.',
    status: 'Coming Soon',
    icon: '📊',
    accent: 'blue',
  },
  {
    id: 'ngelamar',
    title: 'Ngelamar',
    tagline: 'Career CRM untuk mencatat, memantau, dan menyiapkan setiap lamaran kerja dari satu aplikasi.',
    status: 'Coming Soon',
    icon: '💼',
    accent: 'emerald',
  },
];

export const techStack = [
  { name: 'React', category: 'frontend', icon: '⚛️' },
  { name: 'TypeScript', category: 'frontend', icon: '🔷' },
  { name: 'WordPress', category: 'cms', icon: '📝' },
  { name: 'Supabase', category: 'backend', icon: '🗄️' },
  { name: 'Figma', category: 'design', icon: '✏️' },
  { name: 'Netlify', category: 'deploy', icon: '🚀' },
];

export const workValues = [
  {
    icon: '✅',
    title: 'Proses Sederhana',
    description: 'Alur kerja jelas. Anda siapkan materi, kami tangani pengerjaan.',
  },
  {
    icon: '🤝',
    title: 'Transparan',
    description: 'Harga, revisi, dan tahapan kerja disampaikan di awal.',
  },
  {
    icon: '⚡',
    title: 'Respons Cepat',
    description: 'Komunikasi dibalas pada jam kerja agar progress tetap jalan.',
  },
  {
    icon: '🎯',
    title: 'Berorientasi Hasil',
    description: 'Website dirancang untuk mendukung kredibilitas dan konversi bisnis.',
  },
];

export const businessFlow = [
  { step: 1, label: 'Ceritakan Kebutuhan', icon: '💬', description: 'Hubungi kami via WhatsApp, form, atau Instagram. Konsultasi pertama gratis.' },
  { step: 2, label: 'Kami Kerjakan', icon: '💻', description: 'Kami desain, bangun, dan revisi website sesuai kebutuhan bisnis kamu.' },
  { step: 3, label: 'Website Live', icon: '🚀', description: 'Domain aktif, website online, bisnis siap tampil profesional.' },
];

export const faq = [
  {
    question: 'Berapa lama pengerjaan website?',
    answer: 'Starter 3-5 hari kerja, Business 7-14 hari, Premium 14-21 hari. Durasi tergantung kelengkapan materi klien.',
  },
  {
    question: 'Berapa kali revisi?',
    answer: 'Starter 1-2 kali, Business 2-3 kali, Premium lebih fleksibel. Revisi di luar kuota dikenakan biaya.',
  },
  {
    question: 'Apakah konten harus disiapkan sendiri?',
    answer: 'Sebaiknya ya. Kami bisa bantu copywriting dasar dan pemilihan visual jika diperlukan.',
  },
  {
    question: 'Bagaimana sistem pembayarannya?',
    answer: 'DP 50% sebelum pengerjaan, pelunasan 50% sebelum go-live. Via transfer bank, QRIS, atau e-wallet.',
  },
  {
    question: 'Bagaimana dengan domain dan hosting?',
    answer: 'Kami bantu proses penyiapan. Biaya domain dan hosting terpisah dari paket.',
  },
  {
    question: 'Apakah ada dukungan setelah live?',
    answer: 'Ya. Tersedia paket maintenance bulanan untuk performa, keamanan, dan update konten.',
  },
];
