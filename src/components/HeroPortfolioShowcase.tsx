import { useEffect, useState, useCallback, useRef, type CSSProperties } from 'react'
import { portfolio } from '../data/content'

const INTERVAL_MS = 2000

function stripUrl(url: string) {
  return url.replace(/^https?:\/\//, '')
}

export default function HeroPortfolioShowcase() {
  const [index, setIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(0)
  /* Init from viewport so mobile never paints "rich + hero-enter opacity 0" first */
  const [reduceMotion, setReduceMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [isCompact, setIsCompact] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches,
  )
  const [paused, setPaused] = useState(false)
  const [tick, setTick] = useState(0)
  const directionRef = useRef<'next' | 'prev'>('next')

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

  useEffect(() => {
    portfolio.forEach((p) => {
      if (!p.screenshot) return
      const img = new Image()
      img.src = p.screenshot
    })
  }, [])

  useEffect(() => {
    if (reduceMotion || paused || portfolio.length <= 1) return
    const id = window.setInterval(() => {
      directionRef.current = 'next'
      setIndex((i) => {
        setPrevIndex(i)
        return (i + 1) % portfolio.length
      })
      setTick((t) => t + 1)
    }, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [reduceMotion, paused])

  const goTo = useCallback(
    (i: number) => {
      if (i === index) return
      directionRef.current = i > index || (index === portfolio.length - 1 && i === 0) ? 'next' : 'prev'
      setPrevIndex(index)
      setIndex(i)
      setTick((t) => t + 1)
    },
    [index],
  )

  const current = portfolio[index] ?? portfolio[0]
  if (!current) return null

  const modeClass = isCompact ? 'hero-porto--compact' : 'hero-porto--rich'
  const dirClass =
    directionRef.current === 'prev' ? 'hero-porto--dir-prev' : 'hero-porto--dir-next'
  const accent = current.color || '#5e17eb'

  return (
    <div
      className={`hero-porto ${modeClass} ${dirClass}${reduceMotion ? ' hero-porto--static' : ''}${
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
      {/*
        Stage holds 3D transform / breathe.
        Card holds border-radius + overflow clip.
        Separating them avoids the classic "square clip around rounded card" bug.
      */}
      <div className="hero-porto__stage">
        {!isCompact && <span className="hero-porto__glow" aria-hidden="true" />}

        <div
          className={`hero__card-main neu-raised-lg hero-porto__card${
            isCompact ? '' : ' hero-in__item hero-in__item--visual'
          }`}
        >
          <div className="hero__card-header">
            <div className="hero__card-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <span className="hero__card-label hero-porto__label" title={stripUrl(current.url)}>
              <span key={`url-${current.id}-${tick}`} className="hero-porto__label-text">
                {stripUrl(current.url)}
              </span>
            </span>
          </div>

          <div className="hero__card-shot hero-porto__shot" aria-live="polite" aria-atomic="true">
            {portfolio.map((item, i) => {
              const isActive = i === index
              const isExit = i === prevIndex && i !== index
              return (
                <img
                  key={item.id}
                  src={item.screenshot}
                  alt=""
                  width={800}
                  height={500}
                  className={`hero-porto__slide${isActive ? ' hero-porto__slide--active' : ''}${
                    isExit ? ' hero-porto__slide--exit' : ''
                  }`}
                  decoding={i === 0 ? 'sync' : 'async'}
                  fetchPriority={i === 0 ? 'high' : 'low'}
                  draggable={false}
                />
              )
            })}

            {!isCompact && !reduceMotion && (
              <span key={`shine-${tick}`} className="hero-porto__shine" aria-hidden="true" />
            )}

            {!reduceMotion && portfolio.length > 1 && (
              <span
                key={`progress-${tick}-${paused ? 'p' : 'r'}`}
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
              key={`icon-${current.id}-${tick}`}
              className="hero-porto__meta-icon"
              style={{ boxShadow: `inset 0 0 0 1.5px ${accent}33, var(--shadow-neu-inset-sm)` }}
            >
              {current.icon}
            </span>
            <span key={`text-${current.id}-${tick}`} className="hero-porto__meta-text">
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

      <div className="hero__float hero__float--1 hero-in__item hero-in__item--float-1" aria-hidden="true">
        <span className="hero__float-icon" aria-hidden="true">
          &#10003;
        </span>
        <span>Website Live</span>
      </div>
      <div
        className="hero__float hero__float--2 hero-in__item hero-in__item--float-2"
        aria-hidden="true"
      >
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
