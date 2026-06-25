import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './Navbar.css'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/layanan', label: 'Layanan' },
  { to: '/portofolio', label: 'Portofolio' },
  { to: '/produk', label: 'Produk' },
  { to: '/tentang', label: 'Tentang Kami' },
  { to: '/kontak', label: 'Kontak' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="banner">
      <div className="navbar__container">
        {/* Logo */}
        <NavLink to="/" className="navbar__logo" aria-label="IDKA Solutions - Beranda">
          <img
            src="/logo idka solutions (3).png"
            alt="IDKA Solutions"
            className="navbar__logo-img"
          />
        </NavLink>

        {/* Desktop Nav */}
        <nav className="navbar__nav" role="navigation" aria-label="Navigasi utama">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `navbar__link${isActive ? ' navbar__link--active' : ''}`
              }
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <div className="navbar__actions">
          <NavLink to="/kontak" className="btn btn-primary navbar__cta">
            Konsultasi Gratis
          </NavLink>

          {/* Hamburger */}
          <button
            className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`navbar__mobile${menuOpen ? ' navbar__mobile--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav role="navigation" aria-label="Navigasi mobile">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              tabIndex={menuOpen ? 0 : -1}
              className={({ isActive }) =>
                `navbar__mobile-link${isActive ? ' navbar__mobile-link--active' : ''}`
              }
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/kontak"
            tabIndex={menuOpen ? 0 : -1}
            className="btn btn-primary navbar__mobile-cta"
          >
            Konsultasi Gratis
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
