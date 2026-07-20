import { useEffect } from 'react'

type Options = {
  threshold?: number
  rootMargin?: string
  /**
   * Optional key that changes when the DOM of reveal targets changes
   * (e.g. portfolio filter). Prefer a primitive over an array.
   */
  watchKey?: string | number | boolean
}

/**
 * Lightweight scroll reveal.
 * Mobile: fewer timers, no MutationObserver thrash, transform/opacity only (CSS).
 */
export function useScrollReveal(options: Options = {}) {
  const { threshold = 0.08, rootMargin = '0px 0px -24px 0px', watchKey } = options

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Reduced motion: show everything immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document
        .querySelectorAll('.reveal, .reveal--left, .reveal--right, .reveal--scale')
        .forEach((el) => el.classList.add('reveal--visible'))
      return
    }

    const isMobile = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('reveal--visible')
          observer.unobserve(entry.target)
        })
      },
      {
        threshold: isMobile ? 0.05 : threshold,
        // Reveal slightly earlier on mobile so content feels ready while scrolling
        rootMargin: isMobile ? '0px 0px -12px 0px' : rootMargin,
      },
    )

    const observe = () => {
      document
        .querySelectorAll('.reveal, .reveal--left, .reveal--right, .reveal--scale')
        .forEach((el) => {
          if (!el.classList.contains('reveal--visible')) {
            observer.observe(el)
          }
        })
    }

    observe()

    // Desktop only: short re-scan for lazy layout; avoid heavy mobile timers
    const timers: number[] = []
    if (!isMobile) {
      timers.push(window.setTimeout(observe, 120))
      timers.push(window.setTimeout(observe, 400))
    } else {
      timers.push(window.setTimeout(observe, 200))
    }

    // MutationObserver only on desktop / when filter DOM changes (watchKey)
    let mutationObserver: MutationObserver | null = null
    if (!isMobile || watchKey !== undefined) {
      let mutT = 0
      mutationObserver = new MutationObserver(() => {
        window.clearTimeout(mutT)
        mutT = window.setTimeout(observe, isMobile ? 120 : 60)
      })
      mutationObserver.observe(document.body, { childList: true, subtree: true })
    }

    return () => {
      timers.forEach((id) => window.clearTimeout(id))
      observer.disconnect()
      mutationObserver?.disconnect()
    }
  }, [threshold, rootMargin, watchKey])
}
