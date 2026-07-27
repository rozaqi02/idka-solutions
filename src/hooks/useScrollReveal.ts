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
 * Lightweight Apple-style scroll reveal.
 * Triggers when elements scroll into ~15% of the viewport (mid-screen timing).
 */
export function useScrollReveal(options: Options = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -15% 0px', watchKey } = options

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
        threshold: isMobile ? 0.1 : threshold,
        rootMargin: isMobile ? '0px 0px -10% 0px' : rootMargin,
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

    // Desktop: re-scan timers for lazy-loaded images & filter DOM shifts
    const timers: number[] = []
    if (!isMobile) {
      timers.push(window.setTimeout(observe, 150))
      timers.push(window.setTimeout(observe, 450))
    } else {
      timers.push(window.setTimeout(observe, 200))
    }

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
