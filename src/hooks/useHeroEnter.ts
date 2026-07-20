import { useEffect } from 'react'

/**
 * One-shot hero entrance for [data-hero-enter="variant"].
 * - Desktop: creative per-route keyframes (see hero-enter.css)
 * - Mobile / coarse pointer: .hero-in--lite (opacity + translate only)
 * - After ~1.1s: .hero-in--settled drops will-change for cheap scrolling
 */
export function useHeroEnter() {
  useEffect(() => {
    const roots = document.querySelectorAll<HTMLElement>('[data-hero-enter]')
    if (roots.length === 0) return

    const liteMq = window.matchMedia(
      '(max-width: 768px), (prefers-reduced-motion: reduce), (hover: none) and (pointer: coarse)',
    )
    const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)')

    let cancelled = false
    let settleTimer = 0

    const applyLite = () => {
      roots.forEach((el) => {
        el.classList.toggle('hero-in--lite', liteMq.matches)
      })
    }
    applyLite()

    const play = () => {
      if (cancelled) return
      roots.forEach((el) => {
        el.classList.remove('hero-in--play', 'hero-in--settled')
        void el.offsetWidth
        if (reduceMq.matches) {
          // Skip animation — CSS reduced-motion already forces final state
          el.classList.add('hero-in--play', 'hero-in--settled')
          return
        }
        el.classList.add('hero-in--play')
      })

      window.clearTimeout(settleTimer)
      // Patterns + text: allow full enter (~1.4s) then settle for scroll perf
      settleTimer = window.setTimeout(() => {
        if (cancelled) return
        roots.forEach((el) => el.classList.add('hero-in--settled'))
      }, liteMq.matches ? 900 : 1600)
    }

    const id1 = requestAnimationFrame(() => {
      requestAnimationFrame(play)
    })
    const t = window.setTimeout(play, 90)

    const onLiteChange = () => applyLite()
    liteMq.addEventListener('change', onLiteChange)

    return () => {
      cancelled = true
      cancelAnimationFrame(id1)
      window.clearTimeout(t)
      window.clearTimeout(settleTimer)
      liteMq.removeEventListener('change', onLiteChange)
    }
  }, [])
}
