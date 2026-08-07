import { useState, useCallback, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { company, packages, portfolio, products } from '../data/content'
import WordReveal from '../components/WordReveal'
import ScribbleUnderline from '../components/ScribbleUnderline'
import ContinuousLineArt from '../components/ContinuousLineArt'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useHeroEnter } from '../hooks/useHeroEnter'
import { usePageTitle } from '../hooks/usePageTitle'
import './Layanan.css'

const WA_HERO =
  'https://wa.me/' +
  company.whatsapp +
  '?text=' +
  encodeURIComponent('Halo IDKA Solutions, saya ingin konsultasi website (dari beranda).')

const WA_CTA =
  'https://wa.me/' +
  company.whatsapp +
  '?text=' +
  encodeURIComponent('Halo IDKA Solutions, saya ingin bertanya tentang website bisnis.')

/* ─── Inline DoodleBadge (same as Layanan) ─────────────────────────────── */
function DoodleBadge({ text, shape = 'oval', popular = false }: { text: string; shape?: 'oval' | 'tape' | 'cloud'; popular?: boolean }) {
  return (
    <div className={`doodle-badge doodle-badge--${shape} ${popular ? 'doodle-badge--popular' : ''}`}>
      {shape === 'oval' && (
        <svg className="doodle-badge__bg" viewBox="0 0 170 42" fill="none" preserveAspectRatio="none" aria-hidden="true">
          <path d="M 6,21 C 4,7 18,3 85,4 C 152,5 166,7 164,21 C 162,35 148,38 85,38 C 22,38 8,35 6,21 Z M 9,19 C 7,9 21,5 85,6 C 149,7 161,9 161,19 C 161,29 146,35 85,35 C 24,35 11,29 9,19 Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {shape === 'tape' && (
        <svg className="doodle-badge__bg" viewBox="0 0 170 42" fill="none" preserveAspectRatio="none" aria-hidden="true">
          <path d="M 4,8 L 166,2 L 162,36 L 8,40 Z M 2,12 L 168,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {shape === 'cloud' && (
        <svg className="doodle-badge__bg" viewBox="0 0 170 42" fill="none" preserveAspectRatio="none" aria-hidden="true">
          <path d="M 15,25 C 5,20 10,8 25,10 C 35,2 60,4 75,10 C 95,2 125,5 135,12 C 155,10 165,22 155,32 C 160,40 135,42 120,38 C 105,44 75,40 60,38 C 40,42 20,40 15,25 Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      <span className="doodle-badge__text">{text}</span>
    </div>
  )
}

/* ─── Process SVG Art ───────────────────────────────────────────────────── */
function ProcessLineArt({ step }: { step: string }) {
  switch (step) {
    case '01':
      return (
        <svg className="process-line-svg" viewBox="0 0 140 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path className="continuous-path" d="M 15,50 C 15,25 40,15 70,15 C 100,15 125,25 125,50 C 125,75 100,85 70,85 C 55,85 45,95 30,95 C 38,85 25,80 15,50 Z M 45,45 C 55,45 65,35 85,55 M 95,35 L 110,20 L 120,30 L 105,45" />
        </svg>
      )
    case '02':
      return (
        <svg className="process-line-svg" viewBox="0 0 140 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path className="continuous-path" d="M 25,20 L 115,20 L 115,70 L 25,70 Z M 10,78 L 130,78 M 45,40 C 55,30 75,50 95,35 M 40,55 L 60,55 M 70,55 L 100,55" />
        </svg>
      )
    case '03':
      return (
        <svg className="process-line-svg" viewBox="0 0 140 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path className="continuous-path" d="M 70,15 C 85,35 80,65 70,85 C 60,65 55,35 70,15 Z M 55,60 C 40,65 25,75 20,90 C 35,85 50,75 55,60 Z M 85,60 C 100,65 115,75 120,90 C 105,85 90,75 85,60 M 70,25 A 5 5 0 1 1 70,35 A 5 5 0 1 1 70,25" />
        </svg>
      )
    default:
      return null
  }
}

/* ─── Portfolio Preview Card ────────────────────────────────────────────── */
function screenshotCandidates(src: string) {
  if (!src) return [] as string[]
  if (src.endsWith('.webp')) return [src, src.replace(/\.webp$/i, '.png')]
  return [src]
}

function PreviewScreenshot({ src, alt, color }: { src: string; alt: string; color: string }) {
  const candidates = screenshotCandidates(src)
  const [idx, setIdx] = useState(0)
  const [failed, setFailed] = useState(false)
  const current = candidates[idx] ?? src

  const imgRef = useCallback((node: HTMLImageElement | null) => {
    if (node && node.complete && node.naturalWidth > 0) {
      node.classList.add('portfolio-preview-card__screenshot--ready')
    }
  }, [])

  if (failed) {
    return (
      <div
        className="portfolio-preview-card__screenshot portfolio-preview-card__screenshot--fallback"
        style={{ background: `linear-gradient(145deg, ${color}33 0%, ${color}55 100%)` }}
        role="img"
        aria-label={alt}
      />
    )
  }

  return (
    <img
      ref={imgRef}
      src={current}
      alt={alt}
      className="portfolio-preview-card__screenshot"
      width={640}
      height={400}
      loading="eager"
      decoding="async"
      onLoad={(e) => { e.currentTarget.classList.add('portfolio-preview-card__screenshot--ready') }}
      onError={() => {
        if (idx + 1 < candidates.length) setIdx((i) => i + 1)
        else setFailed(true)
      }}
    />
  )
}

function PortfolioPreviewCard({ item, delay }: { item: (typeof portfolio)[number]; delay: number }) {
  const liveUrl = item.url || '/portofolio'
  const isExternal = liveUrl.startsWith('http')
  const cardClass = `portfolio-preview-card art-card art-card--v${(delay % 4) + 1} reveal reveal--delay-${delay}`

  const visual = (
    <div className="portfolio-preview-card__visual">
      <div className="portfolio-preview-card__browser-bar" aria-hidden="true">
        <div className="portfolio-preview-card__browser-dots">
          <span className="dot--red" />
          <span className="dot--yellow" />
          <span className="dot--green" />
        </div>
        {isExternal ? (
          <div className="portfolio-preview-card__url-text">{liveUrl.replace('https://', '')}</div>
        ) : (
          <div className="portfolio-preview-card__url-bar" />
        )}
      </div>
      {item.screenshot ? (
        <PreviewScreenshot src={item.screenshot} alt={`Screenshot ${item.title}`} color={item.color} />
      ) : (
        <div className="portfolio-preview-card__placeholder"><span>{item.icon}</span></div>
      )}
    </div>
  )

  const body = (
    <div className="portfolio-preview-card__body">
      <div className="portfolio-preview-card__top-meta">
        <span className="portfolio-preview-card__category">{item.category}</span>
      </div>
      <h3 className="portfolio-preview-card__title">{item.title}</h3>
      <p className="portfolio-preview-card__desc">{item.description}</p>
      <div className="portfolio-preview-card__tags">
        {item.tags.map((tag) => (
          <span key={tag} className="art-card__tag-doodle"><span className="art-card__tag-bullet">•</span> {tag}</span>
        ))}
      </div>
      <span className="portfolio-preview-card__go">
        {isExternal ? 'Kunjungi Website' : 'Lihat Detail'} ›
      </span>
    </div>
  )

  if (isExternal) {
    return (
      <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={cardClass} aria-label={`${item.title} - buka website live`}>
        {visual}{body}
      </a>
    )
  }
  return (
    <NavLink to={liveUrl} className={cardClass} aria-label={`${item.title} - buka portofolio`}>
      {visual}{body}
    </NavLink>
  )
}

/* ─── Hero Value Icons (doodle style) ──────────────────────────────────── */
const VALUE_ITEMS = [
  { id: 'online', label: 'Mudah ditemukan', detail: 'Tampil di Google saat calon pelanggan mencari bisnis Anda.' },
  { id: 'chat', label: 'WhatsApp langsung', detail: 'Tombol chat terhubung otomatis ke admin WhatsApp Anda.' },
  { id: 'trust', label: 'Terpercaya & aman', detail: 'SSL aktif dan tampilan profesional bangun kepercayaan.' },
  { id: 'growth', label: 'Siap tumbuh', detail: 'Struktur website dirancang agar mudah dikembangkan.' },
  { id: 'mobile', label: 'Mobile-friendly', detail: 'Tampil sempurna di HP, tablet, dan desktop.' },
  { id: 'fast', label: 'Go-live cepat', detail: 'Brief → pengerjaan → revisi → website Anda online.' },
] as const

function HeroValueIcons() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const rowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!activeId) return
    const onPointerDown = (e: PointerEvent) => {
      if (!rowRef.current?.contains(e.target as Node)) setActiveId(null)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [activeId])

  return (
    <div ref={rowRef} className="home-value-row hero-in__item hero-in__item--sub" role="list" aria-label="Keunggulan website IDKA">
      {VALUE_ITEMS.map((item, i) => {
        const open = activeId === item.id
        return (
          <div key={item.id} className={`home-value-chip${open ? ' home-value-chip--open' : ''}`} role="listitem">
            <button
              type="button"
              className="home-value-chip__btn art-card__tag-doodle"
              aria-label={item.label}
              aria-expanded={open}
              onClick={() => setActiveId((prev) => (prev === item.id ? null : item.id))}
              onFocus={() => setActiveId(item.id)}
              onBlur={() => setActiveId(null)}
            >
              <span className="art-card__tag-bullet">{['🌐','💬','🔒','📈','📱','🚀'][i]}</span>
              {item.label}
            </button>
            <div
              role="tooltip"
              className={`home-value-tip${open ? ' home-value-tip--visible' : ''}`}
            >
              {item.detail}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ─── Main Component ────────────────────────────────────────────────────── */
export default function Home() {
  useScrollReveal()
  useHeroEnter()
  usePageTitle({
    title: 'IDKA Solutions | Jasa Website Profesional untuk Bisnis',
    description:
      'IDKA Solutions membantu UMKM, personal brand, dan startup membangun website modern yang fungsional dan siap mendukung pertumbuhan bisnis.',
    fullTitle: true,
    path: '/',
  })

  const SERVICES = [
    {
      id: 'profil-branding',
      icon: 'building' as const,
      badge: 'Profil & Branding',
      popular: false,
      title: 'Company Profile & Landing Page',
      description: 'Tampilan modern yang membangun kepercayaan calon pembeli dan partner bisnis Anda sejak detik pertama.',
      tags: ['Profil Bisnis', 'Landing Page', 'Google-friendly'],
      accent: 'indigo',
    },
    {
      id: 'katalog-toko-online',
      icon: 'shopping-bag' as const,
      badge: 'Toko & Katalog',
      popular: true,
      title: 'Web Toko & Integrasi WhatsApp',
      description: 'Tampilkan produk rapi lengkap dengan checkout langsung terhubung ke admin WhatsApp Anda.',
      tags: ['Katalog Produk', 'WhatsApp Order', 'Galeri Foto'],
      accent: 'purple',
    },
    {
      id: 'sistem-kustom',
      icon: 'cpu' as const,
      badge: 'Sistem Kustom',
      popular: false,
      title: 'Web App & Dashboard Operasional',
      description: 'Fitur fungsional sesuai workflow internal bisnis Anda — otomasi data, form dinamis, dan integrasi API.',
      tags: ['Web App', 'Dashboard', 'Otomasi Data'],
      accent: 'amber',
    },
    {
      id: 'maintenance-care',
      icon: 'shield-check' as const,
      badge: 'Care+ 24/7',
      popular: false,
      title: 'Performa & Keamanan Terjaga 24/7',
      description: 'Backup berkala, pembaruan sistem, SSL aktif, monitoring uptime, dan bantuan teknis saat ada kendala.',
      tags: ['SSL & Backup', 'Uptime Monitor', 'Revisi Berkala'],
      accent: 'emerald',
    },
  ]

  const WHY_US = [
    {
      icon: 'building' as const,
      badge: 'SEO & Maps',
      title: 'Mudah Ditemukan di Google',
      desc: 'Struktur kode teroptimasi SEO dan titik lokasi Google Maps bantu calon pembeli menemukan bisnis Anda dengan cepat.',
      tags: ['Google Search', 'Google Maps'],
      accent: 'indigo',
    },
    {
      icon: 'shopping-bag' as const,
      badge: 'Reputasi Brand',
      title: 'Kesan Pertama yang Terpercaya',
      desc: 'Desain visual bersih dan berkarakter yang langsung membangun kredibilitas brand Anda di mata pengunjung pertama.',
      tags: ['Visual Clean', 'Responsive HP'],
      accent: 'purple',
    },
    {
      icon: 'cpu' as const,
      badge: 'WhatsApp Instant',
      title: 'Chat Masuk Otomatis ke Admin',
      desc: 'Integrasi tombol pesan dan form kontak langsung terhubung ke WhatsApp aktif bisnis Anda tanpa ribet.',
      tags: ['Quick Chat', 'Form Lead'],
      accent: 'amber',
    },
    {
      icon: 'shield-check' as const,
      badge: 'Garansi & SSL',
      title: 'Performa Cepat & Keamanan 24/7',
      desc: 'Sertifikat SSL aktif, kecepatan muat tinggi, dan dukungan garansi pemeliharaan agar website selalu beroperasi.',
      tags: ['High Speed', 'SSL Enkripsi'],
      accent: 'emerald',
    },
  ]

  const PROCESS = [
    {
      n: '01',
      title: 'Ceritakan Kebutuhan',
      desc: 'Konsultasi gratis via WhatsApp atau form. Kami petakan tujuan, fitur, dan anggaran bisnis Anda.',
    },
    {
      n: '02',
      title: 'Kami Kerjakan',
      desc: 'Desain, development, dan revisi sesuai paket. Anda review progres di staging sebelum go-live.',
    },
    {
      n: '03',
      title: 'Website Live',
      desc: 'Domain aktif, SSL terpasang, dan website online — siap mendatangkan pelanggan baru.',
    },
  ]

  return (
    <div className="layanan-page home-page">

      {/* 1. Hero — Kiblat Layanan.tsx */}
      <section className="apple-hero section artistic-hero" aria-labelledby="hero-heading" data-hero-enter="home">
        <div className="container">
          <div className="apple-hero__inner">
            <div className="apple-hero__eyebrow hero-in__item hero-in__item--tag doodle-tag">
              <span>Website &amp; Mobile App Studio</span>
            </div>
            <h1 id="hero-heading" className="apple-hero__title hero-in__item hero-in__item--title artistic-title">
              <WordReveal>Website &amp; Aplikasi Mobile.</WordReveal>{' '}
              <WordReveal className="apple-hero__title-accent">Lebih Terpercaya &amp; Siap Tumbuh.</WordReveal>
              <ScribbleUnderline variant="wavy" />
            </h1>
            <p className="apple-hero__subtitle hero-in__item hero-in__item--sub">
              Segala kebutuhan digital bisnis Anda — dari landing page, toko online, hingga aplikasi Android &amp; iOS kustom.{' '}
              <strong className="apple-text-bold">Semua kebutuhan digital, dalam satu langkah yang jelas.</strong>
            </p>

            <HeroValueIcons />

            <div className="apple-hero__actions hero-in__item hero-in__item--actions" style={{ marginTop: '1.5rem' }}>
              <a
                href={WA_HERO}
                target="_blank"
                rel="noopener noreferrer"
                className="art-card__btn-doodle"
              >
                <span>💬 Konsultasi Gratis</span>
                <svg className="art-card__btn-arrow" width="22" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M 2 7 Q 10 3, 18 7 M 15 2 L 21 7 L 15 12" />
                </svg>
              </a>
              <NavLink to="/layanan" className="art-card__btn-doodle">
                <span>Lihat Semua Layanan</span>
                <svg className="art-card__btn-arrow" width="22" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M 2 7 Q 10 3, 18 7 M 15 2 L 21 7 L 15 12" />
                </svg>
              </NavLink>
            </div>
            <p className="apple-hero__proof hero-in__item" style={{ marginTop: '1.25rem' }}>
              Konsultasi awal gratis · Respon 1–3 jam kerja · Brief proyek terarah
            </p>
          </div>
        </div>
      </section>

      {/* 2. Layanan Utama — Kiblat Layanan.tsx */}
      <section className="section section--tint layanan-artistic-section" aria-labelledby="all-services-heading">
        <div className="container">
          <div className="section-header reveal artistic-header">
            <div className="section-tag doodle-tag">
              <span>Layanan Utama</span>
            </div>
            <h2 id="all-services-heading" className="section-title artistic-title">
              4 Solusi Digital Berdampak untuk Bisnis Anda
              <ScribbleUnderline variant="double" />
            </h2>
            <p className="section-subtitle artistic-subtitle">
              Dari profil usaha, toko online, sistem kustom, hingga perawatan rutin — semua dikerjakan dengan standar studio digital premium.
            </p>
          </div>

          <div className="artistic-grid">
            {SERVICES.map((svc, i) => (
              <div
                key={svc.id}
                id={svc.id}
                className={`art-card art-card--v${(i % 4) + 1} ${svc.popular ? 'art-card--featured' : ''} art-card--${svc.accent} reveal reveal--delay-${i + 1}`}
              >
                <div className="art-card__top">
                  <div className="art-card__illustration" aria-hidden="true">
                    <ContinuousLineArt type={svc.icon} />
                  </div>
                  <DoodleBadge text={svc.badge} popular={svc.popular} shape={i % 3 === 0 ? 'tape' : i % 3 === 1 ? 'cloud' : 'oval'} />
                </div>

                <div className="art-card__content">
                  <h3 className="art-card__title">{svc.title}</h3>
                  <p className="art-card__desc">{svc.description}</p>
                </div>

                <div className="art-card__tags">
                  {svc.tags.map((tag, idx) => (
                    <span key={idx} className="art-card__tag-doodle">
                      <span className="art-card__tag-bullet">•</span> {tag}
                    </span>
                  ))}
                </div>

                <div className="art-card__footer">
                  <NavLink to="/layanan" className="art-card__btn-doodle">
                    <span>Lihat Detail</span>
                    <svg className="art-card__btn-arrow" width="22" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M 2 7 Q 10 3, 18 7 M 15 2 L 21 7 L 15 12" />
                    </svg>
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Keunggulan IDKA — Kiblat Layanan.tsx */}
      <section className="section layanan-artistic-section" aria-labelledby="why-heading">
        <div className="container">
          <div className="section-header reveal artistic-header">
            <div className="section-tag doodle-tag">
              <span>Keunggulan IDKA</span>
            </div>
            <h2 id="why-heading" className="section-title artistic-title">
              Kenapa Bisnis Memilih IDKA Solutions?
              <ScribbleUnderline variant="zigzag" />
            </h2>
            <p className="section-subtitle artistic-subtitle">
              Kombinasi desain artistik modern, performa tinggi, dan layanan purna jual yang reliabel.
            </p>
          </div>

          <div className="artistic-grid">
            {WHY_US.map((item, i) => (
              <div key={item.badge} className={`art-card art-card--v${(i % 4) + 1} art-card--${item.accent} reveal reveal--delay-${i + 1}`}>
                <div className="art-card__top">
                  <div className="art-card__illustration" aria-hidden="true">
                    <ContinuousLineArt type={item.icon} />
                  </div>
                  <DoodleBadge text={item.badge} shape={i % 3 === 0 ? 'tape' : i % 3 === 1 ? 'cloud' : 'oval'} />
                </div>
                <div className="art-card__content">
                  <h3 className="art-card__title">{item.title}</h3>
                  <p className="art-card__desc">{item.desc}</p>
                </div>
                <div className="art-card__tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="art-card__tag-doodle">
                      <span className="art-card__tag-bullet">•</span> {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Cara kerja — Kiblat Layanan.tsx (layanan-process) */}
      <section className="section section--tint layanan-process" aria-labelledby="process-heading">
        <div className="container">
          <div className="section-header reveal artistic-header">
            <div className="section-tag doodle-tag"><span>Workflow Art</span></div>
            <h2 id="process-heading" className="section-title artistic-title">
              3 Langkah ke Website Live
              <ScribbleUnderline variant="zigzag" />
            </h2>
            <p className="section-subtitle artistic-subtitle">
              Alur sederhana dan transparan dari konsultasi hingga go-live.
            </p>
          </div>
          <div className="process-list artistic-process-list">
            {PROCESS.map((step, idx) => (
              <div key={step.n} className={`art-card process-art-card art-card--v${idx + 1} reveal`}>
                <div className="process-art-card__header">
                  <DoodleBadge
                    text={`Langkah ${step.n}`}
                    popular={step.n === '01'}
                    shape={idx === 0 ? 'cloud' : idx === 1 ? 'tape' : 'oval'}
                  />
                  <div className="process-art-card__illustration" aria-hidden="true">
                    <ProcessLineArt step={step.n} />
                  </div>
                </div>
                <div className="process-art-card__body">
                  <h3 className="art-card__title">{step.title}</h3>
                  <p className="art-card__desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Portofolio Karya Nyata — Kiblat Layanan.tsx */}
      <section className="section layanan-artistic-section" aria-labelledby="portfolio-heading">
        <div className="container">
          <div className="section-header reveal artistic-header">
            <div className="section-tag doodle-tag"><span>Karya Terbaik</span></div>
            <h2 id="portfolio-heading" className="section-title artistic-title">
              Hasil Karya yang Telah Go-Live
              <ScribbleUnderline variant="wavy" />
            </h2>
            <p className="section-subtitle artistic-subtitle">
              Lihat bagaimana klien kami bertransformasi dan meningkatkan kepercayaan calon pembeli.
            </p>
          </div>

          <div className="portfolio-preview-grid">
            {portfolio.slice(0, 3).map((item, i) => (
              <PortfolioPreviewCard key={item.id} item={item} delay={i + 1} />
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
            <NavLink to="/portofolio" className="art-card__btn-doodle">
              <span>Lihat Semua Portofolio</span>
              <svg className="art-card__btn-arrow" width="22" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M 2 7 Q 10 3, 18 7 M 15 2 L 21 7 L 15 12" />
              </svg>
            </NavLink>
          </div>
        </div>
      </section>

      {/* 6. Produk Pipeline 2026 — Kiblat Layanan.tsx */}
      <section className="section section--tint layanan-artistic-section" aria-labelledby="products-heading">
        <div className="container">
          <div className="section-header reveal artistic-header">
            <div className="section-tag doodle-tag"><span>Pipeline 2026</span></div>
            <h2 id="products-heading" className="section-title artistic-title">
              Produk Digital yang Sedang Kami Bangun
              <ScribbleUnderline variant="arc" />
            </h2>
            <p className="section-subtitle artistic-subtitle">
              Produk-produk ini dirancang khusus untuk kebutuhan bisnis lokal Indonesia.
            </p>
          </div>
          <div className="artistic-grid">
            {products.map((p, i) => (
              <NavLink
                key={p.id}
                to="/produk"
                className={`art-card art-card--v${(i % 4) + 1} reveal reveal--delay-${i + 1}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="art-card__top">
                  <div className="art-card__illustration" aria-hidden="true" style={{ fontSize: '2.2rem' }}>
                    {p.icon}
                  </div>
                  <DoodleBadge text={p.status} shape={i % 2 === 0 ? 'tape' : 'cloud'} />
                </div>
                <div className="art-card__content">
                  <h3 className="art-card__title">{p.title}</h3>
                  <p className="art-card__desc">{p.tagline}</p>
                </div>
                <div className="art-card__footer">
                  <span className="art-card__btn-doodle">
                    <span>Pelajari Lebih Lanjut</span>
                    <svg className="art-card__btn-arrow" width="22" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M 2 7 Q 10 3, 18 7 M 15 2 L 21 7 L 15 12" />
                    </svg>
                  </span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Paket Harga Transparan — Kiblat Layanan.tsx (layanan-packages) */}
      <section className="section layanan-packages" aria-labelledby="packages-heading">
        <div className="container">
          <div className="section-header reveal artistic-header">
            <div className="section-tag doodle-tag"><span>Investasi Jelas</span></div>
            <h2 id="packages-heading" className="section-title artistic-title">
              Harga Transparan, Scope Jelas
              <ScribbleUnderline variant="double" />
            </h2>
            <p className="section-subtitle artistic-subtitle">
              Harga sekali bayar (bukan langganan bulanan). Scope dan revisi disepakati di awal.
            </p>
          </div>
          <div className="packages-grid artistic-packages-grid">
            {packages.map((pkg, i) => (
              <div
                key={pkg.id}
                className={`art-card package-art-card art-card--v${(i % 3) + 1} reveal reveal--delay-${i + 1}${pkg.highlighted ? ' art-card--featured' : ''}`}
              >
                {pkg.highlighted && (
                  <DoodleBadge text="Paling Dipilih" popular shape="tape" />
                )}
                <div className="package-art-card__header">
                  <h3 className="art-card__title">{pkg.name}</h3>
                  <div className="package-art-card__price">{pkg.price}</div>
                  <p className="art-card__desc">{pkg.tagline}</p>
                </div>
                <ul className="package-art-card__features" role="list">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="art-card__tag-doodle">
                      <span className="art-card__tag-bullet">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <div className="art-card__footer">
                  <NavLink to="/kontak" className="art-card__btn-doodle">
                    <span>Pilih Paket</span>
                    <svg className="art-card__btn-arrow" width="22" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M 2 7 Q 10 3, 18 7 M 15 2 L 21 7 L 15 12" />
                    </svg>
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Final CTA Banner — Kiblat Layanan.tsx */}
      <section className="section section--tint layanan-artistic-section" aria-labelledby="cta-heading">
        <div className="container">
          <div className="art-card art-card--v1 art-card--featured reveal" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
            <div className="section-tag doodle-tag" style={{ marginBottom: '1.25rem' }}>
              <span>Konsultasi Gratis</span>
            </div>
            <h2 id="cta-heading" className="section-title artistic-title" style={{ display: 'block', margin: '0 auto 1rem' }}>
              Siap Memulai Website Bisnis Anda?
              <ScribbleUnderline variant="zigzag" />
            </h2>
            <p className="section-subtitle artistic-subtitle" style={{ maxWidth: '580px', margin: '0 auto 2rem' }}>
              Diskusi awal gratis dan tanpa komitmen. Tim IDKA Solutions siap membantu merancang website yang tepat untuk bisnis Anda.
            </p>
            <div className="apple-hero__actions">
              <a
                href={WA_CTA}
                target="_blank"
                rel="noopener noreferrer"
                className="art-card__btn-doodle"
              >
                <span>💬 Chat WhatsApp</span>
                <svg className="art-card__btn-arrow" width="22" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M 2 7 Q 10 3, 18 7 M 15 2 L 21 7 L 15 12" />
                </svg>
              </a>
              <NavLink to="/kontak" className="art-card__btn-doodle">
                <span>Isi Brief Proyek</span>
                <svg className="art-card__btn-arrow" width="22" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M 2 7 Q 10 3, 18 7 M 15 2 L 21 7 L 15 12" />
                </svg>
              </NavLink>
            </div>
            <p className="apple-hero__proof" style={{ marginTop: '1.25rem' }}>
              Konsultasi gratis · Tanpa komitmen · Brief proyek terarah
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}
