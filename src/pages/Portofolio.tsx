import { useState, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { portfolio } from '../data/content'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useHeroEnter } from '../hooks/useHeroEnter'
import { usePageTitle } from '../hooks/usePageTitle'
import './Portofolio.css'

function webpToPngFallback(src: string) {
  return src.endsWith('.webp') ? src.replace(/\.webp$/i, '.png') : src
}

function PortoImage({ src, alt, width, height }: { src: string; alt: string; width?: number; height?: number }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)

  // Cached images may already be complete before onLoad is attached — detect via ref callback
  const imgRef = useCallback((node: HTMLImageElement | null) => {
    if (!node) return
    if (node.complete && node.naturalWidth > 0) {
      setLoaded(true)
    }
  }, [])

  const handleError = () => {
    // Prefer PNG if WebP fails (older browser / broken file)
    if (currentSrc.endsWith('.webp')) {
      const png = webpToPngFallback(currentSrc)
      if (png !== currentSrc) {
        setCurrentSrc(png)
        setLoaded(false)
        return
      }
    }
    setError(true)
  }

  return (
    <div className="porto-img-wrap">
      {!loaded && !error && <div className="porto-img-skeleton" aria-hidden="true" />}
      {!error ? (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          className={`porto-card__screenshot${loaded ? ' porto-card__screenshot--loaded' : ''}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={handleError}
        />
      ) : (
        <div className="porto-img-error" aria-label="Gambar tidak tersedia">
          <span aria-hidden="true">&#128247;</span>
        </div>
      )}
    </div>
  )
}

const allCategories = ['Semua', ...Array.from(new Set(portfolio.map((p) => p.category)))]

export default function Portofolio() {
  const [activeFilter, setActiveFilter] = useState('Semua')
  const [expanded, setExpanded] = useState<number | null>(null)
  useScrollReveal({ watchKey: activeFilter })
  useHeroEnter()
  usePageTitle({
    title: 'Portofolio',
    description:
      'Portofolio IDKA Solutions — dari UMKM lokal hingga startup digital. Lihat website yang telah kami bangun.',
    path: '/portofolio',
  })

  const filtered =
    activeFilter === 'Semua'
      ? portfolio
      : portfolio.filter((p) => p.category === activeFilter)

  return (
    <div className="porto-page">
      {/* Header */}
      <section className="page-header section" aria-labelledby="porto-heading" data-hero-enter="portofolio">
        <div className="container">
          <div className="page-header__inner">
            <div className="section-tag hero-in__item hero-in__item--tag">Portofolio</div>
            <h1 id="porto-heading" className="section-title hero-in__item hero-in__item--title">
              Portofolio Karya Kami
            </h1>
            <p className="section-subtitle hero-in__item hero-in__item--sub">
              Dari UMKM lokal hingga startup digital—hasil kerja yang dapat ditinjau langsung.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section porto-grid-section" aria-labelledby="porto-grid-heading">
        <div className="container">
          {/* Filter */}
          <div className="porto-filters" role="group" aria-label="Filter kategori portofolio">
            {allCategories.map((cat) => (
              <button
                key={cat}
                className={`porto-filter-btn${activeFilter === cat ? ' porto-filter-btn--active' : ''}`}
                onClick={() => setActiveFilter(cat)}
                aria-pressed={activeFilter === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="porto-grid" role="list">
            {filtered.map((item) => (
              <article key={item.id} className="porto-card neu-raised reveal" role="listitem">
                {/* Visual */}
                <div
                  className="porto-card__visual"
                  style={{ background: `linear-gradient(135deg, ${item.color}18 0%, ${item.color}35 100%)` }}
                >
                  {'screenshot' in item && item.screenshot ? (
                    <div className="porto-card__browser neu-raised">
                      <div className="porto-card__browser-bar" aria-hidden="true">
                        <div className="porto-card__browser-dots">
                          <span /><span /><span />
                        </div>
                        {'url' in item && item.url ? (
                          <div className="porto-card__browser-url-text">{(item.url as string).replace('https://', '')}</div>
                        ) : (
                          <div className="porto-card__browser-url" />
                        )}
                      </div>
                      <PortoImage
                        src={item.screenshot as string}
                        alt={`Screenshot website ${item.title}`}
                        width={800}
                        height={500}
                      />
                    </div>
                  ) : (
                    <div className="porto-card__browser neu-raised" aria-hidden="true">
                      <div className="porto-card__browser-bar">
                        <div className="porto-card__browser-dots">
                          <span /><span /><span />
                        </div>
                        <div className="porto-card__browser-url" />
                      </div>
                      <div className="porto-card__browser-body">
                        <div
                          className="porto-card__browser-hero"
                          style={{ background: `linear-gradient(135deg, ${item.color}40, ${item.color}80)` }}
                        >
                          <span className="porto-card__emoji">{item.icon}</span>
                        </div>
                        <div className="porto-card__browser-content">
                          <div className="porto-card__browser-line" />
                          <div className="porto-card__browser-line porto-card__browser-line--short" />
                          <div className="porto-card__browser-cards">
                            <div className="porto-card__browser-card" />
                            <div className="porto-card__browser-card" />
                            <div className="porto-card__browser-card" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div
                    className="porto-card__category-badge"
                    aria-label={`Kategori: ${item.category}`}
                  >
                    {item.category}
                  </div>
                </div>

                {/* Body */}
                <div className="porto-card__body">
                  {'period' in item && item.period && (
                    <div className="porto-card__period">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      {item.period as string}
                    </div>
                  )}
                  <div className="porto-card__tags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="badge">{tag}</span>
                    ))}
                  </div>
                  <h2 className="porto-card__title">{item.title}</h2>
                  <p className="porto-card__desc">{item.description}</p>

                  {'longDescription' in item && item.longDescription && (
                    <>
                      <button
                        className="porto-card__toggle"
                        onClick={() => setExpanded(expanded === item.id ? null : item.id)}
                        aria-expanded={expanded === item.id}
                      >
                        {expanded === item.id ? 'Sembunyikan detail' : 'Lihat detail lebih lanjut'}
                        <svg
                          width="14" height="14" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                          style={{ transform: expanded === item.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}
                          aria-hidden="true"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                      {expanded === item.id && (
                        <p className="porto-card__long-desc">{item.longDescription as string}</p>
                      )}
                    </>
                  )}

                  {'tech' in item && Array.isArray(item.tech) && (
                    <div className="porto-card__tech">
                      {(item.tech as string[]).map((t) => (
                        <span key={t} className="porto-card__tech-badge">{t}</span>
                      ))}
                    </div>
                  )}

                  {'url' in item && item.url && (
                    <a
                      href={item.url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="porto-card__link btn btn-primary"
                      aria-label={`Kunjungi website ${item.title}`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                      Kunjungi Website
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="porto-empty" role="status">
              <div className="porto-empty__icon" aria-hidden="true">&#128269;</div>
              <p>Tidak ada proyek dalam kategori ini.</p>
            </div>
          )}
        </div>
      </section>

      {/* Case Study Note */}
      <section className="section section--tint porto-note-section">
        <div className="container">
          <div className="porto-case-note neu-raised-lg reveal">
            <div className="porto-case-note__icon" aria-hidden="true">&#128640;</div>
            <div className="porto-case-note__content">
              <h2 className="porto-case-note__title">Portofolio Terus Bertambah</h2>
              <p className="porto-case-note__desc">
                Ini adalah sebagian dari karya kami. Setiap proyek baru memperkaya portofolio.
                Tertarik menjadikan bisnis Anda proyek berikutnya?
              </p>
              <NavLink to="/kontak" className="btn btn-primary">
                Mulai Proyek
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
