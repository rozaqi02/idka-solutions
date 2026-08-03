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
 * One-shot, non-blocking section and content reveal.
 * Sections keep their normal layout and remain scrollable while the visual entrance
 * plays once as they approach the viewport.
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

    document.querySelectorAll<HTMLElement>('main section:not([data-hero-enter])').forEach((section, index) => {
      section.classList.add('section-reveal', `section-reveal--${index % 4}`)
    })

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
        .querySelectorAll('.reveal, .reveal--left, .reveal--right, .reveal--scale, .section-reveal')
        .forEach((el) => {
          if (!el.classList.contains('reveal--visible')) {
            observer.observe(el)
          }
        })
    }

    observe()

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, watchKey])
}
