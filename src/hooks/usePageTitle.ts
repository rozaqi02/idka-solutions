import { useEffect } from 'react'

export const SITE_URL = 'https://idkasolutions.netlify.app'
export const BASE_TITLE = 'IDKA Solutions'
export const BASE_DESC =
  'IDKA Solutions membantu UMKM, personal brand, dan startup membangun website modern yang fungsional dan siap mendukung pertumbuhan bisnis.'
export const HOME_TITLE = 'IDKA Solutions | Jasa Website Profesional untuk Bisnis'

type MetaOptions = {
  /** Short page name, or full document title when `fullTitle` is true */
  title: string
  description?: string
  /** When true, use `title` as-is (for homepage SEO title) */
  fullTitle?: boolean
  /** Path for canonical/OG url, e.g. "/layanan". Defaults to current pathname. */
  path?: string
  /** Set robots meta (e.g. "noindex, follow" on 404) */
  robots?: string
}

function setMetaByName(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.name = name
    document.head.appendChild(el)
  }
  el.content = content
}

function setMetaByProperty(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.content = content
}

function setCanonical(url: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.rel = 'canonical'
    document.head.appendChild(el)
  }
  el.href = url
}

function normalizePath(path: string): string {
  if (!path || path === '/') return '/'
  return path.endsWith('/') ? path.slice(0, -1) : path
}

export function usePageTitle({
  title,
  description,
  fullTitle = false,
  path,
  robots,
}: MetaOptions) {
  useEffect(() => {
    const full = fullTitle ? title : `${title} | ${BASE_TITLE}`
    const desc = description ?? BASE_DESC
    const routePath = normalizePath(path ?? window.location.pathname)
    const pageUrl =
      routePath === '/' ? `${SITE_URL}/` : `${SITE_URL}${routePath}`

    document.title = full
    setMetaByName('description', desc)
    setCanonical(pageUrl)

    // Open Graph
    setMetaByProperty('og:title', full)
    setMetaByProperty('og:description', desc)
    setMetaByProperty('og:url', pageUrl)

    // Twitter
    setMetaByName('twitter:title', full)
    setMetaByName('twitter:description', desc)

    if (robots) {
      setMetaByName('robots', robots)
    } else {
      setMetaByName('robots', 'index, follow')
    }

    // No cleanup restore — avoids title flicker fighting the next route's effect
  }, [title, description, fullTitle, path, robots])
}
