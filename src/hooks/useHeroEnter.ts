import { useEffect } from 'react'

/**
 * Triggers a one-shot hero entrance on elements with [data-hero-enter].
 * Runs once per mount (each route visit), never loops.
 */
export function useHeroEnter() {
  useEffect(() => {
    const roots = document.querySelectorAll<HTMLElement>('[data-hero-enter]')
    if (roots.length === 0) return

    let cancelled = false
    const play = () => {
      if (cancelled) return
      roots.forEach((el) => {
        // Restart safely if remounted
        el.classList.remove('hero-in--play')
        // Force reflow so animation can re-run on SPA navigations
        void el.offsetWidth
        el.classList.add('hero-in--play')
      })
    }

    // Double rAF: wait until browser paints initial (hidden) state
    const id1 = requestAnimationFrame(() => {
      requestAnimationFrame(play)
    })

    // Fallback if first frame was delayed (mobile/tab switch)
    const t = window.setTimeout(play, 80)

    return () => {
      cancelled = true
      cancelAnimationFrame(id1)
      window.clearTimeout(t)
    }
  }, [])
}
