import { useEffect } from 'react'

type Options = {
  threshold?: number
  rootMargin?: string
}

export function useScrollReveal(options: Options = {}) {
  const { threshold = 0.1, rootMargin = '0px 0px -30px 0px' } = options

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
      document.querySelectorAll('.reveal, .reveal--left, .reveal--right, .reveal--scale').forEach((el) => {
        if (!el.classList.contains('reveal--visible')) {
          observer.observe(el)
        }
      })
    }

    // Observe sekarang + delay kecil untuk DOM yang baru render
    observe()
    const timer = setTimeout(observe, 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [threshold, rootMargin])
}
