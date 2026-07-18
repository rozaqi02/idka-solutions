import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, useLocation } from 'react-router-dom'
import { company } from '../data/content'
import './Navbar.css'

const navLinks = [
  {
    to: '/',
    label: 'Beranda',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" />
      </svg>
    ),
  },
  {
    to: '/layanan',
    label: 'Layanan',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" />
      </svg>
    ),
  },
  {
    to: '/portofolio',
    label: 'Portofolio',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 15l5-4 4 3 4-5 5 6" />
      </svg>
    ),
  },
  {
    to: '/tentang',
    label: 'Tentang',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5 19c1.2-3 3.8-4.5 7-4.5s5.8 1.5 7 4.5" />
      </svg>
    ),
  },
  {
    to: '/kontak',
    label: 'Kontak',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a3 3 0 01-3 3H8l-5 3V6a3 3 0 013-3h12a3 3 0 013 3z" />
      </svg>
    ),
  },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [portalReady, setPortalReady] = useState(false)
  const location = useLocation()
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    setPortalReady(true)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 12)
          ticking = false
        })
        ticking = true
      }
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        hamburgerRef.current?.focus()
        return
      }

      if (e.key !== 'Tab' || !mobileMenuRef.current) return
      const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    // Focus first nav link after drawer paints
    const t = window.setTimeout(() => {
      mobileMenuRef.current?.querySelector<HTMLElement>('a[href]')?.focus()
    }, 50)

    return () => {
      window.clearTimeout(t)
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const waUrl = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
    'Halo IDKA Solutions! Saya ingin konsultasi website.'
  )}`

  const mobileDrawer =
    portalReady &&
    createPortal(
      <>
        <div
          className={`navbar__backdrop${menuOpen ? ' navbar__backdrop--visible' : ''}`}
          aria-hidden="true"
          onClick={closeMenu}
        />

        <div
          ref={mobileMenuRef}
          id="navbar-mobile-menu"
          className={`navbar__mobile${menuOpen ? ' navbar__mobile--open' : ''}`}
          aria-hidden={!menuOpen}
          role="dialog"
          aria-modal={menuOpen}
          aria-label="Menu navigasi"
        >
          <div className="navbar__mobile-inner">
            <div className="navbar__mobile-head">
              <span className="navbar__mobile-kicker">Menu</span>
              <button
                type="button"
                className="navbar__mobile-close"
                onClick={closeMenu}
                tabIndex={menuOpen ? 0 : -1}
                aria-label="Tutup menu"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav aria-label="Navigasi mobile" className="navbar__mobile-nav">
              {navLinks.map((link, i) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  tabIndex={menuOpen ? 0 : -1}
                  className={({ isActive }) =>
                    `navbar__mobile-link${isActive ? ' navbar__mobile-link--active' : ''}`
                  }
                  style={{ ['--i' as string]: i }}
                  end={link.to === '/'}
                  onClick={closeMenu}
                >
                  <span className="navbar__mobile-link-icon" aria-hidden="true">
                    {link.icon}
                  </span>
                  <span className="navbar__mobile-link-label">{link.label}</span>
                  <span className="navbar__mobile-link-index" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </NavLink>
              ))}
            </nav>

            <div className="navbar__mobile-footer">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="navbar__mobile-cta"
                tabIndex={menuOpen ? 0 : -1}
                onClick={closeMenu}
              >
                Chat WhatsApp
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </a>
              <p className="navbar__mobile-note">Respon 1–3 jam · @idkasolutions</p>
            </div>
          </div>
        </div>
      </>,
      document.body
    )

  return (
    <header
      className={`navbar${scrolled ? ' navbar--scrolled' : ''}${menuOpen ? ' navbar--menu-open' : ''}`}
      role="banner"
    >
      <div className="navbar__container">
        <NavLink to="/" className="navbar__logo" aria-label="IDKA Solutions — Beranda" onClick={closeMenu}>
          <img
            src="/logo-idka-solutions.png"
            alt="IDKA Solutions"
            className="navbar__logo-img"
            width={148}
            height={36}
            decoding="async"
          />
        </NavLink>

        <nav className="navbar__nav" aria-label="Navigasi utama">
          <div className="navbar__nav-track" role="list">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                role="listitem"
                className={({ isActive }) =>
                  `navbar__link${isActive ? ' navbar__link--active' : ''}`
                }
                end={link.to === '/'}
              >
                <span className="navbar__link-label">{link.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="navbar__actions">
          <NavLink to="/kontak" className="navbar__cta-ghost">
            Mulai proyek
          </NavLink>
          <NavLink to="/kontak" className="btn btn-primary navbar__cta">
            Konsultasi gratis
            <svg
              className="navbar__cta-icon"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </NavLink>

          <button
            ref={hamburgerRef}
            type="button"
            className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="navbar-mobile-menu"
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
          >
            <span className="navbar__hamburger-box" aria-hidden="true">
              <span className="navbar__hamburger-line" />
              <span className="navbar__hamburger-line" />
              <span className="navbar__hamburger-line" />
            </span>
          </button>
        </div>
      </div>

      {mobileDrawer}
    </header>
  )
}
