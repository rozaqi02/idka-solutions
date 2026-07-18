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

export function useScrollReveal(options: Options = {}) {
  const { threshold = 0.1, rootMargin = '0px 0px -30px 0px', watchKey } = options

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin }
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
    const t1 = setTimeout(observe, 100)
    const t2 = setTimeout(observe, 300)
    const t3 = setTimeout(observe, 600)

    // Keep watching DOM for filter re-renders / lazy content while this page is mounted
    const mutationObserver = new MutationObserver(() => {
      observe()
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [threshold, rootMargin, watchKey])
}
