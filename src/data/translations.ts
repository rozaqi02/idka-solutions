// IDKA Solutions — Bilingual Translations (EN / ID)
// Default language: English (en)

export type Lang = 'en' | 'id'

type Translations = {
  // ─── NAVBAR ───────────────────────────────────────────────────────────────
  nav: {
    home: string
    services: string
    products: string
    portfolio: string
    about: string
    contact: string
    cta: string
    sidebarTagline: string
    mobileMenuLabel: string
    closeMenu: string
    openMenu: string
  }

  // ─── FOOTER ───────────────────────────────────────────────────────────────
  footer: {
    studioTag: string
    desc: string
    pagesTitle: string
    servicesTitle: string
    startTitle: string
    ctaDesc: string
    ctaBtn: string
    fastResponse: string
    bottomTag: string
    home: string
    services: string
    products: string
    portfolio: string
    about: string
    contact: string
    companyProfile: string
    landingPage: string
    storeAndCatalog: string
    mobileApp: string
    maintenance: string
  }

  // ─── HOME PAGE ────────────────────────────────────────────────────────────
  home: {
    heroEyebrow: string
    heroTitle: string
    heroTitleAccent: string
    heroSubtitle: string
    heroSubtitleBold: string
    heroCta1: string
    heroCta2: string
    heroProof: string

    // Value chips
    valueOnlineLabel: string
    valueOnlineDetail: string
    valueChatLabel: string
    valueChatDetail: string
    valueTrustLabel: string
    valueTrustDetail: string
    valueGrowthLabel: string
    valueGrowthDetail: string
    valueMobileLabel: string
    valueMobileDetail: string
    valueFastLabel: string
    valueFastDetail: string
    valueAriaLabel: string

    // Services section
    servicesSectionTag: string
    servicesSectionTitle: string
    servicesSectionSubtitle: string
    servicesViewDetail: string

    // Service cards (home)
    svc1Badge: string
    svc1Title: string
    svc1Desc: string
    svc2Badge: string
    svc2Title: string
    svc2Desc: string
    svc3Badge: string
    svc3Title: string
    svc3Desc: string
    svc4Badge: string
    svc4Title: string
    svc4Desc: string

    // Why us section
    whySectionTag: string
    whySectionTitle: string
    whySectionSubtitle: string
    why1Badge: string
    why1Title: string
    why1Desc: string
    why2Badge: string
    why2Title: string
    why2Desc: string
    why3Badge: string
    why3Title: string
    why3Desc: string
    why4Badge: string
    why4Title: string
    why4Desc: string

    // Process section
    processSectionTag: string
    processSectionTitle: string
    processSectionSubtitle: string
    step1Label: string
    step1Title: string
    step1Desc: string
    step2Label: string
    step2Title: string
    step2Desc: string
    step3Label: string
    step3Title: string
    step3Desc: string

    // Portfolio section
    portfolioSectionTag: string
    portfolioSectionTitle: string
    portfolioSectionSubtitle: string
    portfolioViewAll: string
    portfolioVisit: string
    portfolioDetail: string

    // Products section
    productsSectionTag: string
    productsSectionTitle: string
    productsSectionSubtitle: string
    productsLearnMore: string

    // Pricing section
    pricingSectionTag: string
    pricingSectionTitle: string
    pricingSectionSubtitle: string
    pricingChoose: string

    // CTA section
    ctaSectionTag: string
    ctaSectionTitle: string
    ctaSectionSubtitle: string
    ctaWhatsApp: string
    ctaBrief: string
    ctaProof: string
  }

  // ─── LAYANAN PAGE ─────────────────────────────────────────────────────────
  layanan: {
    heroEyebrow: string
    heroTitle: string
    heroTitleAccent: string
    heroSubtitle: string
    heroSubtitleBold: string

    // Services grid
    servicesSectionTag: string
    servicesSectionTitle: string
    servicesSectionSubtitle: string
    servicesExplore: string

    // Individual services (from content.ts mapped)
    svc_website_profil_badge: string
    svc_website_profil_title: string
    svc_website_profil_desc: string

    svc_aplikasi_mobile_badge: string
    svc_aplikasi_mobile_title: string
    svc_aplikasi_mobile_desc: string

    svc_website_katalog_badge: string
    svc_website_katalog_title: string
    svc_website_katalog_desc: string

    svc_website_kustom_badge: string
    svc_website_kustom_title: string
    svc_website_kustom_desc: string

    svc_maintenance_badge: string
    svc_maintenance_title: string
    svc_maintenance_desc: string

    // Process
    processSectionTag: string
    processSectionTitle: string
    processSectionSubtitle: string
    step1Label: string
    step1Title: string
    step1Desc: string
    step2Label: string
    step2Title: string
    step2Desc: string
    step3Label: string
    step3Title: string
    step3Desc: string

    // Packages
    packagesSectionTag: string
    packagesSectionTitle: string
    packagesSectionSubtitle: string
    packagesMostChosen: string
    packagesChoose: string
    packagesCustomNote: string
    packagesCustomTitle: string
    packagesCustomDesc: string
    packagesCustomContact: string

    // Estimator
    estimatorSectionTag: string
    estimatorSectionTitle: string
    estimatorSectionSubtitle: string

    // Maintenance
    maintenanceSectionTag: string
    maintenanceSectionTitle: string
    maintenanceSectionSubtitle: string
    maintenanceConsult: string

    // FAQ
    faqSectionTag: string
    faqSectionTitle: string
    faqStillQuestion: string
    faqStillDesc: string
    faqBrief: string
    faqChat: string

    // Package taglines / names / features
    pkg_starter_name: string
    pkg_starter_tagline: string
    pkg_starter_price: string
    pkg_starter_cta: string
    pkg_starter_features: string[]

    pkg_business_name: string
    pkg_business_tagline: string
    pkg_business_price: string
    pkg_business_cta: string
    pkg_business_features: string[]

    pkg_premium_name: string
    pkg_premium_tagline: string
    pkg_premium_price: string
    pkg_premium_cta: string
    pkg_premium_features: string[]

    maint_name: string
    maint_price: string
    maint_features: string[]

    // FAQ items
    faq: { question: string; answer: string }[]
  }

  // ─── PORTOFOLIO PAGE ──────────────────────────────────────────────────────
  portofolio: {
    heroEyebrow: string
    heroTitle: string
    heroTitleAccent: string
    heroSubtitle: string
    filterAll: string
    cardVisit: string
    cardDownload: string
    techLabel: string
    periodLabel: string
  }

  // ─── PRODUK PAGE ──────────────────────────────────────────────────────────
  produk: {
    heroEyebrow: string
    heroTitle: string
    heroTitleAccent: string
    heroSubtitle: string
    showcaseSectionTag: string
    showcaseSectionTitle: string
    showcaseSectionSubtitle: string
    downloadBtn: string
    downloadSize: string
    learnMore: string
    statusComingSoon: string
    statusAvailable: string
  }

  // ─── TENTANG PAGE ─────────────────────────────────────────────────────────
  tentang: {
    heroEyebrow: string
    heroTitle: string
    heroTitleAccent: string
    heroSubtitle: string
    heroSubtitleBold: string

    storyTag: string
    storyTitle: string
    storyQuote: string
    storyP1: string
    storyP2: string
    storyP3: string

    valuesTag: string
    valuesTitle: string
    valuesSubtitle: string

    val1Title: string
    val1Desc: string
    val2Title: string
    val2Desc: string
    val3Title: string
    val3Desc: string
    val4Title: string
    val4Desc: string

    teamTag: string
    teamTitle: string
    teamSubtitle: string

    techTag: string
    techTitle: string
    techSubtitle: string

    ctaTag: string
    ctaTitle: string
    ctaSubtitle: string
    ctaBtn: string
    ctaConsult: string
  }

  // ─── KONTAK PAGE ──────────────────────────────────────────────────────────
  kontak: {
    heroEyebrow: string
    heroTitle: string
    heroTitleAccent: string
    heroSubtitle: string

    // Form steps
    step1Label: string
    step2Label: string
    step3Label: string

    // Field labels
    fieldNama: string
    fieldNamaPlaceholder: string
    fieldEmail: string
    fieldEmailPlaceholder: string
    fieldWhatsapp: string
    fieldWhatsappPlaceholder: string
    fieldBisnis: string
    fieldBisnisPlaceholder: string
    fieldJenisUsaha: string
    fieldJenisUsahaPlaceholder: string
    fieldTujuanWebsite: string
    fieldTujuanWebsitePlaceholder: string
    fieldJenisWebsite: string
    fieldJenisWebsitePlaceholder: string
    fieldHalaman: string
    fieldHalamanPlaceholder: string
    fieldFitur: string
    fieldFiturPlaceholder: string
    fieldDomain: string
    fieldDeadline: string
    fieldDeadlinePlaceholder: string
    fieldBudget: string
    fieldBudgetPlaceholder: string
    fieldPesan: string
    fieldPesanPlaceholder: string

    // Domain options
    domainYes: string
    domainNo: string

    // Website type options
    websiteTypes: string[]

    // Budget options
    budgets: string[]

    // Buttons
    btnNext: string
    btnBack: string
    btnSubmit: string
    btnSubmitting: string

    // Messages
    successTitle: string
    successMsg: string
    errorMsg: string
    validationRequired: string

    // WA CTA
    waCtaTag: string
    waCtaTitle: string
    waCtaSubtitle: string
    waCtaBtn: string
    waCtaTagline: string

    // Steps sidebar
    stepDataDiri: string
    stepDetailWeb: string
    stepTimeline: string
  }

  // ─── WA MESSAGES ──────────────────────────────────────────────────────────
  wa: {
    heroConsult: string
    ctaConsult: string
    serviceConsult: string
    navbar: string
    kontakDirect: string
  }

  // ─── MISC ─────────────────────────────────────────────────────────────────
  misc: {
    loading: string
    skipToContent: string
    pageLoading: string
    copyright: string
  }
}

// ═══════════════════════════════════════════════════════════════
//   ENGLISH
// ═══════════════════════════════════════════════════════════════
const en: Translations = {
  nav: {
    home: 'Home',
    services: 'Services',
    products: 'Products',
    portfolio: 'Portfolio',
    about: 'About',
    contact: 'Contact',
    cta: 'Free Consultation',
    sidebarTagline: 'Response within 1–3 working hours',
    mobileMenuLabel: 'Navigation menu',
    closeMenu: 'Close menu',
    openMenu: 'Open menu',
  },

  footer: {
    studioTag: 'IDKA Solutions Studio',
    desc: 'We help SMEs, professionals, and startups build modern websites & mobile apps (Android/iOS) that are functional and ready to support business growth.',
    pagesTitle: 'Pages',
    servicesTitle: 'Services',
    startTitle: 'Start',
    ctaDesc: 'Ready to launch a professional website & mobile app for your business?',
    ctaBtn: 'Start a Project',
    fastResponse: 'Fast response 1–3 hours',
    bottomTag: '• Built for businesses ready to grow with clarity.',
    home: 'Home',
    services: 'Services',
    products: 'Products',
    portfolio: 'Portfolio',
    about: 'About Us',
    contact: 'Contact',
    companyProfile: 'Company Profile',
    landingPage: 'Landing Page',
    storeAndCatalog: 'Store & Catalog',
    mobileApp: 'Mobile App',
    maintenance: 'Maintenance Care+',
  },

  home: {
    heroEyebrow: 'Website & Mobile App Studio',
    heroTitle: 'Website & Mobile App.',
    heroTitleAccent: 'More Trusted & Ready to Grow.',
    heroSubtitle: 'All your business digital needs — from landing pages, online stores, to custom Android & iOS apps.',
    heroSubtitleBold: 'All digital needs, in one clear step.',
    heroCta1: 'Free Consultation',
    heroCta2: 'View All Services',
    heroProof: 'Free initial consultation · 1–3 hour response · Structured project brief',

    valueOnlineLabel: 'Easy to find',
    valueOnlineDetail: 'Appear on Google when potential customers search for your business.',
    valueChatLabel: 'WhatsApp direct',
    valueChatDetail: 'Chat button connects directly to your WhatsApp admin.',
    valueTrustLabel: 'Trusted & secure',
    valueTrustDetail: 'Active SSL and professional appearance build trust.',
    valueGrowthLabel: 'Ready to scale',
    valueGrowthDetail: 'Website structure designed for easy expansion.',
    valueMobileLabel: 'Mobile-friendly',
    valueMobileDetail: 'Displays perfectly on phones, tablets, and desktops.',
    valueFastLabel: 'Fast go-live',
    valueFastDetail: 'Brief → development → revision → your website online.',
    valueAriaLabel: 'IDKA website advantages',

    servicesSectionTag: 'Core Services',
    servicesSectionTitle: '4 Impactful Digital Solutions for Your Business',
    servicesSectionSubtitle: 'From business profiles, online stores, custom systems, to routine maintenance — all delivered with premium digital studio standards.',
    servicesViewDetail: 'View Detail',

    svc1Badge: 'Profile & Branding',
    svc1Title: 'Company Profile & Landing Page',
    svc1Desc: 'Modern look that builds trust with potential buyers and business partners from the very first second.',
    svc2Badge: 'Store & Catalog',
    svc2Title: 'Web Store & WhatsApp Integration',
    svc2Desc: 'Display products neatly with checkout directly connected to your WhatsApp admin.',
    svc3Badge: 'Custom System',
    svc3Title: 'Web App & Operational Dashboard',
    svc3Desc: 'Functional features matching your internal business workflow — data automation, dynamic forms, and API integration.',
    svc4Badge: 'Care+ 24/7',
    svc4Title: 'Performance & Security Maintained 24/7',
    svc4Desc: 'Regular backups, system updates, active SSL, uptime monitoring, and technical support when issues arise.',

    whySectionTag: 'IDKA Advantage',
    whySectionTitle: 'Why Businesses Choose IDKA Solutions?',
    whySectionSubtitle: 'A combination of modern artistic design, high performance, and reliable after-sales service.',
    why1Badge: 'SEO & Maps',
    why1Title: 'Easy to Find on Google',
    why1Desc: 'SEO-optimized code structure and Google Maps location help potential buyers find your business quickly.',
    why2Badge: 'Brand Reputation',
    why2Title: 'First Impression That Builds Trust',
    why2Desc: 'Clean, distinctive visual design that immediately builds brand credibility in the eyes of first-time visitors.',
    why3Badge: 'WhatsApp Instant',
    why3Title: 'Chats Go Directly to Admin',
    why3Desc: 'Message button and contact form integration directly connected to your active business WhatsApp.',
    why4Badge: 'Warranty & SSL',
    why4Title: 'Fast Performance & Security 24/7',
    why4Desc: 'Active SSL certificate, high load speed, and maintenance warranty support so your website is always running.',

    processSectionTag: 'Workflow Art',
    processSectionTitle: '3 Steps to Live Website',
    processSectionSubtitle: 'A simple, transparent process from consultation to go-live.',
    step1Label: 'Step 01',
    step1Title: 'Tell Us Your Needs',
    step1Desc: 'Free consultation via WhatsApp or form. We map out goals, features, and your business budget.',
    step2Label: 'Step 02',
    step2Title: 'We Build It',
    step2Desc: 'Design, development, and revisions per package. You review progress on staging before go-live.',
    step3Label: 'Step 03',
    step3Title: 'Website Live',
    step3Desc: 'Domain active, SSL installed, and website online — ready to bring in new customers.',

    portfolioSectionTag: 'Best Work',
    portfolioSectionTitle: 'Works That Have Gone Live',
    portfolioSectionSubtitle: 'See how our clients transformed and increased buyer trust.',
    portfolioViewAll: 'View All Portfolio',
    portfolioVisit: 'Visit Website',
    portfolioDetail: 'View Detail',

    productsSectionTag: 'Pipeline 2026',
    productsSectionTitle: 'Digital Products We Are Building',
    productsSectionSubtitle: 'These products are designed specifically for Indonesian local businesses.',
    productsLearnMore: 'Learn More',

    pricingSectionTag: 'Clear Investment',
    pricingSectionTitle: 'Transparent Pricing, Clear Scope',
    pricingSectionSubtitle: 'One-time payment (not a monthly subscription). Scope and revisions agreed upfront.',
    pricingChoose: 'Choose Package',

    ctaSectionTag: 'Free Consultation',
    ctaSectionTitle: 'Ready to Start Your Business Website?',
    ctaSectionSubtitle: 'Free initial discussion with no commitment. IDKA Solutions team is ready to help design the right website for your business.',
    ctaWhatsApp: '💬 Chat WhatsApp',
    ctaBrief: 'Fill Project Brief',
    ctaProof: 'Free consultation · No commitment · Structured project brief',
  },

  layanan: {
    heroEyebrow: 'IDKA Solutions Services',
    heroTitle: 'Website & Mobile App',
    heroTitleAccent: 'for Various Business Needs.',
    heroSubtitle: 'For SMEs, professionals, and startups — from landing pages, online stores, to custom Android & iOS apps.',
    heroSubtitleBold: 'All digital needs, in one clear step.',

    servicesSectionTag: 'Artistic Canvas',
    servicesSectionTitle: 'Digital Services We Deliver',
    servicesSectionSubtitle: 'Modern websites and mobile apps with artistic design that represents your brand character.',
    servicesExplore: 'Explore Estimate',

    svc_website_profil_badge: 'Ideal for SMEs & Personal',
    svc_website_profil_title: 'Profile & Branding Website',
    svc_website_profil_desc: 'Company profile, interactive portfolio, personal brand, or high-converting professional landing page.',

    svc_aplikasi_mobile_badge: 'Android & iOS',
    svc_aplikasi_mobile_title: 'Mobile App Development',
    svc_aplikasi_mobile_desc: 'Custom Android & iOS apps (Flutter / React Native) for business operations, CRM, POS, digital catalog, or startup MVP.',

    svc_website_katalog_badge: 'Best Seller',
    svc_website_katalog_title: 'Catalog & Store Website',
    svc_website_katalog_desc: 'Modern online store with a neat product catalog, WhatsApp checkout, and Payment Link integration.',

    svc_website_kustom_badge: 'High Scalability',
    svc_website_kustom_title: 'Website & Custom System',
    svc_website_kustom_desc: 'Enterprise web apps, client portals, management information systems, or complex features per business specs.',

    svc_maintenance_badge: 'Security & Speed',
    svc_maintenance_title: 'Maintenance & Optimization',
    svc_maintenance_desc: 'Routine maintenance, Google PageSpeed 90+ performance monitoring, regular backups, and system updates.',

    processSectionTag: 'Workflow Art',
    processSectionTitle: '3 Steps to Live Website',
    processSectionSubtitle: 'A simple, transparent process from consultation to go-live.',
    step1Label: 'Step 01',
    step1Title: 'Tell Us Your Needs',
    step1Desc: 'Free consultation via WhatsApp or form. We map out goals, features, and budget.',
    step2Label: 'Step 02',
    step2Title: 'We Build It',
    step2Desc: 'Design, development, and revisions per package. You review progress on staging.',
    step3Label: 'Step 03',
    step3Title: 'Website Live',
    step3Desc: 'Domain active, SSL installed, website online and ready for business.',

    packagesSectionTag: 'Clear Investment',
    packagesSectionTitle: 'Transparent Pricing, Clear Scope',
    packagesSectionSubtitle: 'One-time payment (not a monthly subscription). Scope and revisions agreed upfront.',
    packagesMostChosen: 'Most Chosen',
    packagesChoose: 'Choose Package',
    packagesCustomNote: '💡',
    packagesCustomTitle: 'Need a custom solution?',
    packagesCustomDesc: 'We accept projects outside standard packages.',
    packagesCustomContact: 'Contact us',

    estimatorSectionTag: 'Live Calculator',
    estimatorSectionTitle: 'Quick Price Estimate',
    estimatorSectionSubtitle: 'Select your needs to get a price estimate. Final price confirmed during consultation.',

    maintenanceSectionTag: 'After Go-Live',
    maintenanceSectionTitle: 'Optional Maintenance',
    maintenanceSectionSubtitle: 'Keep your website stable after launch. Can be taken separately from the website creation package.',
    maintenanceConsult: 'Consult Package',

    faqSectionTag: 'Quick Answers',
    faqSectionTitle: 'Frequently Asked Questions',
    faqStillQuestion: 'Still Have Questions?',
    faqStillDesc: 'Our team is ready to discuss website ideas and provide the best solution for your business.',
    faqBrief: 'Fill Project Brief',
    faqChat: 'Chat WhatsApp',

    pkg_starter_name: 'Starter',
    pkg_starter_tagline: 'To start your online presence',
    pkg_starter_price: 'From IDR 300,000',
    pkg_starter_cta: 'Choose Starter',
    pkg_starter_features: [
      '1 landing page',
      'WhatsApp button',
      'Short business profile',
      'Product/service display',
      'Contact & location',
      'Mobile-friendly',
      '1–2x revisions',
    ],

    pkg_business_name: 'Business',
    pkg_business_tagline: 'For a more complete business appearance',
    pkg_business_price: 'From IDR 900,000',
    pkg_business_cta: 'Choose Business',
    pkg_business_features: [
      '3–5 complete pages',
      'Home, About, Services',
      'Portfolio / Gallery',
      'Contact form',
      'Basic SEO',
      'Mobile-friendly',
      '2–3x revisions',
    ],

    pkg_premium_name: 'Premium',
    pkg_premium_tagline: 'For custom needs and advanced development',
    pkg_premium_price: 'From IDR 1,700,000',
    pkg_premium_cta: 'Choose Premium',
    pkg_premium_features: [
      '5–8 custom pages',
      'Brand-aligned design',
      'CMS (manage content independently)',
      'Product catalog',
      'Blog & analytics',
      'Performance optimization',
      'Launch support',
    ],

    maint_name: 'Maintenance',
    maint_price: 'IDR 150,000/mo',
    maint_features: [
      'Content & product updates',
      'Regular backup & security',
      'Performance monitoring',
      'Minor bug fixes',
      'Monthly report',
      'Light consultation',
    ],

    faq: [
      {
        question: 'Does IDKA Solutions handle Mobile App development (Android & iOS)?',
        answer: 'Yes! We provide Android & iOS mobile app development (Flutter / React Native) for business operations, CRM, POS, digital catalog, and startup MVPs.',
      },
      {
        question: 'How long does website & mobile app development take?',
        answer: 'Starter website: 3–5 business days. Business: 7–14 days. Premium: 14–21 days. Mobile apps range from 2–4 weeks depending on feature complexity.',
      },
      {
        question: 'How many revisions are included?',
        answer: 'Starter: 1–2 times. Business: 2–3 times. Premium & Mobile App: more flexible. Revisions beyond the quota are charged additionally.',
      },
      {
        question: 'Does the client need to prepare content?',
        answer: 'Preferably yes. We can assist with basic copywriting and visual selection if needed.',
      },
      {
        question: 'How does the payment system work?',
        answer: '50% deposit before work begins, 50% balance before go-live / release. Via bank transfer, QRIS, or e-wallet.',
      },
      {
        question: 'What about domain, hosting, and Play Store / App Store accounts?',
        answer: 'We help with APK preparation and Play Store publishing. Server, domain, and developer license fees are separate.',
      },
      {
        question: 'Is there support after live / release?',
        answer: 'Yes. A monthly maintenance package is available for routine maintenance, bug fixes, and performance updates.',
      },
    ],
  },

  portofolio: {
    heroEyebrow: 'IDKA Solutions Portfolio',
    heroTitle: 'Real Projects.',
    heroTitleAccent: 'Real Impact.',
    heroSubtitle: 'A curated selection of websites and mobile apps we have built for SMEs, professionals, and startups.',
    filterAll: 'All',
    cardVisit: 'Visit Website',
    cardDownload: 'Download APK',
    techLabel: 'Tech Stack',
    periodLabel: 'Period',
  },

  produk: {
    heroEyebrow: 'IDKA Digital Products',
    heroTitle: 'Digital products',
    heroTitleAccent: 'coming soon.',
    heroSubtitle: 'Beyond custom websites & mobile apps, we build internal digital products for business operations and career.',
    showcaseSectionTag: 'Canvas Pipeline 2026',
    showcaseSectionTitle: 'Two Products In the Pipeline',
    showcaseSectionSubtitle: 'Designed simply with an *Art Canvas* approach, focused on real work, and comfortable to use daily.',
    downloadBtn: 'Download Free',
    downloadSize: 'Size',
    learnMore: 'Learn More',
    statusComingSoon: 'Coming Soon',
    statusAvailable: 'Available Now',
  },

  tentang: {
    heroEyebrow: 'About IDKA Solutions',
    heroTitle: 'Digital Partner for',
    heroTitleAccent: 'Your Business Growth.',
    heroSubtitle: 'Helping SMEs, professionals, and startups build a digital presence through credible, modern, and impactful websites & mobile apps.',
    heroSubtitleBold: 'All digital needs, in one clear step.',

    storyTag: 'Our Story',
    storyTitle: 'Born from a Shared Passion for Digital',
    storyQuote: '"Every business deserves to look professional online through quality websites & mobile apps."',
    storyP1: 'IDKA Solutions was founded by a team of developers, designers, and analysts who believe that digital presence is the key to growth for businesses of all sizes.',
    storyP2: 'We understand that SMEs often struggle to find trusted, affordable, and result-oriented digital partners. That\'s why we\'re here — bridging quality and accessibility.',
    storyP3: 'Every project we handle is a commitment: a clean design, solid code, and a product ready to support your business goals.',

    valuesTag: 'Our Principles',
    valuesTitle: 'How We Work',
    valuesSubtitle: 'Consistent work values that guide every project we handle.',

    val1Title: 'Simple Process',
    val1Desc: 'Clear workflow. You prepare the material, we handle the execution.',
    val2Title: 'Transparent',
    val2Desc: 'Pricing, revisions, and work stages are communicated upfront.',
    val3Title: 'Fast Response',
    val3Desc: 'Communication replied during working hours to keep progress moving.',
    val4Title: 'Result-Oriented',
    val4Desc: 'Websites & mobile apps designed to support business credibility and conversion.',

    teamTag: 'The Team',
    teamTitle: 'The People Behind IDKA',
    teamSubtitle: 'A multidisciplinary team with expertise in development, design, and business analysis.',

    techTag: 'Technology',
    techTitle: 'Our Tech Stack',
    techSubtitle: 'We use proven modern technologies to deliver fast, reliable, and scalable products.',

    ctaTag: 'Free Consultation',
    ctaTitle: 'Ready to Build Something Together?',
    ctaSubtitle: 'Tell us your business needs. IDKA Solutions team is ready to help you build the right digital presence.',
    ctaBtn: 'Start a Project',
    ctaConsult: 'Free Consultation',
  },

  kontak: {
    heroEyebrow: 'Contact IDKA Solutions',
    heroTitle: 'Ready to Build',
    heroTitleAccent: 'Your Website?',
    heroSubtitle: 'Fill out the form below to get a tailored project proposal. The first consultation is always free.',

    step1Label: 'Personal info',
    step2Label: 'Web details',
    step3Label: 'Timeline',

    fieldNama: 'Full Name',
    fieldNamaPlaceholder: 'Your full name',
    fieldEmail: 'Email',
    fieldEmailPlaceholder: 'example@email.com',
    fieldWhatsapp: 'WhatsApp Number',
    fieldWhatsappPlaceholder: '08xxxxxxxxxx',
    fieldBisnis: 'Business / Brand Name',
    fieldBisnisPlaceholder: 'Your business or brand name',
    fieldJenisUsaha: 'Business Type',
    fieldJenisUsahaPlaceholder: 'e.g. Culinary, Fashion, Service, etc.',
    fieldTujuanWebsite: 'Website Goal',
    fieldTujuanWebsitePlaceholder: 'e.g. Attract more customers, increase brand credibility, facilitate online orders, etc.',
    fieldJenisWebsite: 'Website Type',
    fieldJenisWebsitePlaceholder: 'Select website type',
    fieldHalaman: 'Estimated Pages',
    fieldHalamanPlaceholder: 'e.g. Home, About, Services, Contact',
    fieldFitur: 'Required Features',
    fieldFiturPlaceholder: 'e.g. WhatsApp button, product gallery, contact form, Google Maps, etc.',
    fieldDomain: 'Already have a domain?',
    fieldDeadline: 'Target Deadline',
    fieldDeadlinePlaceholder: 'e.g. end of August 2025',
    fieldBudget: 'Budget Range',
    fieldBudgetPlaceholder: 'Select budget range',
    fieldPesan: 'Additional Message',
    fieldPesanPlaceholder: 'Anything else you want to tell us?',

    domainYes: 'Yes, already have',
    domainNo: 'Not yet / need help',

    websiteTypes: [
      'Landing Page',
      'Company Profile',
      'Simple Online Store',
      'Portfolio Website',
      'Professional Services Website',
      'Product Catalog Website',
      'Personal Brand Website',
      'Event Website',
      'Other',
    ],

    budgets: [
      'Under IDR 500K',
      'IDR 500K – 1M',
      'IDR 1M – 2M',
      'IDR 2M – 5M',
      'Above IDR 5M',
      'Not sure / need consultation',
    ],

    btnNext: 'Next →',
    btnBack: '← Back',
    btnSubmit: 'Send Brief',
    btnSubmitting: 'Sending...',

    successTitle: '🎉 Brief Sent!',
    successMsg: 'Thank you! Our team will contact you within 1–3 working hours via WhatsApp or email.',
    errorMsg: 'Failed to send. Please try again or contact us via WhatsApp.',
    validationRequired: 'Please complete required fields.',

    waCtaTag: 'Direct WhatsApp',
    waCtaTitle: 'Prefer to Chat Directly?',
    waCtaSubtitle: 'Contact us via WhatsApp for quick consultation. We respond within 1–3 working hours.',
    waCtaBtn: '💬 Chat on WhatsApp',
    waCtaTagline: 'Mon–Sat, 08.00–20.00 WIB',

    stepDataDiri: 'Personal info',
    stepDetailWeb: 'Web details',
    stepTimeline: 'Timeline',
  },

  wa: {
    heroConsult: 'Hello IDKA Solutions, I would like a free website consultation (from homepage).',
    ctaConsult: 'Hello IDKA Solutions, I would like to ask about a business website.',
    serviceConsult: 'Hello IDKA Solutions, I would like to ask about website services.',
    navbar: 'Hello IDKA Solutions, I would like a website consultation.',
    kontakDirect: 'Hello IDKA Solutions, I would like to consult about website services directly.',
  },

  misc: {
    loading: 'Loading page...',
    skipToContent: 'Skip to content',
    pageLoading: 'Loading page...',
    copyright: 'All rights reserved.',
  },
}

// ═══════════════════════════════════════════════════════════════
//   INDONESIAN
// ═══════════════════════════════════════════════════════════════
const id: Translations = {
  nav: {
    home: 'Beranda',
    services: 'Layanan',
    products: 'Produk',
    portfolio: 'Portofolio',
    about: 'Tentang',
    contact: 'Kontak',
    cta: 'Konsultasi Gratis',
    sidebarTagline: 'Respon dalam 1–3 jam kerja',
    mobileMenuLabel: 'Menu navigasi',
    closeMenu: 'Tutup menu',
    openMenu: 'Buka menu',
  },

  footer: {
    studioTag: 'IDKA Solutions Studio',
    desc: 'Kami membantu UMKM, profesional, dan startup membangun website modern & aplikasi mobile (Android/iOS) yang fungsional dan siap mendukung pertumbuhan bisnis.',
    pagesTitle: 'Halaman',
    servicesTitle: 'Layanan',
    startTitle: 'Mulai',
    ctaDesc: 'Siap hadirkan website & aplikasi mobile profesional untuk bisnis Anda?',
    ctaBtn: 'Mulai Proyek',
    fastResponse: 'Fast response 1-3 jam',
    bottomTag: '• Dibuat untuk bisnis yang ingin tumbuh dengan jelas.',
    home: 'Beranda',
    services: 'Layanan',
    products: 'Produk',
    portfolio: 'Portofolio',
    about: 'Tentang Kami',
    contact: 'Kontak',
    companyProfile: 'Company Profile',
    landingPage: 'Landing Page',
    storeAndCatalog: 'Toko & Katalog',
    mobileApp: 'Aplikasi Mobile',
    maintenance: 'Maintenance Care+',
  },

  home: {
    heroEyebrow: 'Website & Mobile App Studio',
    heroTitle: 'Website & Aplikasi Mobile.',
    heroTitleAccent: 'Lebih Terpercaya & Siap Tumbuh.',
    heroSubtitle: 'Segala kebutuhan digital bisnis Anda — dari landing page, toko online, hingga aplikasi Android & iOS kustom.',
    heroSubtitleBold: 'Semua kebutuhan digital, dalam satu langkah yang jelas.',
    heroCta1: 'Konsultasi Gratis',
    heroCta2: 'Lihat Semua Layanan',
    heroProof: 'Konsultasi awal gratis · Respon 1-3 jam kerja · Brief proyek terarah',

    valueOnlineLabel: 'Mudah ditemukan',
    valueOnlineDetail: 'Tampil di Google saat calon pelanggan mencari bisnis Anda.',
    valueChatLabel: 'WhatsApp langsung',
    valueChatDetail: 'Tombol chat terhubung otomatis ke admin WhatsApp Anda.',
    valueTrustLabel: 'Terpercaya & aman',
    valueTrustDetail: 'SSL aktif dan tampilan profesional bangun kepercayaan.',
    valueGrowthLabel: 'Siap tumbuh',
    valueGrowthDetail: 'Struktur website dirancang agar mudah dikembangkan.',
    valueMobileLabel: 'Mobile-friendly',
    valueMobileDetail: 'Tampil sempurna di HP, tablet, dan desktop.',
    valueFastLabel: 'Go-live cepat',
    valueFastDetail: 'Brief → pengerjaan → revisi → website Anda online.',
    valueAriaLabel: 'Keunggulan website IDKA',

    servicesSectionTag: 'Layanan Utama',
    servicesSectionTitle: '4 Solusi Digital Berdampak untuk Bisnis Anda',
    servicesSectionSubtitle: 'Dari profil usaha, toko online, sistem kustom, hingga perawatan rutin — semua dikerjakan dengan standar studio digital premium.',
    servicesViewDetail: 'Lihat Detail',

    svc1Badge: 'Profil & Branding',
    svc1Title: 'Company Profile & Landing Page',
    svc1Desc: 'Tampilan modern yang membangun kepercayaan calon pembeli dan partner bisnis Anda sejak detik pertama.',
    svc2Badge: 'Toko & Katalog',
    svc2Title: 'Web Toko & Integrasi WhatsApp',
    svc2Desc: 'Tampilkan produk rapi lengkap dengan checkout langsung terhubung ke admin WhatsApp Anda.',
    svc3Badge: 'Sistem Kustom',
    svc3Title: 'Web App & Dashboard Operasional',
    svc3Desc: 'Fitur fungsional sesuai workflow internal bisnis Anda — otomasi data, form dinamis, dan integrasi API.',
    svc4Badge: 'Care+ 24/7',
    svc4Title: 'Performa & Keamanan Terjaga 24/7',
    svc4Desc: 'Backup berkala, pembaruan sistem, SSL aktif, monitoring uptime, dan bantuan teknis saat ada kendala.',

    whySectionTag: 'Keunggulan IDKA',
    whySectionTitle: 'Kenapa Bisnis Memilih IDKA Solutions?',
    whySectionSubtitle: 'Kombinasi desain artistik modern, performa tinggi, dan layanan purna jual yang reliabel.',
    why1Badge: 'SEO & Maps',
    why1Title: 'Mudah Ditemukan di Google',
    why1Desc: 'Struktur kode teroptimasi SEO dan titik lokasi Google Maps bantu calon pembeli menemukan bisnis Anda dengan cepat.',
    why2Badge: 'Reputasi Brand',
    why2Title: 'Kesan Pertama yang Terpercaya',
    why2Desc: 'Desain visual bersih dan berkarakter yang langsung membangun kredibilitas brand Anda di mata pengunjung pertama.',
    why3Badge: 'WhatsApp Instant',
    why3Title: 'Chat Masuk Otomatis ke Admin',
    why3Desc: 'Integrasi tombol pesan dan form kontak langsung terhubung ke WhatsApp aktif bisnis Anda tanpa ribet.',
    why4Badge: 'Garansi & SSL',
    why4Title: 'Performa Cepat & Keamanan 24/7',
    why4Desc: 'Sertifikat SSL aktif, kecepatan muat tinggi, dan dukungan garansi pemeliharaan agar website selalu beroperasi.',

    processSectionTag: 'Workflow Art',
    processSectionTitle: '3 Langkah ke Website Live',
    processSectionSubtitle: 'Alur sederhana dan transparan dari konsultasi hingga go-live.',
    step1Label: 'Langkah 01',
    step1Title: 'Ceritakan Kebutuhan',
    step1Desc: 'Konsultasi gratis via WhatsApp atau form. Kami petakan tujuan, fitur, dan anggaran bisnis Anda.',
    step2Label: 'Langkah 02',
    step2Title: 'Kami Kerjakan',
    step2Desc: 'Desain, development, dan revisi sesuai paket. Anda review progres di staging sebelum go-live.',
    step3Label: 'Langkah 03',
    step3Title: 'Website Live',
    step3Desc: 'Domain aktif, SSL terpasang, dan website online — siap mendatangkan pelanggan baru.',

    portfolioSectionTag: 'Karya Terbaik',
    portfolioSectionTitle: 'Hasil Karya yang Telah Go-Live',
    portfolioSectionSubtitle: 'Lihat bagaimana klien kami bertransformasi dan meningkatkan kepercayaan calon pembeli.',
    portfolioViewAll: 'Lihat Semua Portofolio',
    portfolioVisit: 'Kunjungi Website',
    portfolioDetail: 'Lihat Detail',

    productsSectionTag: 'Pipeline 2026',
    productsSectionTitle: 'Produk Digital yang Sedang Kami Bangun',
    productsSectionSubtitle: 'Produk-produk ini dirancang khusus untuk kebutuhan bisnis lokal Indonesia.',
    productsLearnMore: 'Pelajari Lebih Lanjut',

    pricingSectionTag: 'Investasi Jelas',
    pricingSectionTitle: 'Harga Transparan, Scope Jelas',
    pricingSectionSubtitle: 'Harga sekali bayar (bukan langganan bulanan). Scope dan revisi disepakati di awal.',
    pricingChoose: 'Pilih Paket',

    ctaSectionTag: 'Konsultasi Gratis',
    ctaSectionTitle: 'Siap Memulai Website Bisnis Anda?',
    ctaSectionSubtitle: 'Diskusi awal gratis dan tanpa komitmen. Tim IDKA Solutions siap membantu merancang website yang tepat untuk bisnis Anda.',
    ctaWhatsApp: '💬 Chat WhatsApp',
    ctaBrief: 'Isi Brief Proyek',
    ctaProof: 'Konsultasi gratis · Tanpa komitmen · Brief proyek terarah',
  },

  layanan: {
    heroEyebrow: 'Layanan IDKA Solutions',
    heroTitle: 'Website & Aplikasi Mobile',
    heroTitleAccent: 'untuk Berbagai Kebutuhan Bisnis.',
    heroSubtitle: 'Untuk UMKM, profesional, dan startup — dari landing page, toko online, hingga aplikasi Android & iOS kustom.',
    heroSubtitleBold: 'Semua kebutuhan digital, dalam satu langkah yang jelas.',

    servicesSectionTag: 'Artistic Canvas',
    servicesSectionTitle: 'Layanan Digital yang Kami Kerjakan',
    servicesSectionSubtitle: 'Website modern dan aplikasi mobile dengan desain artistik yang merepresentasikan karakter brand Anda.',
    servicesExplore: 'Jelajahi Estimasi',

    svc_website_profil_badge: 'Cocok untuk UMKM & Personal',
    svc_website_profil_title: 'Website Profil & Branding',
    svc_website_profil_desc: 'Company profile, portofolio interaktif, personal brand, atau landing page profesional berkonversi tinggi.',

    svc_aplikasi_mobile_badge: 'Android & iOS',
    svc_aplikasi_mobile_title: 'Pengembangan Aplikasi Mobile',
    svc_aplikasi_mobile_desc: 'Aplikasi Android & iOS kustom (Flutter / React Native) untuk operasional bisnis, CRM, kasir/POS, katalog digital, atau MVP startup.',

    svc_website_katalog_badge: 'Best Seller',
    svc_website_katalog_title: 'Website Katalog & Toko',
    svc_website_katalog_desc: 'Toko online modern dengan sistem katalog produk rapi, checkout via WhatsApp, dan integrasi Payment Link.',

    svc_website_kustom_badge: 'Skalabilitas Tinggi',
    svc_website_kustom_title: 'Website & Sistem Kustom',
    svc_website_kustom_desc: 'Aplikasi web enterprise, portal klien, sistem informasi manajemen, atau fitur kompleks sesuai spesifikasi bisnis.',

    svc_maintenance_badge: 'Keamanan & Speed',
    svc_maintenance_title: 'Maintenance & Optimasi',
    svc_maintenance_desc: 'Layanan pemeliharaan rutin, monitoring performa Google PageSpeed 90+, backup berkala, dan pembaruan sistem.',

    processSectionTag: 'Workflow Art',
    processSectionTitle: '3 Langkah ke Website Live',
    processSectionSubtitle: 'Alur sederhana dan transparan dari konsultasi hingga go-live.',
    step1Label: 'Langkah 01',
    step1Title: 'Ceritakan Kebutuhan',
    step1Desc: 'Konsultasi gratis via WhatsApp atau form. Kami petakan tujuan, fitur, dan anggaran.',
    step2Label: 'Langkah 02',
    step2Title: 'Kami Kerjakan',
    step2Desc: 'Desain, development, dan revisi sesuai paket. Anda review progres di staging.',
    step3Label: 'Langkah 03',
    step3Title: 'Website Live',
    step3Desc: 'Domain aktif, SSL terpasang, website online dan siap dipakai bisnis.',

    packagesSectionTag: 'Investasi Jelas',
    packagesSectionTitle: 'Harga Transparan, Scope Jelas',
    packagesSectionSubtitle: 'Harga sekali bayar (bukan langganan bulanan). Scope dan revisi disepakati di awal.',
    packagesMostChosen: 'Paling Dipilih',
    packagesChoose: 'Pilih Paket',
    packagesCustomNote: '💡',
    packagesCustomTitle: 'Butuh solusi kustom?',
    packagesCustomDesc: 'Kami menerima proyek di luar paket standar.',
    packagesCustomContact: 'Hubungi kami',

    estimatorSectionTag: 'Kalkulator Live',
    estimatorSectionTitle: 'Estimasi Harga Cepat',
    estimatorSectionSubtitle: 'Pilih kebutuhan Anda untuk mendapat perkiraan harga. Harga final dikonfirmasi saat konsultasi.',

    maintenanceSectionTag: 'After Go-Live',
    maintenanceSectionTitle: 'Maintenance Opsional',
    maintenanceSectionSubtitle: 'Jaga website tetap stabil setelah live. Bisa diambil terpisah dari paket pembuatan website.',
    maintenanceConsult: 'Konsultasi Paket',

    faqSectionTag: 'Jawaban Cepat',
    faqSectionTitle: 'Pertanyaan yang Sering Diajukan',
    faqStillQuestion: 'Masih Ada Pertanyaan?',
    faqStillDesc: 'Tim kami siap mendiskusikan ide website dan memberikan solusi terbaik untuk bisnis Anda.',
    faqBrief: 'Isi Brief Proyek',
    faqChat: 'Chat WhatsApp',

    pkg_starter_name: 'Starter',
    pkg_starter_tagline: 'Untuk memulai kehadiran online',
    pkg_starter_price: 'Mulai Rp 300.000',
    pkg_starter_cta: 'Pilih Starter',
    pkg_starter_features: [
      '1 halaman landing page',
      'Tombol WhatsApp',
      'Profil singkat bisnis',
      'Tampilan produk/layanan',
      'Kontak & lokasi',
      'Mobile-friendly',
      '1-2x revisi',
    ],

    pkg_business_name: 'Business',
    pkg_business_tagline: 'Untuk tampilan bisnis yang lebih lengkap',
    pkg_business_price: 'Mulai Rp 900.000',
    pkg_business_cta: 'Pilih Business',
    pkg_business_features: [
      '3-5 halaman lengkap',
      'Beranda, Tentang, Layanan',
      'Portofolio / Galeri',
      'Form kontak',
      'SEO dasar',
      'Mobile-friendly',
      '2-3x revisi',
    ],

    pkg_premium_name: 'Premium',
    pkg_premium_tagline: 'Untuk kebutuhan kustom dan pengembangan lanjutan',
    pkg_premium_price: 'Mulai Rp 1.700.000',
    pkg_premium_cta: 'Pilih Premium',
    pkg_premium_features: [
      '5-8 halaman kustom',
      'Desain sesuai brand',
      'CMS (kelola konten mandiri)',
      'Katalog produk',
      'Blog & analytics',
      'Optimasi performa',
      'Dukungan awal peluncuran',
    ],

    maint_name: 'Maintenance',
    maint_price: 'Rp 150.000/bln',
    maint_features: [
      'Update konten & produk',
      'Backup rutin & keamanan',
      'Pemantauan performa',
      'Perbaikan error ringan',
      'Laporan bulanan',
      'Konsultasi ringan',
    ],

    faq: [
      {
        question: 'Apakah IDKA Solutions melayani pembuatan Aplikasi Mobile (Android & iOS)?',
        answer: 'Ya! Kami melayani pembuatan aplikasi mobile Android & iOS (Flutter / React Native) untuk operasional bisnis, CRM, kasir/POS, katalog digital, hingga MVP startup.',
      },
      {
        question: 'Berapa lama pengerjaan website & aplikasi mobile?',
        answer: 'Website Starter 3-5 hari kerja, Business 7-14 hari, Premium 14-21 hari. Untuk Aplikasi Mobile berkisar 2-4 minggu tergantung kompleksitas fitur.',
      },
      {
        question: 'Berapa kali revisi?',
        answer: 'Starter 1-2 kali, Business 2-3 kali, Premium & Mobile App lebih fleksibel. Revisi di luar kuota dikenakan biaya.',
      },
      {
        question: 'Apakah konten harus disiapkan sendiri?',
        answer: 'Sebaiknya ya. Kami bisa bantu copywriting dasar dan pemilihan visual jika diperlukan.',
      },
      {
        question: 'Bagaimana sistem pembayarannya?',
        answer: 'DP 50% sebelum pengerjaan, pelunasan 50% sebelum go-live / rilis. Via transfer bank, QRIS, atau e-wallet.',
      },
      {
        question: 'Bagaimana dengan domain, hosting, dan akun Play Store / App Store?',
        answer: 'Kami bantu proses penyiapan dan publikasi APK / Play Store. Biaya server, domain, dan lisensi developer terpisah.',
      },
      {
        question: 'Apakah ada dukungan setelah live / rilis?',
        answer: 'Ya. Tersedia paket maintenance bulanan untuk pemeliharaan rutin, perbaikan bug, dan update performa.',
      },
    ],
  },

  portofolio: {
    heroEyebrow: 'Portofolio IDKA Solutions',
    heroTitle: 'Proyek Nyata.',
    heroTitleAccent: 'Dampak Nyata.',
    heroSubtitle: 'Kumpulan website dan aplikasi mobile yang telah kami bangun untuk UMKM, profesional, dan startup.',
    filterAll: 'Semua',
    cardVisit: 'Kunjungi Website',
    cardDownload: 'Unduh APK',
    techLabel: 'Teknologi',
    periodLabel: 'Periode',
  },

  produk: {
    heroEyebrow: 'Produk Digital IDKA',
    heroTitle: 'Produk digital yang',
    heroTitleAccent: 'segera hadir.',
    heroSubtitle: 'Selain website & aplikasi mobile kustom, kami membangun produk digital internal untuk operasional bisnis dan karier.',
    showcaseSectionTag: 'Canvas Pipeline 2026',
    showcaseSectionTitle: 'Dua Produk Dalam Pipeline',
    showcaseSectionSubtitle: 'Dirancang sederhana dengan pendekatan *Art Canvas*, fokus pada pekerjaan nyata, dan nyaman digunakan setiap hari.',
    downloadBtn: 'Unduh Gratis',
    downloadSize: 'Ukuran',
    learnMore: 'Pelajari Lebih Lanjut',
    statusComingSoon: 'Coming Soon',
    statusAvailable: 'Tersedia Sekarang',
  },

  tentang: {
    heroEyebrow: 'Tentang IDKA Solutions',
    heroTitle: 'Mitra Digital untuk',
    heroTitleAccent: 'Pertumbuhan Bisnis Anda.',
    heroSubtitle: 'Membantu UMKM, profesional, dan startup membangun kehadiran digital lewat website & aplikasi mobile yang kredibel, modern, dan berdampak.',
    heroSubtitleBold: 'Semua kebutuhan digital, dalam satu langkah yang jelas.',

    storyTag: 'Cerita Kami',
    storyTitle: 'Lahir dari Kesamaan Semangat di Bidang Digital',
    storyQuote: '"Setiap bisnis berhak tampil profesional di internet lewat website & aplikasi mobile berkualitas."',
    storyP1: 'IDKA Solutions didirikan oleh tim developer, desainer, dan analis yang percaya bahwa kehadiran digital adalah kunci pertumbuhan bisnis dari segala skala.',
    storyP2: 'Kami memahami bahwa UMKM kerap kesulitan menemukan mitra digital yang terpercaya, terjangkau, dan berorientasi hasil. Itulah mengapa kami hadir — menjembatani kualitas dan keterjangkauan.',
    storyP3: 'Setiap proyek yang kami tangani adalah sebuah komitmen: desain bersih, kode solid, dan produk yang siap mendukung tujuan bisnis Anda.',

    valuesTag: 'Prinsip Kerja',
    valuesTitle: 'Cara Kami Bekerja',
    valuesSubtitle: 'Nilai kerja konsisten yang memandu setiap proyek yang kami tangani.',

    val1Title: 'Proses Sederhana',
    val1Desc: 'Alur kerja jelas. Anda siapkan materi, kami tangani pengerjaan.',
    val2Title: 'Transparan',
    val2Desc: 'Harga, revisi, dan tahapan kerja disampaikan di awal.',
    val3Title: 'Respons Cepat',
    val3Desc: 'Komunikasi dibalas pada jam kerja agar progress tetap jalan.',
    val4Title: 'Berorientasi Hasil',
    val4Desc: 'Website & aplikasi mobile dirancang untuk mendukung kredibilitas dan konversi bisnis.',

    teamTag: 'Tim Kami',
    teamTitle: 'Orang-orang di Balik IDKA',
    teamSubtitle: 'Tim multidisiplin dengan keahlian di bidang development, desain, dan analisis bisnis.',

    techTag: 'Teknologi',
    techTitle: 'Tech Stack Kami',
    techSubtitle: 'Kami menggunakan teknologi modern yang telah terbukti untuk menghasilkan produk yang cepat, handal, dan skalabel.',

    ctaTag: 'Konsultasi Gratis',
    ctaTitle: 'Siap Membangun Sesuatu Bersama?',
    ctaSubtitle: 'Ceritakan kebutuhan bisnis Anda. Tim IDKA Solutions siap membantu Anda membangun kehadiran digital yang tepat.',
    ctaBtn: 'Mulai Proyek',
    ctaConsult: 'Konsultasi Gratis',
  },

  kontak: {
    heroEyebrow: 'Hubungi IDKA Solutions',
    heroTitle: 'Siap Membangun',
    heroTitleAccent: 'Website Anda?',
    heroSubtitle: 'Isi formulir berikut untuk mendapatkan proposal proyek yang sesuai. Konsultasi pertama selalu gratis.',

    step1Label: 'Data diri',
    step2Label: 'Detail web',
    step3Label: 'Timeline',

    fieldNama: 'Nama Lengkap',
    fieldNamaPlaceholder: 'Nama lengkap Anda',
    fieldEmail: 'Email',
    fieldEmailPlaceholder: 'contoh@email.com',
    fieldWhatsapp: 'Nomor WhatsApp',
    fieldWhatsappPlaceholder: '08xxxxxxxxxx',
    fieldBisnis: 'Nama Bisnis / Brand',
    fieldBisnisPlaceholder: 'Nama bisnis atau brand Anda',
    fieldJenisUsaha: 'Jenis Usaha',
    fieldJenisUsahaPlaceholder: 'mis. Kuliner, Fashion, Jasa, dll.',
    fieldTujuanWebsite: 'Tujuan Website',
    fieldTujuanWebsitePlaceholder: 'mis. Menarik lebih banyak pelanggan, meningkatkan kredibilitas brand, mempermudah pemesanan online, dll.',
    fieldJenisWebsite: 'Jenis Website',
    fieldJenisWebsitePlaceholder: 'Pilih jenis website',
    fieldHalaman: 'Estimasi Halaman',
    fieldHalamanPlaceholder: 'mis. Beranda, Tentang, Layanan, Kontak',
    fieldFitur: 'Fitur yang Dibutuhkan',
    fieldFiturPlaceholder: 'mis. Tombol WhatsApp, galeri produk, form kontak, Google Maps, dll.',
    fieldDomain: 'Sudah punya domain?',
    fieldDeadline: 'Target Deadline',
    fieldDeadlinePlaceholder: 'mis. akhir Agustus 2025',
    fieldBudget: 'Kisaran Budget',
    fieldBudgetPlaceholder: 'Pilih kisaran budget',
    fieldPesan: 'Pesan Tambahan',
    fieldPesanPlaceholder: 'Ada hal lain yang ingin Anda sampaikan?',

    domainYes: 'Ya, sudah punya',
    domainNo: 'Belum / butuh bantuan',

    websiteTypes: [
      'Landing Page',
      'Company Profile',
      'Website Toko Sederhana',
      'Website Portofolio',
      'Website Jasa Profesional',
      'Website Katalog Produk',
      'Website Personal Brand',
      'Website Event',
      'Lainnya',
    ],

    budgets: [
      'Di bawah Rp 500 ribu',
      'Rp 500 ribu - 1 juta',
      'Rp 1 - 2 juta',
      'Rp 2 - 5 juta',
      'Di atas Rp 5 juta',
      'Belum tahu / ingin konsultasi',
    ],

    btnNext: 'Lanjut →',
    btnBack: '← Kembali',
    btnSubmit: 'Kirim Brief',
    btnSubmitting: 'Mengirim...',

    successTitle: '🎉 Brief Terkirim!',
    successMsg: 'Terima kasih! Tim kami akan menghubungi Anda dalam 1–3 jam kerja via WhatsApp atau email.',
    errorMsg: 'Gagal mengirim. Silakan coba lagi atau hubungi kami via WhatsApp.',
    validationRequired: 'Mohon lengkapi field yang wajib diisi.',

    waCtaTag: 'WhatsApp Langsung',
    waCtaTitle: 'Lebih Suka Chat Langsung?',
    waCtaSubtitle: 'Hubungi kami via WhatsApp untuk konsultasi cepat. Kami merespons dalam 1–3 jam kerja.',
    waCtaBtn: '💬 Chat di WhatsApp',
    waCtaTagline: 'Senin–Sabtu, 08.00–20.00 WIB',

    stepDataDiri: 'Data diri',
    stepDetailWeb: 'Detail web',
    stepTimeline: 'Timeline',
  },

  wa: {
    heroConsult: 'Halo IDKA Solutions, saya ingin konsultasi website gratis (dari beranda).',
    ctaConsult: 'Halo IDKA Solutions, saya ingin bertanya tentang website bisnis.',
    serviceConsult: 'Halo IDKA Solutions, saya ingin bertanya tentang jasa website.',
    navbar: 'Halo IDKA Solutions, saya ingin konsultasi website.',
    kontakDirect: 'Halo IDKA Solutions, saya ingin konsultasi website terlebih dahulu (chat langsung, formulir kemudian).',
  },

  misc: {
    loading: 'Memuat halaman...',
    skipToContent: 'Langsung ke konten',
    pageLoading: 'Memuat halaman...',
    copyright: 'Semua hak dilindungi.',
  },
}

export const translations: Record<Lang, Translations> = { en, id }

/**
 * Helper hook-agnostic accessor.
 * Usage: const t = useT() then t.nav.home
 */
export function getT(lang: Lang): Translations {
  return translations[lang]
}
