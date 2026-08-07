import { useEffect, useState, useCallback, type CSSProperties } from 'react'
import { portfolio } from '../data/content'

const INTERVAL_MS = 3500

function stripUrl(url: string) {
  return url.replace(/^https?:\/\//, '')
}

/** Prefer WebP; fall back to PNG when the browser/file fails. */
function screenshotCandidates(src: string): string[] {
  if (!src) return []
  if (src.endsWith('.webp')) {
    return [src, src.replace(/\.webp$/i, '.png')]
  }
  return [src]
}

export default function HeroPortfolioShowcase() {
  const [index, setIndex] = useState(0)
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({})

  // Preload all portfolio screenshots
  useEffect(() => {
    portfolio.forEach((p) => {
      screenshotCandidates(p.screenshot).forEach((src) => {
        const img = new Image()
        img.src = src
      })
    })
  }, [])

  // Automatic slideshow on all devices (mobile & desktop), uninterrupted by hover
  useEffect(() => {
    if (portfolio.length <= 1) return
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % portfolio.length)
    }, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [])

  const goTo = useCallback((i: number) => {
    setIndex(i)
  }, [])

  const current = portfolio[index] ?? portfolio[0]
  if (!current) return null

  const accent = current.color || '#5e17eb'

  return (
    <div
      className="hero-porto hero-porto--rich"
      style={{ '--hero-porto-accent': accent } as CSSProperties}
    >
      <div className="hero-porto__stage">
        <span className="hero-porto__glow" aria-hidden="true" />

        <div className="hero__card-main neu-raised-lg hero-porto__card">
          <div className="hero__card-header">
            <div className="hero__card-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <span className="hero__card-label hero-porto__label" title={stripUrl(current.url)}>
              <span key={`url-${current.id}`} className="hero-porto__label-text">
                {stripUrl(current.url)}
              </span>
            </span>
          </div>

          <div className="hero__card-shot hero-porto__shot">
            {/* Background grid texture */}
            <div className="hero-porto__shot-bg" aria-hidden="true" />

            {/* Stacked image layers for ultra-smooth crossfade & subtle scale zoom */}
            {portfolio.map((item, i) => {
              const isActive = i === index
              const candidateList = screenshotCandidates(item.screenshot)
              const src = failedImages[item.id] && candidateList[1] ? candidateList[1] : candidateList[0]

              return (
                <img
                  key={item.id}
                  src={src}
                  alt={`Screenshot ${item.title}`}
                  width={800}
                  height={500}
                  className={`hero-porto__image ${
                    isActive ? 'hero-porto__image--active' : 'hero-porto__image--inactive'
                  }`}
                  decoding="async"
                  fetchPriority={isActive ? 'high' : 'low'}
                  loading="eager"
                  draggable={false}
                  onError={() => {
                    if (!failedImages[item.id]) {
                      setFailedImages((prev) => ({ ...prev, [item.id]: true }))
                    }
                  }}
                />
              )
            })}

            {/* Progress bar per slide */}
            <span
              key={`progress-${current.id}`}
              className="hero-porto__progress"
              aria-hidden="true"
            />

            <span className="sr-only">
              Portofolio: {current.title} — {current.category}
            </span>
          </div>

          <div className="hero-porto__meta" aria-hidden="true">
            <span
              key={`icon-${current.id}`}
              className="hero-porto__meta-icon"
              style={{
                boxShadow: `inset 0 0 0 1.5px ${accent}33, var(--shadow-neu-inset-sm)`,
              }}
            >
              {current.icon}
            </span>
            <span key={`text-${current.id}`} className="hero-porto__meta-text">
              <span className="hero-porto__meta-title">{current.title}</span>
              <span className="hero-porto__meta-cat" style={{ color: accent }}>
                {current.category}
              </span>
            </span>
          </div>
        </div>
      </div>

      {portfolio.length > 1 && (
        <div className="hero-porto__dots" role="group" aria-label="Pilih portofolio">
          {portfolio.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={i === index}
              aria-label={item.title}
              className={`hero-porto__dot${i === index ? ' hero-porto__dot--active' : ''}`}
              style={
                i === index
                  ? { background: accent, boxShadow: `0 0 0 3px ${accent}22` }
                  : undefined
              }
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}

      <div className="hero__float hero__float--1" aria-hidden="true">
        <span className="hero__float-icon" aria-hidden="true">
          &#10003;
        </span>
        <span>Website Live</span>
      </div>
    </div>
  )
}
