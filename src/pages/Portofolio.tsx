import { useState, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { portfolio } from '../data/content'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useHeroEnter } from '../hooks/useHeroEnter'
import { usePageTitle } from '../hooks/usePageTitle'
import WordReveal from '../components/WordReveal'
import ScribbleUnderline from '../components/ScribbleUnderline'
import ContinuousLineArt from '../components/ContinuousLineArt'
import './Portofolio.css'

function webpToPngFallback(src: string) {
  return src.endsWith('.webp') ? src.replace(/\.webp$/i, '.png') : src
}

function PortoImage({ src, alt, width, height }: { src: string; alt: string; width?: number; height?: number }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)

  const imgRef = useCallback((node: HTMLImageElement | null) => {
    if (!node) return
    if (node.complete && node.naturalWidth > 0) {
      setLoaded(true)
    }
  }, [])

  const handleError = () => {
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
    <div className="layanan-page porto-page">
      {/* Apple Business Light Page Header */}
      <section className="apple-hero section artistic-hero" aria-labelledby="porto-heading" data-hero-enter="portofolio">
        <div className="container">
          <div className="apple-hero__inner">
            <div className="apple-hero__eyebrow hero-in__item hero-in__item--tag doodle-tag">
              <span>Portofolio Web &amp; Mobile App</span>
            </div>
            <h1 id="porto-heading" className="apple-hero__title hero-in__item hero-in__item--title artistic-title">
              <WordReveal>Portofolio Karya</WordReveal>{' '}
              <WordReveal className="apple-hero__title-accent">&amp; Hasil Kerja Nyata.</WordReveal>
              <ScribbleUnderline variant="double" />
            </h1>
            <p className="apple-hero__subtitle hero-in__item hero-in__item--sub">
              Dari UMKM lokal hingga perusahaan startup — jelajahi project website dan aplikasi mobile yang telah aktif dan berkembang.{' '}
              <strong className="apple-text-bold">Semua kebutuhan digital, dalam satu langkah yang jelas.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section section--tint layanan-artistic-section porto-grid-section" aria-labelledby="porto-grid-heading">
        <div className="container">
          {/* Filter Bar */}
          <div className="porto-filters" role="group" aria-label="Filter kategori portofolio">
            {allCategories.map((cat) => (
              <button
                key={cat}
                className={`porto-filter-btn art-card__tag-doodle${activeFilter === cat ? ' porto-filter-btn--active' : ''}`}
                onClick={() => setActiveFilter(cat)}
                aria-pressed={activeFilter === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="porto-grid" role="list">
            {filtered.map((item, i) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`porto-card art-card art-card--v${(i % 4) + 1} reveal`}
                role="listitem"
                aria-label={`${item.title} - kunjungi website`}
              >
                {/* Visual macOS Browser Mockup */}
                <div className="porto-card__visual">
                  <div className="porto-card__browser">
                    <div className="porto-card__browser-bar" aria-hidden="true">
                      <div className="porto-card__browser-dots">
                        <span className="dot--red" />
                        <span className="dot--yellow" />
                        <span className="dot--green" />
                      </div>
                      {'url' in item && item.url ? (
                        <div className="porto-card__browser-url-text">
                          {(item.url as string).replace('https://', '')}
                        </div>
                      ) : (
                        <div className="porto-card__browser-url" />
                      )}
                    </div>
                    {'screenshot' in item && item.screenshot ? (
                      <PortoImage
                        src={item.screenshot as string}
                        alt={`Screenshot website ${item.title}`}
                        width={800}
                        height={500}
                      />
                    ) : (
                      <div className="porto-card__browser-placeholder">
                        <div style={{ width: 80, height: 60, opacity: 0.5 }}>
                          <ContinuousLineArt type={item.icon} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Body */}
                <div className="porto-card__body">
                  <div className="porto-card__top-meta">
                    <span className="porto-card__category">{item.category}</span>
                    {'period' in item && item.period && (
                      <span className="porto-card__period">{item.period as string}</span>
                    )}
                  </div>

                  <h2 className="porto-card__title art-card__title">{item.title}</h2>
                  <p className="porto-card__desc art-card__desc">{item.description}</p>

                  {/* Combined Tags & Tech Pills */}
                  <div className="porto-card__tags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="art-card__tag-doodle"><span className="art-card__tag-bullet">•</span> {tag}</span>
                    ))}
                    {'tech' in item && Array.isArray(item.tech) && item.tech.map((t) => (
                      <span key={t} className="art-card__tag-doodle"><span className="art-card__tag-bullet">⚙</span> {t}</span>
                    ))}
                  </div>

                  <span className="porto-card__action-link" aria-hidden="true">
                    Kunjungi Website <span aria-hidden="true">›</span>
                  </span>
                </div>
              </a>
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
      <section className="section porto-note-section">
        <div className="container">
          <div className="porto-case-note art-card art-card--v1 art-card--featured reveal reveal--scale">
            <div className="porto-case-note__icon" aria-hidden="true">🚀</div>
            <div className="porto-case-note__content">
              <h2 className="porto-case-note__title art-card__title">Portofolio Terus Bertambah</h2>
              <p className="porto-case-note__desc art-card__desc">
                Setiap proyek baru memperkaya portofolio kami. Tertarik menjadikan bisnis Anda proyek berikutnya?
              </p>
            </div>
            <NavLink to="/kontak" className="art-card__btn-doodle">
              <span>Mulai Proyek</span>
              <svg className="art-card__btn-arrow" width="22" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M 2 7 Q 10 3, 18 7 M 15 2 L 21 7 L 15 12" />
              </svg>
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  )
}
