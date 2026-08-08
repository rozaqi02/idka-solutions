import type { Lang } from './translations'
import { company, portfolio as rawPortfolio, products as rawProducts, teamMembers as rawTeamMembers, workValues as rawWorkValues, stats as rawStats } from './content'

export function getLocalizedCompany(lang: Lang) {
  if (lang === 'en') {
    return {
      ...company,
      tagline: 'Website & Mobile App Solutions for Business',
      description: 'We help SMEs, professionals, and startups build modern, functional websites & mobile apps (Android/iOS) ready to support business growth.',
      position: 'Trusted digital partner for your business website & mobile app needs.',
    }
  }
  return company
}

export function getLocalizedStats(lang: Lang) {
  if (lang === 'en') {
    return [
      { num: '7+', label: 'Projects', labelAlt: 'Completed Websites & Apps' },
      { num: '4.9/5', label: 'Client Rating', labelAlt: 'Client Rating' },
      { num: '5', label: 'Team Members', labelAlt: 'Team Members' },
    ]
  }
  return rawStats
}

export function getLocalizedWorkValues(lang: Lang) {
  if (lang === 'en') {
    return [
      { icon: 'check', title: 'Simple Process', description: 'Clear workflow. You prepare materials, we handle the execution.' },
      { icon: 'handshake', title: 'Transparent', description: 'Pricing, revisions, and project phases agreed upfront.' },
      { icon: 'zap', title: 'Fast Response', description: 'Communication replied during business hours to keep progress moving.' },
      { icon: 'target', title: 'Result Oriented', description: 'Websites & mobile apps designed to drive credibility and business conversion.' },
    ]
  }
  return rawWorkValues
}

export function getLocalizedTeamMembers(lang: Lang) {
  if (lang === 'en') {
    return [
      {
        id: 1,
        name: 'Ahmad Abror Rozaqi Fatoni',
        role: 'QA & Backup Full Stack Developer',
        description: 'Ensuring product quality, end-to-end system testing, and backing up full stack feature development.',
        photo: '/team/ahmad-abror-rozaqi-fatoni.webp?v=6',
      },
      {
        id: 2,
        name: "Fa'iz Abiyu Atha Fawas",
        role: 'Full Stack Laravel Developer',
        description: 'Building web apps & Laravel backend, database integration, API/form/CMS, up to production-ready systems.',
        photo: '/team/faiz-abiyu-atha-fawas.webp?v=6',
      },
      {
        id: 3,
        name: 'Hana Sugianto',
        role: 'Full Stack Laravel / PHP Developer',
        description: 'Developing Laravel/PHP backend architecture, database management, and API integrations for business solutions.',
        photo: '',
      },
      {
        id: 4,
        name: 'Ervan Dwi Ardian',
        role: 'UI/UX Designer',
        description: 'Designing wireframes, clean interfaces, and smooth user experiences that are easy to use.',
        photo: '/team/ervan-dwi-ardian.webp?v=6',
      },
      {
        id: 5,
        name: 'Agta Fadjrin Aminullah',
        role: 'System Analyst',
        description: 'Analyzing system requirements, designing solution flows, and aligning client briefs with technical implementation.',
        photo: '/team/agta-fadjrin-aminullah.webp?v=6',
      },
    ]
  }
  return rawTeamMembers
}

export function getLocalizedProducts(lang: Lang) {
  if (lang === 'en') {
    return [
      {
        id: 'dashboard-umkm',
        title: 'SME Dashboard',
        tagline: 'Monitor sales, inventory, and business performance in one screen.',
        status: 'Coming Soon',
        icon: 'cpu',
        accent: 'blue',
      },
      {
        id: 'ngelamar',
        title: 'Ngelamar App',
        tagline: 'Personal Career CRM & Job Application Tracker with Apple iOS 26 Liquid Glass Design, On-Device OCR Job Poster Scanner, Salary Evaluator, and Offline Database.',
        status: 'Release v1.7.6 (Ready to Download)',
        icon: 'smartphone',
        accent: 'emerald',
        downloadUrl: '/Ngelamar.apk',
        version: 'v1.7.6',
        fileSize: '83.6 MB',
        downloadName: 'Ngelamar.apk',
      },
    ]
  }
  return rawProducts
}

export function getLocalizedPortfolio(lang: Lang) {
  if (lang === 'en') {
    return [
      {
        id: 1,
        title: 'Pentagon Contractor',
        category: 'Company Profile',
        period: 'Feb - Mar 2026',
        screenshot: '/portfolio/pentagon-kontraktor.webp',
        url: 'https://pentagonkontraktor.netlify.app',
        description: 'Company profile website for CV. Pentagon Konstruksindo, a construction & architecture firm.',
        longDescription: 'Features services, portfolio gallery, legal licenses, and consultation form. Built with React JS, fast and responsive.',
        tech: ['React JS', 'Netlify'],
        tags: ['Company Profile', 'Construction', 'Architecture'],
        color: '#f59e0b',
        icon: 'building',
      },
      {
        id: 2,
        title: 'Cidika Travel',
        category: 'Company Profile',
        period: 'Sep - Nov 2025',
        screenshot: '/portfolio/cidika-travel.webp',
        url: 'https://cidikatravel.com',
        description: 'CIDIKA travel agency website for Banyuwangi and Nusa Penida tour destinations.',
        longDescription: 'Displays tour packages, destinations, FAQ, and WhatsApp booking. Bilingual interface built with React JS and Supabase.',
        tech: ['React JS', 'Supabase', 'PostgreSQL', 'Bilingual'],
        tags: ['Travel', 'Company Profile', 'Full Stack'],
        color: '#06b6d4',
        icon: 'building',
      },
      {
        id: 3,
        title: 'Nutri Bunga',
        category: 'Landing Page',
        period: 'Oct - Nov 2025',
        screenshot: '/portfolio/nutri-bunga.webp',
        url: 'https://nutribunga.netlify.app',
        description: 'Landing page for Nutri Bunga, a BPOM & Halal certified premium honey brand.',
        longDescription: 'Showcases flagship products, brand stories, FAQ, and WhatsApp ordering. Completed in 2 weeks.',
        tech: ['React JS', 'Netlify'],
        tags: ['Landing Page', 'SME', 'Local Product'],
        color: '#f59e0b',
        icon: 'shopping-bag',
      },
      {
        id: 4,
        title: 'Imzaqi Store',
        category: 'E-Commerce App',
        period: 'Jan - Feb 2026',
        screenshot: '/portfolio/imzaqi-store.webp',
        url: 'https://imzaqi.store',
        description: 'Digital account e-commerce platform for Indonesian students with QRIS payment integration.',
        longDescription: '20+ product catalog, search filtering, fast checkout, admin panel, and PWA offline support.',
        tech: ['React 19', 'Supabase', 'Framer Motion', 'Gemini API', 'QRIS', 'PWA'],
        tags: ['E-Commerce', 'Full Stack', 'Students'],
        color: '#5e17eb',
        icon: 'shopping-bag',
      },
      {
        id: 5,
        title: 'Jamu Sugih Waras',
        category: 'Full Stack Web App',
        period: 'Jul - Sep 2025',
        screenshot: '/portfolio/jamu-sugih-waras.webp',
        url: 'https://jamu-sugih-waras.netlify.app',
        description: 'Website for Rumah Rempah Sugih Waras, a traditional herbal SME from Malang.',
        longDescription: 'Includes product catalog, customer reviews, FAQ, WhatsApp ordering, and admin management panel.',
        tech: ['React JS', 'Supabase', 'PostgreSQL'],
        tags: ['Full Stack', 'SME', 'Herbal'],
        color: '#84cc16',
        icon: 'cpu',
      },
      {
        id: 6,
        title: 'Jakora',
        category: 'Landing Page',
        period: '2026',
        screenshot: '/portfolio/jakora.webp',
        url: 'https://jakora.netlify.app',
        description: 'Landing page for Jakora, an innovative food & culinary brand from Padang.',
        longDescription: 'Displays products, reviews, donations, FAQ, and live WhatsApp chat.',
        tech: ['React JS', 'Netlify'],
        tags: ['Landing Page', 'SME', 'Food & Culinary'],
        color: '#22c55e',
        icon: 'shopping-bag',
      },
      {
        id: 7,
        title: 'Ngelamar App (v1.7.6)',
        category: 'Mobile App',
        period: 'Aug 2026',
        screenshot: '/portfolio/ngelamar-app.webp',
        url: '/Ngelamar.apk',
        description: 'Personal Career CRM & Job Application Tracker with Apple iOS 26 Liquid Glass UI.',
        longDescription: 'Features On-Device OCR Job Scanner, City Salary Evaluator, and Offline Database. Free for download.',
        tech: ['Flutter', 'Dart', 'Riverpod', 'Hive DB', 'Google ML Kit'],
        tags: ['Mobile App', 'Android', 'Career CRM', 'Apple UI'],
        color: '#007aff',
        icon: 'smartphone',
      },
    ]
  }
  return rawPortfolio
}
