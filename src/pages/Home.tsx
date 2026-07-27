import { useState, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { company, packages, portfolio } from '../data/content'
import HeroPortfolioShowcase from '../components/HeroPortfolioShowcase'
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
              Website bisnis profesional.{' '}
              <span className="apple-hero__title-accent">Lebih terpercaya & siap tumbuh.</span>
            </h1>

            {/* Apple Squircle Icon Row — Tech Stack & Tools */}
            <div className="apple-hero__icon-row hero-in__item hero-in__item--sub" aria-hidden="true">
              <div className="apple-squircle apple-squircle--react" title="React Framework">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="2.5"/><ellipse cx="12" cy="12" rx="9" ry="3.5"/><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)"/></svg>
              </div>
              <div className="apple-squircle apple-squircle--design" title="Code & UI/UX Design">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/></svg>
              </div>
              <div className="apple-squircle apple-squircle--speed" title="Super Fast Speed">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </div>
              <div className="apple-squircle apple-squircle--idka" title="IDKA Solutions">
                <span>idka</span>
              </div>
              <div className="apple-squircle apple-squircle--cloud" title="Cloud & SSL Domain">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
              </div>
              <div className="apple-squircle apple-squircle--db" title="Database & Systems">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
              </div>
              <div className="apple-squircle apple-squircle--launch" title="Instant Launch">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-3.95 11a22.35 22.35 0 0 1-3.95 2z"/><path d="M9 12H4.5"/><path d="M15 15v4.5"/></svg>
              </div>
            </div>

            <p className="apple-hero__subtitle hero-in__item hero-in__item--sub">
              Segala kebutuhan website bisnis Anda untuk mengelola kehadiran digital, menjangkau lebih banyak pelanggan, dan mendapatkan hasil nyata.{' '}
              <strong className="apple-text-bold">All in one place.</strong>
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
            </div>
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
                    <span className="apple-brand-badge">IDKA Certified</span>
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
              <span className="apple-check-circle">✓</span> All in one place.
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
