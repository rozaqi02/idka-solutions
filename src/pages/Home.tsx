import { useState, useCallback, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { company, packages, portfolio, products } from '../data/content'
import HeroPortfolioShowcase from '../components/HeroPortfolioShowcase'
import WordReveal from '../components/WordReveal'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useHeroEnter } from '../hooks/useHeroEnter'
import { usePageTitle } from '../hooks/usePageTitle'
import './Home.css'

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

const HERO_VALUE_ICONS = [
  {
    id: 'online',
    className: 'apple-squircle--online',
    label: 'Online & mudah ditemukan',
    detail: 'Website bantu bisnis Anda muncul saat calon pelanggan mencari di Google atau dibagikan lewat link.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    id: 'chat',
    className: 'apple-squircle--chat',
    label: 'WhatsApp & chat masuk',
    detail: 'Tombol chat dan form kontak memudahkan calon klien menghubungi Anda tanpa ribet.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: 'trust',
    className: 'apple-squircle--trust',
    label: 'Terpercaya & aman',
    detail: 'Tampilan profesional dan SSL membantu membangun kredibilitas di mata pelanggan baru.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 'growth',
    className: 'apple-squircle--growth',
    label: 'Siap tumbuh',
    detail: 'Struktur website dirancang agar mudah dikembangkan seiring bisnis Anda naik level.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
  },
  {
    id: 'mobile',
    className: 'apple-squircle--mobile',
    label: 'Mobile-friendly',
    detail: 'Tampil rapi di HP, tablet, dan desktop — mayoritas pengunjung datang dari perangkat mobile.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <path d="M11 18h2" />
      </svg>
    ),
  },
  {
    id: 'launch',
    className: 'apple-squircle--launch',
    label: 'Go-live cepat',
    detail: 'Proses ringkas: brief, pengerjaan, revisi, lalu website Anda siap online.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-3.95 11a22.35 22.35 0 0 1-3.95 2z" />
        <path d="M9 12H4.5" />
        <path d="M15 15v4.5" />
      </svg>
    ),
  },
] as const

function HeroValueIcons() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const rowRef = useRef<HTMLDivElement>(null)

  // Close tooltip when tapping outside (mobile)
  useEffect(() => {
    if (!activeId) return
    const onPointerDown = (e: PointerEvent) => {
      if (!rowRef.current?.contains(e.target as Node)) {
        setActiveId(null)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [activeId])

  return (
    <div
      ref={rowRef}
      className="apple-hero__icon-row hero-in__item hero-in__item--sub"
      role="list"
      aria-label="Keunggulan website IDKA"
    >
      {HERO_VALUE_ICONS.map((item) => {
        const open = activeId === item.id
        return (
          <div
            key={item.id}
            className={`apple-squircle-wrap${open ? ' apple-squircle-wrap--open' : ''}`}
            role="listitem"
          >
            <button
              type="button"
              className={`apple-squircle ${item.className}`}
              aria-label={item.label}
              aria-describedby={`hero-tip-${item.id}`}
              aria-expanded={open}
              onClick={() => setActiveId((prev) => (prev === item.id ? null : item.id))}
              onMouseEnter={() => setActiveId(item.id)}
              onMouseLeave={() => setActiveId(null)}
              onFocus={() => setActiveId(item.id)}
              onBlur={() => setActiveId(null)}
            >
              {item.icon}
            </button>
            <div
              id={`hero-tip-${item.id}`}
              role="tooltip"
              className={`apple-squircle-tip${open ? ' apple-squircle-tip--visible' : ''}`}
            >
              <strong className="apple-squircle-tip__title">{item.label}</strong>
              <span className="apple-squircle-tip__detail">{item.detail}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function screenshotCandidates(src: string) {
  if (!src) return [] as string[]
  if (src.endsWith('.webp')) return [src, src.replace(/\.webp$/i, '.png')]
  return [src]
}

function PreviewScreenshot({
  src,
  alt,
  color,
}: {
  src: string
  alt: string
  color: string
}) {
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
        style={{
          background: `linear-gradient(145deg, ${color}33 0%, ${color}55 100%)`,
        }}
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
      fetchPriority="low"
      onLoad={(e) => {
        e.currentTarget.classList.add('portfolio-preview-card__screenshot--ready')
      }}
      onError={() => {
        if (idx + 1 < candidates.length) setIdx((i) => i + 1)
        else setFailed(true)
      }}
    />
  )
}

function PortfolioPreviewCard({
  item,
  delay,
}: {
  item: (typeof portfolio)[number]
  delay: number
}) {
  const liveUrl = item.url || '/portofolio'
  const isExternal = liveUrl.startsWith('http')
  const cardClass = `portfolio-preview-card card-hover reveal reveal--delay-${delay}`

  const visual = (
    <div className="portfolio-preview-card__visual">
      <div className="portfolio-preview-card__browser-bar" aria-hidden="true">
        <div className="portfolio-preview-card__browser-dots">
          <span className="dot--red" />
          <span className="dot--yellow" />
          <span className="dot--green" />
        </div>
        {isExternal ? (
          <div className="portfolio-preview-card__url-text">
            {liveUrl.replace('https://', '')}
          </div>
        ) : (
          <div className="portfolio-preview-card__url-bar" />
        )}
      </div>
      {item.screenshot ? (
        <PreviewScreenshot
          src={item.screenshot}
          alt={`Screenshot ${item.title}`}
          color={item.color}
        />
      ) : (
        <div className="portfolio-preview-card__placeholder">
          <span>{item.icon}</span>
        </div>
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
          <span key={tag} className="porto-tag-badge">
            {tag}
          </span>
        ))}
      </div>
      <span className="portfolio-preview-card__go">
        {isExternal ? 'Kunjungi Website' : 'Lihat Detail'} ›
      </span>
    </div>
  )

  if (isExternal) {
    return (
      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClass}
        aria-label={`${item.title} - buka website live`}
      >
        {visual}
        {body}
      </a>
    )
  }

  return (
    <NavLink
      to={liveUrl}
      className={cardClass}
      aria-label={`${item.title} - buka portofolio`}
    >
      {visual}
      {body}
    </NavLink>
  )
}

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

  return (
    <div className="home apple-business-canvas">
      {/* Apple Business Hero Section */}
      <section className="apple-hero" aria-labelledby="hero-heading" data-hero-enter="home">
        <div className="container">
          <div className="apple-hero__inner">
            <div className="apple-hero__eyebrow hero-in__item hero-in__item--title">
              IDKA Solutions
            </div>

            <h1 id="hero-heading" className="apple-hero__title hero-in__item hero-in__item--title">
              <WordReveal>Website bisnis profesional.</WordReveal>{' '}
              <WordReveal className="apple-hero__title-accent">Lebih terpercaya & siap tumbuh.</WordReveal>
            </h1>

            {/* Value icons — hover (desktop) / tap (mobile) for short info */}
            <HeroValueIcons />

            <p className="apple-hero__subtitle hero-in__item hero-in__item--sub">
              Segala kebutuhan website bisnis Anda untuk mengelola kehadiran digital, menjangkau lebih banyak pelanggan, dan mendapatkan hasil nyata.{' '}
              <strong className="apple-text-bold">Semua kebutuhan digital, dalam satu langkah yang jelas.</strong>
            </p>

            <div className="apple-hero__actions hero-in__item hero-in__item--actions">
              <a
                href={WA_HERO}
                target="_blank"
                rel="noopener noreferrer"
                className="apple-pill-btn apple-pill-btn--primary"
              >
                Mulai Konsultasi
              </a>
              <NavLink to="/layanan#packages-heading" className="apple-pill-btn apple-pill-btn--secondary">
                Lihat Paket & Harga
              </NavLink>
            </div>
            <p className="apple-hero__proof hero-in__item hero-in__item--actions">
              Konsultasi awal gratis · Respon pada jam kerja · Brief proyek terarah
            </p>
          </div>
        </div>
      </section>

      {/* Bento Section 1 */}
      <section className="apple-bento-section" aria-labelledby="services-heading">
        <div className="container">
          <div className="apple-bento-header reveal">
            <h2 id="services-heading" className="apple-bento-title">
              <span className="apple-title-emerald">Layanan utama</span> untuk efisiensi dan pertumbuhan bisnis Anda.
            </h2>
            <NavLink to="/layanan" className="apple-link-arrow">
              Lihat semua layanan
            </NavLink>
          </div>

          <div className="apple-bento-grid">
            <div className="apple-bento-row-top">
              <div className="apple-card apple-card--wide-showcase reveal">
                <div className="apple-card__content">
                  <span className="apple-card__eyebrow">Manajemen Website Terintegrasi</span>
                  <h3 className="apple-card__title">Sederhanakan kehadiran digital & sistem bisnis Anda.</h3>
                </div>
                <div className="apple-card__devices-visual">
                  <HeroPortfolioShowcase />
                </div>
              </div>

              <div className="apple-card apple-card--blue-grid reveal reveal--delay-1">
                <div className="apple-card__content">
                  <span className="apple-card__eyebrow apple-card__eyebrow--light">Integrasi Fitur Lengkap</span>
                  <h3 className="apple-card__title apple-card__title--light">
                    Hubungkan WhatsApp, Form, CMS, & Analitik dalam satu sistem.
                  </h3>
                </div>
                <div className="apple-card__app-icons-grid" aria-hidden="true">
                  <div className="apple-app-icon">💬</div>
                  <div className="apple-app-icon">📊</div>
                  <div className="apple-app-icon">⚡</div>
                  <div className="apple-app-icon">🌐</div>
                  <div className="apple-app-icon">🚀</div>
                  <div className="apple-app-icon">⚙️</div>
                  <div className="apple-app-icon">🔒</div>
                  <div className="apple-app-icon">📁</div>
                  <div className="apple-app-icon">📱</div>
                </div>
              </div>
            </div>

            {/* Full-width Photo Hero */}
            <div className="apple-card apple-card--photo-hero reveal">
              <div className="apple-card__photo-overlay" />
              <div className="apple-card__photo-content">
                <span className="apple-card__eyebrow apple-card__eyebrow--light">Keamanan & Keandalan</span>
                <h3 className="apple-card__title apple-card__title--hero-white">
                  Performa website dan sistem data bisnis Anda yang selalu terjaga 24/7.
                </h3>
              </div>
            </div>

            {/* 3-Column */}
            <div className="apple-bento-triplet">
              <div className="apple-card apple-card--blue-soft reveal">
                <span className="apple-card__eyebrow">Komunikasi Pemasaran</span>
                <h3 className="apple-card__title">Integrasi WhatsApp & Form Kontak otomatis.</h3>
                <div className="apple-card__phone-preview">
                  <div className="apple-phone-bubble">💬 Chat masuk dari calon pembeli</div>
                  <div className="apple-phone-bubble apple-phone-bubble--reply">⚡ Otomatis terhubung ke admin</div>
                </div>
              </div>

              <div className="apple-card apple-card--white reveal reveal--delay-1">
                <span className="apple-card__eyebrow">Performa & Storage</span>
                <h3 className="apple-card__title">Hosting super cepat & enkripsi SSL standar industri.</h3>
                <div className="apple-card__cloud-visual" aria-hidden="true">
                  ☁️
                </div>
              </div>

              <div className="apple-card apple-card--white reveal reveal--delay-2">
                <span className="apple-card__eyebrow">Dukungan Tim Ahli</span>
                <h3 className="apple-card__title">
                  Layanan garansi & bantuan tim <strong className="apple-text-accent">IDKA Care+</strong>.
                </h3>
                <div className="apple-card__support-list">
                  <div className="apple-support-item">
                    <span>📞</span> Konsultasi Gratis
                  </div>
                  <div className="apple-support-item">
                    <span>💬</span> Live Support WhatsApp
                  </div>
                  <div className="apple-support-item">
                    <span>🔧</span> Maintenance & Revisi
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Section 2 */}
      <section className="apple-bento-section" aria-labelledby="growth-heading">
        <div className="container">
          <div className="apple-bento-header reveal">
            <h2 id="growth-heading" className="apple-bento-title">
              <span className="apple-title-blue">Jangkau pelanggan</span> di mana pun mereka berada.
            </h2>
            <NavLink to="/portofolio" className="apple-link-arrow">
              Lihat studi kasus
            </NavLink>
          </div>

          <div className="apple-bento-grid">
            <div className="apple-bento-duo">
              <div className="apple-card apple-card--maps-bg reveal">
                <span className="apple-card__eyebrow apple-card__eyebrow--light">SEO & Peta Lokal</span>
                <h3 className="apple-card__title apple-card__title--light">
                  Tempatkan bisnis Anda di titik teratas pencarian pelanggan.
                </h3>
                <div className="apple-card__map-pin" aria-hidden="true">
                  📍 IDKA Verified Business
                </div>
              </div>

              <div className="apple-card apple-card--white reveal reveal--delay-1">
                <span className="apple-card__eyebrow">Reputasi Brand</span>
                <h3 className="apple-card__title">
                  Tampilan modern yang membuat brand Anda selalu diingat.
                </h3>
                <div className="apple-card__brand-preview">
                  <div className="apple-brand-card">
                    <strong>Bisnis Terpercaya & Profesional</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="apple-bento-duo">
              <div className="apple-card apple-card--white reveal">
                <span className="apple-card__eyebrow">Interaksi Pelanggan</span>
                <h3 className="apple-card__title">
                  Memungkinkan pelanggan reservasi, pesan produk, dan konsultasi secara instan.
                </h3>
                <div className="apple-card__action-squircles" aria-hidden="true">
                  <div className="apple-action-tile">📅 Reservasi</div>
                  <div className="apple-action-tile">🛍️ Pemesanan</div>
                  <div className="apple-action-tile">📑 Katalogue</div>
                </div>
              </div>

              <div className="apple-card apple-card--emerald reveal reveal--delay-1">
                <span className="apple-card__eyebrow apple-card__eyebrow--light">Analitik & Laporan</span>
                <h3 className="apple-card__title apple-card__title--light">
                  Dapatkan Insight berharga tentang jumlah pengunjung dan angka konversi bisnis Anda.
                </h3>
                <div className="apple-card__insight-graph" aria-hidden="true">
                  📈 Performa Naik 3.5x
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Produk Coming Soon — Apple style teaser */}
      <section className="apple-products-section" aria-labelledby="products-heading">
        <div className="container">
          <div className="apple-bento-header reveal">
            <h2 id="products-heading" className="apple-bento-title">
              <span className="apple-title-blue">Produk</span> digital yang sedang kami bangun.
            </h2>
            <NavLink to="/produk" className="apple-link-arrow">
              Lihat detail
            </NavLink>
          </div>
          <div className="apple-products-grid">
            {products.map((p, i) => (
              <NavLink
                key={p.id}
                to="/produk"
                className={`apple-product-teaser apple-product-teaser--${p.accent} reveal reveal--delay-${i + 1}`}
              >
                <span className="apple-product-teaser__badge">{p.status}</span>
                <span className="apple-product-teaser__icon" aria-hidden="true">{p.icon}</span>
                <h3 className="apple-product-teaser__title">{p.title}</h3>
                <p className="apple-product-teaser__desc">{p.tagline}</p>
              </NavLink>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section className="apple-portfolio-showcase" aria-labelledby="portfolio-heading">
        <div className="container">
          <div className="apple-portfolio-hero-card reveal">
            <div className="apple-portfolio-hero-overlay" />
            <div className="apple-portfolio-hero-content">
              <span className="apple-card__eyebrow apple-card__eyebrow--light">Karya Terbaik</span>
              <h2 id="portfolio-heading" className="apple-portfolio-hero-title">
                Jelajahi hasil karya website bisnis yang telah go-live bersama IDKA Solutions.
              </h2>
              <p className="apple-portfolio-hero-desc">
                Lihat bagaimana klien kami bertransformasi dan meningkatkan kepercayaan calon pembeli.
              </p>
              <NavLink to="/portofolio" className="apple-link-arrow apple-link-arrow--light">
                Lihat semua karya portofolio →
              </NavLink>
            </div>
          </div>

          <div className="portfolio-preview-grid apple-portfolio-grid">
            {portfolio.slice(0, 3).map((item, i) => (
              <PortfolioPreviewCard key={item.id} item={item} delay={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="apple-pricing-section" aria-labelledby="pricing-heading">
        <div className="container">
          <div className="apple-section-center-header reveal">
            <h2 id="pricing-heading" className="apple-bento-title apple-bento-title--center">
              Pilihan paket sesuai kebutuhan Anda.
            </h2>
            <p className="apple-section-subtitle">
              Harga transparan tanpa biaya tersembunyi.
            </p>
          </div>

          <div className="apple-pricing-grid">
            {packages.map((pkg, i) => (
              <div
                key={pkg.id}
                className={`apple-pricing-card reveal reveal--delay-${i + 1}${pkg.highlighted ? ' apple-pricing-card--highlighted' : ''}`}
              >
                {pkg.highlighted && (
                  <div className="apple-pricing-badge">Paling Dipilih</div>
                )}
                <div className="apple-pricing-card__icon" aria-hidden="true">
                  {i === 0 ? '☁️' : i === 1 ? '⭐' : '⚡'}
                </div>
                <h3 className="apple-pricing-card__name">{pkg.name}</h3>
                <div className="apple-pricing-card__price">{pkg.price}</div>
                <p className="apple-pricing-card__tagline">{pkg.tagline}</p>
                <ul className="apple-pricing-card__features" role="list">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="apple-pricing-card__feature">
                      <span className="apple-check">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <NavLink
                  to="/kontak"
                  className={`apple-pill-btn ${pkg.highlighted ? 'apple-pill-btn--primary' : 'apple-pill-btn--secondary'}`}
                >
                  {pkg.cta} →
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="apple-final-cta" aria-labelledby="final-cta-heading">
        <div className="container">
          <div className="apple-final-cta__inner reveal">
            <div className="apple-logo-mark apple-logo-mark--large">IDKA Solutions</div>
            <h2 id="final-cta-heading" className="apple-final-cta__title">
              Kelola website bisnis Anda.<br />
              Jangkau lebih banyak pelanggan.<br />
              Dapatkan dukungan tim ahli.
            </h2>
            <div className="apple-final-cta__badge">
              <span className="apple-check-circle">✓</span> Semua kebutuhan digital, dalam satu langkah yang jelas.
            </div>
            <div className="apple-final-cta__actions">
              <a
                href={WA_CTA}
                target="_blank"
                rel="noopener noreferrer"
                className="apple-pill-btn apple-pill-btn--primary apple-pill-btn--large"
              >
                Mulai Konsultasi Gratis
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
