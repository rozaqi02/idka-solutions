import { useState, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { company, services, packages, portfolio, testimonials, businessFlow, stats } from '../data/content'
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

/** Reliable screenshot — eager load + PNG fallback (lazy inside opacity:0 reveal often fails). */
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
  const cardClass = `portfolio-preview-card neu-raised card-hover reveal reveal--delay-${delay}`

  const visual = item.screenshot ? (
    <div className="portfolio-preview-card__visual portfolio-preview-card__visual--screenshot">
      <div className="portfolio-preview-card__browser-bar" aria-hidden="true">
        <div className="portfolio-preview-card__browser-dots">
          <span />
          <span />
          <span />
        </div>
        {isExternal ? (
          <div className="portfolio-preview-card__url-text">
            {liveUrl.replace('https://', '')}
          </div>
        ) : (
          <div className="portfolio-preview-card__url-bar" />
        )}
      </div>
      <PreviewScreenshot
        src={item.screenshot}
        alt={`Screenshot ${item.title}`}
        color={item.color}
      />
      <div className="portfolio-preview-card__category-badge category-chip">
        {item.category}
      </div>
      {isExternal && (
        <span className="portfolio-preview-card__live" aria-hidden="true">
          Live
        </span>
      )}
    </div>
  ) : (
    <div
      className="portfolio-preview-card__visual"
      style={{
        background: `linear-gradient(135deg, ${item.color}22 0%, ${item.color}44 100%)`,
      }}
      aria-hidden="true"
    >
      <span className="portfolio-preview-card__icon">{item.icon}</span>
    </div>
  )

  const body = (
    <div className="portfolio-preview-card__body">
      <div className="portfolio-preview-card__tags">
        {item.tags.map((tag) => (
          <span key={tag} className="badge">
            {tag}
          </span>
        ))}
      </div>
      <h3 className="portfolio-preview-card__title">{item.title}</h3>
      <p className="portfolio-preview-card__desc">{item.description}</p>
      <span className="portfolio-preview-card__go">
        {isExternal ? 'Kunjungi website' : 'Lihat detail'}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
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
    <div className="home">
      {/* Hero Section */}
      <section className="hero section" aria-labelledby="hero-heading" data-hero-enter="home">
        <div className="container">
          <div className="hero__inner">
            <div className="hero__content">
              <div className="badge hero__badge hero-in__item hero-in__item--tag">
                <span className="hero__badge-dot" aria-hidden="true" />
                Mitra Digital untuk Bisnis Indonesia
              </div>
              <h1 id="hero-heading" className="hero__title hero-in__item hero-in__item--title">
                Website Profesional,{' '}
                <span className="gradient-text">Bisnis Lebih Dipercaya</span>
              </h1>
              <p className="hero__desc hero-in__item hero-in__item--sub">{company.description}</p>
              <div className="hero__actions hero-in__item hero-in__item--actions">
                <a
                  href={WA_HERO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-wa hero__btn-primary"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.557 4.116 1.529 5.843L.057 23.143a.75.75 0 00.917.916l5.356-1.461A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.91 0-3.694-.523-5.22-1.432l-.374-.222-3.88 1.058 1.087-3.797-.243-.387A9.714 9.714 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
                  </svg>
                  Konsultasi via WhatsApp
                </a>
                <NavLink to="/portofolio" className="btn btn-secondary">
                  Lihat Portofolio
                </NavLink>
              </div>
              <p className="hero__trust hero-in__item hero-in__item--extra">
                <span className="hero__trust-dot" aria-hidden="true" />
                Konsultasi gratis · Respon 1–3 jam · Tanpa komitmen
              </p>
              <div className="hero__stats hero-in__item hero-in__item--stats">
                {stats.map((s) => (
                  <div key={s.num} className="hero__stat">
                    <span className="hero__stat-num">{s.num}</span>
                    <span className="hero__stat-label">{s.labelAlt}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero__visual">
              <HeroPortfolioShowcase />
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section home-services" aria-labelledby="services-heading">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag">Layanan</div>
            <h2 id="services-heading" className="section-title">
              Solusi Website Sesuai Kebutuhan
            </h2>
            <p className="section-subtitle">
              Dari landing page hingga website kustom—kami tangani dari brief hingga go-live.
            </p>
          </div>
          <div className="home-services__grid">
            {services.slice(0, 6).map((svc, i) => (
              <NavLink
                key={svc.id}
                to={`/layanan#${svc.id}`}
                className={`service-card neu-raised card-hover reveal reveal--delay-${Math.min(i + 1, 5)}`}
                aria-label={`${svc.title} - lihat di halaman Layanan`}
              >
                <div className="service-card__icon icon-well" aria-hidden="true">
                  {svc.icon}
                </div>
                <h3 className="service-card__title">{svc.title}</h3>
                <p className="service-card__desc">{svc.description}</p>
                <span className="service-card__go" aria-hidden="true">
                  Lihat detail
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              </NavLink>
            ))}
          </div>
          <div className="home-services__cta">
            <NavLink to="/layanan" className="btn btn-secondary">
              Lihat Semua Layanan
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </NavLink>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="section section--tint home-flow" aria-labelledby="flow-heading">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag">Cara Kerja</div>
            <h2 id="flow-heading" className="section-title">
              Dari Kontak hingga Go-Live
            </h2>
            <p className="section-subtitle">
              Proses transparan dan terstruktur, dari konsultasi awal hingga website siap digunakan.
            </p>
          </div>
          <div className="home-flow__grid">
            {businessFlow.map((item, i) => (
              <div key={item.step} className={`flow-step reveal reveal--delay-${Math.min(i % 4 + 1, 5)}`}>
                <div className="flow-step__number" aria-label={`Langkah ${item.step}`}>
                  {item.step}
                </div>
                <h3 className="flow-step__label">{item.label}</h3>
                <p className="flow-step__desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="section home-pricing" aria-labelledby="pricing-heading">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag">Paket</div>
            <h2 id="pricing-heading" className="section-title">
              Harga Transparan, Tanpa Biaya Tersembunyi
            </h2>
            <p className="section-subtitle">
              Harga yang tertera adalah acuan. Proyek kustom dapat disesuaikan setelah konsultasi.
            </p>
          </div>
          <div className="pricing-grid">
            {packages.map((pkg, i) => (
              <div
                key={pkg.id}
                className={`pricing-card neu-raised card-hover reveal reveal--delay-${i + 1}${pkg.highlighted ? ' pricing-card--highlighted card-featured' : ''}`}
              >
                {pkg.highlighted && (
                  <div className="pricing-card__badge">Paling Dipilih</div>
                )}
                <h3 className="pricing-card__name">{pkg.name}</h3>
                <div className="pricing-card__price">{pkg.price}</div>
                <p className="pricing-card__tagline">{pkg.tagline}</p>
                <ul className="pricing-card__features" role="list">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="pricing-card__feature">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <NavLink
                  to="/kontak"
                  className={`btn pricing-card__btn${pkg.highlighted ? ' btn-primary' : ' btn-secondary'}`}
                >
                  {pkg.cta}
                </NavLink>
              </div>
            ))}
          </div>
          <p className="home-pricing__note">
            Belum yakin paket mana yang cocok?{' '}
            <NavLink to="/kontak" className="home-pricing__note-link">
              Konsultasi gratis
            </NavLink>
            {' '}— kami bantu rekomendasikan opsi terbaik.
          </p>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="section home-portfolio" aria-labelledby="portfolio-heading">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag">Portofolio</div>
            <h2 id="portfolio-heading" className="section-title">
              Karya yang Dapat Dilihat Langsung
            </h2>
          </div>
          <div className="portfolio-preview-grid">
            {portfolio.slice(0, 3).map((item, i) => (
              <PortfolioPreviewCard key={item.id} item={item} delay={i + 1} />
            ))}
          </div>
          <div className="home-portfolio__cta">
            <NavLink to="/portofolio" className="btn btn-secondary">
              Lihat Semua Karya
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </NavLink>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section--tint home-testimonials" aria-labelledby="testimonials-heading">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag">Testimoni</div>
            <h2 id="testimonials-heading" className="section-title">
              Apa Kata Klien
            </h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={t.id} className={`testimonial-card neu-raised card-hover reveal reveal--delay-${i + 1}`}>
                <div className="testimonial-card__stars" aria-label={`Rating ${t.rating} dari 5`}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="var(--accent)" aria-hidden="true">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="testimonial-card__content">&ldquo;{t.content}&rdquo;</p>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar" aria-hidden="true">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="testimonial-card__name">{t.name}</div>
                    <div className="testimonial-card__role">{t.role}</div>
                    {t.business && (
                      <a
                        href={`https://${t.business}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="testimonial-card__business"
                        aria-label={`Kunjungi ${t.business}`}
                      >
                        {t.business}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="home-testimonials__cta reveal">
            <p className="home-testimonials__cta-text">Siap menjadi klien berikutnya?</p>
            <NavLink to="/portofolio" className="btn btn-secondary">
              Lihat Semua Portofolio
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </NavLink>
          </div>
        </div>
      </section>

      {/* CTA Section — creative launch pad */}
      <section className="section home-cta" aria-labelledby="cta-heading">
        <div className="container">
          <div className="home-cta__card reveal reveal--scale">
            {/* Abstract field */}
            <div className="home-cta__field" aria-hidden="true">
              <span className="home-cta__glow home-cta__glow--a" />
              <span className="home-cta__glow home-cta__glow--b" />
              <span className="home-cta__glow home-cta__glow--c" />
              <span className="home-cta__ring home-cta__ring--1" />
              <span className="home-cta__ring home-cta__ring--2" />
              <span className="home-cta__ring home-cta__ring--3" />
              <span className="home-cta__grid" />
              <span className="home-cta__beam" />
              <span className="home-cta__spark home-cta__spark--1" />
              <span className="home-cta__spark home-cta__spark--2" />
              <span className="home-cta__spark home-cta__spark--3" />
              <span className="home-cta__spark home-cta__spark--4" />
            </div>

            <div className="home-cta__content">
              <div className="home-cta__eyebrow">
                <span className="home-cta__pulse" aria-hidden="true" />
                <span className="home-cta__eyebrow-text">Siap memulai?</span>
              </div>

              <h2 id="cta-heading" className="home-cta__title">
                <span className="home-cta__title-line">Bisnis Anda Layak</span>
                <span className="home-cta__title-accent">Website yang Profesional</span>
              </h2>

              <p className="home-cta__desc">
                Sampaikan kebutuhan Anda. Kami bantu merancang solusi yang tepat.
                Konsultasi pertama gratis, tanpa komitmen.
              </p>

              <ul className="home-cta__trust" aria-label="Keunggulan memulai sekarang">
                <li className="home-cta__trust-item">
                  <span className="home-cta__trust-icon" aria-hidden="true">✓</span>
                  Konsultasi gratis
                </li>
                <li className="home-cta__trust-item">
                  <span className="home-cta__trust-icon" aria-hidden="true">⚡</span>
                  Respon 1–3 jam
                </li>
                <li className="home-cta__trust-item">
                  <span className="home-cta__trust-icon" aria-hidden="true">◎</span>
                  Tanpa komitmen
                </li>
              </ul>

              <div className="home-cta__actions">
                <NavLink to="/kontak" className="btn btn-primary home-cta__btn-main">
                  Mulai Konsultasi
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                  </svg>
                </NavLink>
                <a
                  href={WA_CTA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-wa home-cta__btn-wa"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.557 4.116 1.529 5.843L.057 23.143a.75.75 0 00.917.916l5.356-1.461A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.91 0-3.694-.523-5.22-1.432l-.374-.222-3.88 1.058 1.087-3.797-.243-.387A9.714 9.714 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
                  </svg>
                  Chat WhatsApp
                </a>
              </div>

              <div className="home-cta__stats" aria-hidden="true">
                {stats.map((s) => (
                  <div key={s.num} className="home-cta__stat">
                    <span className="home-cta__stat-num">{s.num}</span>
                    <span className="home-cta__stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
