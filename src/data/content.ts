// IDKA Solutions - Content Data
// Copywriting target: Gen-Z Indonesia (18-28 tahun)

export const company = {
  name: 'IDKA Solutions',
  tagline: 'Website Keren, Bisnis Makin Dipercaya',
  description:
    'IDKA Solutions bantu bisnis kamu hadir secara online dengan website yang nggak cuma cantik—tapi beneran ngasih hasil. No ribet, no boring, full profesional.',
  whatsapp: '6282245964007',
  email: 'idkasolutions@gmail.com',
  instagram: '@idkasolutions',
  position:
    'Partner digital untuk UMKM, personal brand, kreator, dan startup yang pengen eksis dan dipercaya di internet.',
};

// Stats terpusat — update di sini, otomatis sinkron ke semua halaman
export const stats = [
  { num: '6',  label: 'Proyek',      labelAlt: 'Website Jadi' },
  { num: '4.9/5', label: 'Rating Klien', labelAlt: 'Rating Klien' },
  { num: '4',    label: 'Tim Ahli',    labelAlt: 'Tim Ahli' },
];

export const services = [
  {
    id: 'company-profile',
    icon: '🏢',
    title: 'Company Profile',
    description:
      'Biar bisnis kamu keliatan legit dan dipercaya. Website company profile yang bikin calon klien langsung yakin.',
  },
  {
    id: 'landing-page',
    icon: '🚀',
    title: 'Landing Page',
    description:
      'Satu halaman yang kerja keras buat konversi. Cocok buat jualan produk, daftar event, atau launch sesuatu.',
  },
  {
    id: 'toko-online',
    icon: '🛒',
    title: 'Toko Online',
    description:
      'Katalog produk online yang rapi + tombol order WA langsung. Pelanggan liat, suka, langsung chat—simpel.',
  },
  {
    id: 'portofolio',
    icon: '🎨',
    title: 'Website Portofolio',
    description:
      'Flex karya kamu dengan cara yang paling keren. Cocok buat fotografer, desainer, kreator, atau freelancer.',
  },
  {
    id: 'jasa-profesional',
    icon: '💼',
    title: 'Website Jasa',
    description:
      'Tampilin layanan kamu biar calon klien ngerti value kamu sebelum bahkan ngobrol sama kamu.',
  },
  {
    id: 'katalog-produk',
    icon: '📦',
    title: 'Katalog Produk',
    description:
      'Semua produk kamu tersusun rapi, gampang dicari, enak diliat. No scroll panjang yang bikin pusing.',
  },
  {
    id: 'personal-brand',
    icon: '⭐',
    title: 'Personal Brand',
    description:
      'Build authority kamu di dunia digital. Dari coach, konsultan, sampai content creator—semua butuh ini.',
  },
  {
    id: 'website-event',
    icon: '🎉',
    title: 'Website Event',
    description:
      'Bikin event kamu keliatan serius dan profesional. Info lengkap, registrasi mudah, kesan pertama mantap.',
  },
  {
    id: 'maintenance',
    icon: '🔧',
    title: 'Maintenance',
    description:
      'Website udah jadi? Kami jaga biar tetap ngebut, aman, dan nggak tiba-tiba error pas lagi rame.',
  },
];

export const packages = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Buat yang baru mau mulai online',
    price: 'Mulai Rp 300.000',
    highlighted: false,
    features: [
      '1 halaman landing page',
      'Tombol WA langsung',
      'Profil singkat bisnis',
      'Tampilan produk/layanan',
      'Kontak & lokasi',
      'Mobile-friendly',
      '1-2x revisi',
    ],
    cta: 'Gas Pakai Starter',
  },
  {
    id: 'business',
    name: 'Business',
    tagline: 'Buat yang mau keliatan makin serius',
    price: 'Mulai Rp 900.000',
    highlighted: true,
    features: [
      '3-5 halaman lengkap',
      'Beranda, Tentang, Layanan',
      'Portofolio / Galeri',
      'Form kontak',
      'Basic SEO biar ketemuan di Google',
      'Mobile-friendly',
      '2-3x revisi',
    ],
    cta: 'Pilih Business',
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Buat bisnis yang mau scale up',
    price: 'Mulai Rp 1.700.000',
    highlighted: false,
    features: [
      '5-8 halaman full custom',
      'Desain unik sesuai brand',
      'CMS (bisa edit sendiri)',
      'Katalog produk',
      'Blog & analytics',
      'Optimasi performa',
      'Support awal launch',
    ],
    cta: 'Mau yang Premium',
  },
];

export const maintenancePackages = [
  {
    name: 'Basic',
    price: 'Rp 150.000/bln',
    features: [
      'Cek website tiap bulan',
      'Update konten kecil',
      'Backup rutin',
      'Fix error ringan',
    ],
  },
  {
    name: 'Standard',
    price: 'Rp 300.000/bln',
    features: [
      'Semua yang ada di Basic',
      'Update konten lebih banyak',
      'Laporan bulanan',
      'Optimasi ringan',
      'Pantau form & link',
    ],
  },
  {
    name: 'Premium',
    price: 'Rp 500.000/bln',
    features: [
      'Semua yang ada di Standard',
      'Support prioritas (respon cepat)',
      'Update desain minor',
      'Optimasi performa',
      'Konsultasi bulanan',
      'Tambah section ringan',
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
      'Website company profile keren buat CV. Pentagon Konstruksindo—perusahaan konstruksi & arsitektur yang sekarang makin gampang ditemukan dan dipercaya calon kliennya.',
    longDescription:
      'CV. Pentagon Konstruksindo handle proyek dari desain sampai serah terima kunci. Website nampilin layanan lengkap (arsitektur, konstruksi sipil, interior, renovasi), portofolio proyek, legalitas, dan halaman konsultasi. Desain elegan mencerminkan nilai profesionalisme perusahaan. Dibangun pakai React JS, performa cepat dan responsif di semua perangkat.',
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
      'Website agen travel CIDIKA buat wisata ke Banyuwangi & Nusa Penida—paket private trip, open trip, dan charter. Tampilannya bilingual, elegan, dan bikin pengen langsung booking.',
    longDescription:
      'CIDIKA Travel berbasis di Nusa Penida, Bali, menawarkan paket ke Kawah Ijen, blue fire Banyuwangi, Kelingking Beach, dan snorkeling Nusa Penida. Website nampilin destinasi, paket & harga, FAQ, dan kontak WA langsung. UI bilingual (Indonesia & English) buat wisatawan lokal dan mancanegara. React JS + Supabase BaaS (PostgreSQL) untuk data real-time.',
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
      'Landing page + katalog digital buat Nutri Bunga, brand madu premium bersertifikat BPOM & Halal dari Malang. Selesai 2 minggu, langsung ready buat promosi.',
    longDescription:
      'Nutri Bunga udah 10+ tahun di industri madu, bersertifikasi BPOM MD, Halal, dan uji lab Sucofindo. Website nampilin produk unggulan (Madu Propolis, Madu Premium, Royal Jelly), info brand, FAQ, dan order via WA. Dibangun 2 minggu pakai React JS dengan fokus UX yang engaging buat pasar digital menengah ke atas.',
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
      'Platform e-commerce akun digital premium (Netflix, Spotify, Canva, ChatGPT, dll.) untuk pelajar Indonesia—bayar QRIS, aktif dalam hitungan menit, ada AI assistant-nya juga.',
    longDescription:
      'Imzaqi Store v5.0 adalah toko akun digital yang menyasar segmen pelajar dengan harga terjangkau. Katalog 20+ produk dengan search, live traffic counter, dan highlight produk viral. Alur beli cuma 3 langkah: pilih, bayar QRIS (semua e-wallet), pantau status lewat ID unik. Dibangun pakai React 19, Vite, Supabase, Framer Motion, dan Google Gemini API buat AI assistant-nya. Admin bisa manage produk, promo, flash sale, ekspor CSV—semua dilindungi Supabase Auth. PWA-ready.',
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
      'Website bisnis buat Rumah Rempah Sugih Waras—UMKM jamu tradisional dari Malang yang ngemas rempah Nusantara jadi lebih modern, praktis, dan siap jualan online.',
    longDescription:
      'Rumah Rempah Sugih Waras adalah UMKM di Kalisongo, Malang yang bikin jamu dari 100% rempah alami petani lokal. Produk andalan: Teh Rempah, Beras Kencur Premium, Wedang Secang. Website punya katalog + harga, testimoni, FAQ, order WA, dan halaman admin buat kelola toko. React JS + Supabase (PostgreSQL) untuk skalabilitas dan keamanan data.',
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
      'Landing page buat Jakora—brand pangan inovatif dari Padang yang bikin rendang jamur & snack Jatastik dari tangkos sawit. Misi hijau, desain modern, impact nyata.',
    longDescription:
      'Jakora adalah social enterprise dari Kota Padang yang produksi rendang jamur inovatif (NIKM) dan snack Jatastik dari tangkos sawit. Website nampilin produk, testimoni, donasi, dan info pemesanan limbah tangkos sawit. Ada FAQ, live chat WA, dan desain yang reflect nilai keberlanjutan ekologi mereka. React JS + Netlify.',
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
      'Website kami sekarang keliatan profesional banget dan banyak wisatawan yang langsung reach out. Tim IDKA cepet response-nya dan hasilnya beneran sesuai yang kami mau.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Pak Rizal',
    role: 'Direktur — CV. Pentagon Konstruksindo',
    business: 'pentagonkontraktor.netlify.app',
    avatar: '🏗️',
    content:
      'Company profile kami jauh lebih kredibel sekarang. Calon klien yang datang udah lebih serius karena kesan pertamanya langsung oke. IDKA ngerti banget kebutuhan kami.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ibu Sari',
    role: 'Pemilik — Nutri Bunga',
    business: 'nutribunga.netlify.app',
    avatar: '🍯',
    content:
      'Dua minggu jadi, langsung bisa dipakai promosi. Tampilannya bersih, loading-nya ngebut, dan pelanggan makin gampang nemuin produk kami. Worth it banget!',
    rating: 5,
  },
];

export const teamMembers = [
  {
    id: 1,
    name: 'Project Manager',
    role: 'Strategist & Client Relations',
    description:
      'Yang ngurusin dari awal sampai akhir. Ngobrol sama kamu, bikin brief, atur timeline, dan mastiin semuanya berjalan sesuai rencana.',
    icon: '🎯',
  },
  {
    id: 2,
    name: 'UI/UX Designer',
    role: 'Visual & Experience Designer',
    description:
      'Otak di balik tampilan yang bikin kamu bilang "wah". Wireframe, mockup, sampai desain final yang estetik dan enak dipake.',
    icon: '🎨',
  },
  {
    id: 3,
    name: 'Web Developer',
    role: 'Frontend & Backend Engineer',
    description:
      'Yang ngewujudin desain jadi website beneran. Integrasi WA, form, CMS, hosting—semua dihandle sampai live.',
    icon: '💻',
  },
  {
    id: 4,
    name: 'Content & Admin',
    role: 'Content Creator & Admin',
    description:
      'Ngurusin konten, portofolio, testimoni, dan semua komunikasi biar kamu nggak nunggu lama untuk dapat jawaban.',
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
    title: 'No Ribet',
    description: 'Proses kerja sama yang smooth. Kamu tinggal siapin materi, kami yang handle sisanya.',
  },
  {
    icon: '🤝',
    title: 'Transparan',
    description: 'Harga jelas, revisi jelas, proses jelas. Nggak ada biaya kejutan di akhir.',
  },
  {
    icon: '⚡',
    title: 'Fast Response',
    description: 'Chat kami dibalas dalam jam kerja. Nggak perlu nunggu berhari-hari buat dapat update.',
  },
  {
    icon: '🎯',
    title: 'Result-Oriented',
    description: 'Website kami bukan cuma buat dipamerin—tapi beneran bantu bisnis kamu tumbuh.',
  },
];

export const businessFlow = [
  { step: 1, label: 'Kontak', icon: '💬', description: 'Chat kami via WA, form, atau DM Instagram' },
  { step: 2, label: 'Brief', icon: '📋', description: 'Isi form kebutuhan biar kami ngerti bisnis kamu' },
  { step: 3, label: 'Proposal', icon: '📄', description: 'Kami kirim harga, timeline, dan scope kerja' },
  { step: 4, label: 'DP & Mulai', icon: '💸', description: 'Deal? DP masuk, langsung kami gas produksinya' },
  { step: 5, label: 'Desain', icon: '🎨', description: 'Wireframe dan mockup dikirim buat di-approve' },
  { step: 6, label: 'Development', icon: '💻', description: 'Desain dibangun jadi website aktif + testing' },
  { step: 7, label: 'Review', icon: '🔍', description: 'Kamu cek staging link, feedback, kami revisi' },
  { step: 8, label: 'Live! 🎉', icon: '🚀', description: 'Pelunasan, domain terhubung, website live!' },
];

export const faq = [
  {
    question: 'Berapa lama website-nya jadi?',
    answer:
      'Starter sekitar 3-5 hari kerja, Business 7-14 hari, dan Premium 14-21 hari. Makin cepet kamu siapin materi (logo, teks, foto), makin cepet jadinya.',
  },
  {
    question: 'Revisinya berapa kali?',
    answer:
      'Starter 1-2x, Business 2-3x, Premium lebih fleksibel. Kalau mau revisi tambahan di luar kuota, dikenakan biaya yang udah disepakati di awal—no surprise.',
  },
  {
    question: 'Kontennya harus siapin sendiri nggak?',
    answer:
      'Idealnya kamu siapin teks, foto, dan logo. Tapi tenang, tim IDKA bisa bantu copywriting dasar dan saran konten. Nggak punya foto? Kami bisa pakai stock photo yang bagus.',
  },
  {
    question: 'Cara bayarnya gimana?',
    answer:
      'DP 50% dulu sebelum pengerjaan mulai, pelunasan 50% sebelum website live. Bisa transfer bank, QRIS, atau e-wallet. Untuk proyek kecil bisa 60/40.',
  },
  {
    question: 'Domain dan hosting gimana?',
    answer:
      'IDKA bisa bantu setup semuanya. Biaya domain & hosting di luar paket tapi kami kasih rekomendasi yang worth it sesuai budget kamu.',
  },
  {
    question: 'Setelah website jadi, ada support-nya nggak?',
    answer:
      'Ada! Kami punya paket maintenance bulanan (Basic, Standard, Premium) buat jaga website kamu tetap ngebut, aman, dan selalu update.',
  },
];
