import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, useLocation } from 'react-router-dom'
import { company } from '../data/content'
import './Navbar.css'

/* Inline SVG scribble underline for active desktop nav link */
function NavScribble() {
  return (
    <svg
      className="localnav__scribble"
      viewBox="0 0 80 10"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M 2 7 C 18 2, 38 9, 58 4 C 68 2, 74 7, 78 5"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const navLinks = [
  { to: '/', label: 'Beranda' },
  { to: '/layanan', label: 'Layanan' },
  { to: '/produk', label: 'Produk' },
  { to: '/portofolio', label: 'Portofolio' },
  { to: '/tentang', label: 'Tentang' },
  { to: '/kontak', label: 'Kontak' },
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 8)
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
    'Halo IDKA Solutions, saya ingin konsultasi website.'
  )}`

  const mobileDrawer =
    portalReady &&
    createPortal(
      <>
        {/* Dim backdrop */}
        <div
          className={`localnav-backdrop${menuOpen ? ' localnav-backdrop--visible' : ''}`}
          aria-hidden="true"
          onClick={closeMenu}
        />

        {/* Right-side sidebar drawer */}
        <div
          ref={mobileMenuRef}
          id="localnav-mobile-menu"
          className={`localnav-sidebar${menuOpen ? ' localnav-sidebar--open' : ''}`}
          aria-hidden={!menuOpen}
          role="dialog"
          aria-modal={menuOpen}
          aria-label="Menu navigasi"
        >
          {/* Sidebar header */}
          <div className="localnav-sidebar__header">
            <NavLink to="/" className="localnav-sidebar__logo" onClick={closeMenu} tabIndex={menuOpen ? 0 : -1}>
              <img
                src="/logo-idka-solutions-nav.png"
                alt="IDKA Solutions"
                height={30}
                width={100}
                decoding="async"
              />
            </NavLink>
            <button
              type="button"
              className="localnav-sidebar__close"
              onClick={closeMenu}
              aria-label="Tutup menu"
              tabIndex={menuOpen ? 0 : -1}
            >
              {/* X icon — continuous line art */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M 3 3 L 17 17 M 17 3 L 3 17" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav aria-label="Navigasi mobile" className="localnav-sidebar__nav">
            {navLinks.map((link, i) => (
              <NavLink
                key={link.to}
                to={link.to}
                tabIndex={menuOpen ? 0 : -1}
                className={({ isActive }) =>
                  `localnav-sidebar__link${isActive ? ' localnav-sidebar__link--active' : ''}`
                }
                end={link.to === '/'}
                onClick={closeMenu}
              >
                <span className="localnav-sidebar__link-num">0{i + 1}</span>
                <span className="localnav-sidebar__link-label">{link.label}</span>
                {/* Scribble arrow */}
                <svg className="localnav-sidebar__link-arrow" width="20" height="12" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M 2 7 Q 10 3, 18 7 M 15 2 L 21 7 L 15 12" />
                </svg>
              </NavLink>
            ))}
          </nav>

          {/* Footer CTA */}
          <div className="localnav-sidebar__footer">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="localnav-mobile__cta"
              tabIndex={menuOpen ? 0 : -1}
              onClick={closeMenu}
            >
              Konsultasi Gratis
            </a>
            <p className="localnav-sidebar__tagline">Respon dalam 1–3 jam kerja</p>
          </div>
        </div>
      </>,
      document.body
    )

  return (
    <header
      className={[
        'localnav',
        scrolled ? 'localnav--scrolled' : '',
        menuOpen ? 'localnav--menu-open' : '',
      ].filter(Boolean).join(' ')}
      role="banner"
    >
      <div className="localnav__wrapper">
        <div className="localnav__content">
          {/* Logo / Title */}
          <div className="localnav__title">
            <NavLink to="/" className="localnav__title-link" onClick={closeMenu}>
              <img
                src="/logo-idka-solutions-nav.png"
                alt="IDKA Solutions"
                className="localnav__logo-img"
                width={120}
                height={44}
                decoding="async"
              />
            </NavLink>
          </div>

          {/* Desktop Nav Links */}
          <nav className="localnav__menu" aria-label="Navigasi utama">
            <ul className="localnav__menu-items" role="list">
              {navLinks.map((link) => (
                <li key={link.to} className="localnav__menu-item">
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `localnav__menu-link${isActive ? ' localnav__menu-link--active' : ''}`
                    }
                    end={link.to === '/'}
                  >
                    {link.label}
                    <NavScribble />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop CTA */}
          <div className="localnav__actions">
            <NavLink to="/kontak" className="localnav__cta-btn">
              Konsultasi Gratis
            </NavLink>

            {/* Mobile Hamburger */}
            <button
              ref={hamburgerRef}
              type="button"
              className={`localnav__hamburger${menuOpen ? ' localnav__hamburger--open' : ''}`}
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="localnav-mobile-menu"
              aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            >
              <span className="localnav__hamburger-box" aria-hidden="true">
                <span className="localnav__hamburger-line" />
                <span className="localnav__hamburger-line" />
                <span className="localnav__hamburger-line" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {mobileDrawer}
    </header>
  )
}
