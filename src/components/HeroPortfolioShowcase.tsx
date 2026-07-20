import { useEffect, useState, useCallback, useRef, type CSSProperties } from 'react'
import { portfolio } from '../data/content'

const INTERVAL_MS = 3200

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
  const [reduceMotion, setReduceMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [isCompact, setIsCompact] = useState(
    () =>
      typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches,
  )
  const [paused, setPaused] = useState(false)
  const [imgSrc, setImgSrc] = useState(() =>
    screenshotCandidates(portfolio[0]?.screenshot ?? '')[0] ?? '',
  )
  const [imgVisible, setImgVisible] = useState(true)
  const fadeTimer = useRef<number | null>(null)

  useEffect(() => {
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mqCompact = window.matchMedia('(max-width: 768px)')
    const sync = () => {
      setReduceMotion(mqMotion.matches)
      setIsCompact(mqCompact.matches)
    }
    sync()
    mqMotion.addEventListener('change', sync)
    mqCompact.addEventListener('change', sync)
    return () => {
      mqMotion.removeEventListener('change', sync)
      mqCompact.removeEventListener('change', sync)
    }
  }, [])

  // Preload all portfolio shots (webp + png)
  useEffect(() => {
    portfolio.forEach((p) => {
      screenshotCandidates(p.screenshot).forEach((src) => {
        const img = new Image()
        img.src = src
      })
    })
  }, [])

  const showIndex = useCallback(
    (next: number) => {
      const item = portfolio[next]
      if (!item?.screenshot) return

      const apply = () => {
        setIndex(next)
        setImgSrc(screenshotCandidates(item.screenshot)[0])
        setImgVisible(true)
      }

      if (reduceMotion) {
        apply()
        return
      }

      // Simple single-image crossfade (no multi-layer opacity bugs)
      setImgVisible(false)
      if (fadeTimer.current) window.clearTimeout(fadeTimer.current)
      fadeTimer.current = window.setTimeout(apply, 180)
    },
    [reduceMotion],
  )

  useEffect(() => {
    if (reduceMotion || paused || portfolio.length <= 1) return
    const id = window.setInterval(() => {
      showIndex((index + 1) % portfolio.length)
    }, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [reduceMotion, paused, index, showIndex])

  useEffect(() => {
    return () => {
      if (fadeTimer.current) window.clearTimeout(fadeTimer.current)
    }
  }, [])

  const goTo = useCallback(
    (i: number) => {
      if (i === index) return
      showIndex(i)
    },
    [index, showIndex],
  )

  const current = portfolio[index] ?? portfolio[0]
  if (!current) return null

  const modeClass = isCompact ? 'hero-porto--compact' : 'hero-porto--rich'
  const accent = current.color || '#5e17eb'

  const handleImgError = () => {
    const candidates = screenshotCandidates(current.screenshot)
    const next = candidates.find((c) => c !== imgSrc)
    if (next) setImgSrc(next)
  }

  return (
    <div
      className={`hero-porto ${modeClass}${reduceMotion ? ' hero-porto--static' : ''}${
        paused ? ' hero-porto--paused' : ''
      }`}
      style={{ '--hero-porto-accent': accent } as CSSProperties}
      onMouseEnter={() => !isCompact && setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => !isCompact && setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setPaused(false)
        }
      }}
    >
      <div className="hero-porto__stage">
        {!isCompact && <span className="hero-porto__glow" aria-hidden="true" />}

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

          <div className="hero__card-shot hero-porto__shot" aria-live="polite" aria-atomic="true">
            {/* Soft grid so light websites still read as a real screenshot */}
            <div className="hero-porto__shot-bg" aria-hidden="true" />

            <img
              key={current.id}
              src={imgSrc}
              alt={`Screenshot ${current.title}`}
              width={800}
              height={500}
              className={`hero-porto__image${imgVisible ? ' hero-porto__image--visible' : ''}`}
              decoding="async"
              fetchPriority="high"
              loading="eager"
              draggable={false}
              onLoad={() => setImgVisible(true)}
              onError={handleImgError}
            />

            {!reduceMotion && portfolio.length > 1 && (
              <span
                key={`progress-${current.id}-${paused ? 'p' : 'r'}`}
                className={`hero-porto__progress${paused ? ' hero-porto__progress--paused' : ''}`}
                aria-hidden="true"
              />
            )}

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

      {!isCompact && portfolio.length > 1 && (
        <div className="hero-porto__dots" role="tablist" aria-label="Pilih portofolio">
          {portfolio.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === index}
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
      <div className="hero__float hero__float--2" aria-hidden="true">
        <span key={`f-icon-${current.id}`} className="hero__float-icon" aria-hidden="true">
          {current.icon}
        </span>
        <span key={`f-title-${current.id}`} className="hero-porto__float-title">
          {current.title}
        </span>
      </div>
    </div>
  )
}
