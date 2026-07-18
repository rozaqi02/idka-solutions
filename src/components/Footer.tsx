import { NavLink } from 'react-router-dom'
import { company } from '../data/content'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <img
                src="/logo-idka-solutions.png"
                alt="IDKA Solutions"
                className="footer__logo-img"
                width={160}
                height={40}
                decoding="async"
                loading="lazy"
              />
            </div>
            <p className="footer__desc">{company.description}</p>
            <div className="footer__socials">
              <a
                href={`https://instagram.com/${company.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-btn"
                aria-label="Instagram IDKA Solutions"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a
                href={`https://wa.me/${company.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-btn"
                aria-label="WhatsApp IDKA Solutions"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.557 4.116 1.529 5.843L.057 23.143a.75.75 0 00.917.916l5.356-1.461A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.91 0-3.694-.523-5.22-1.432l-.374-.222-3.88 1.058 1.087-3.797-.243-.387A9.714 9.714 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                </svg>
              </a>
              <a
                href={`mailto:${company.email}`}
                className="footer__social-btn"
                aria-label={`Email ${company.email}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="footer__links">
            <h3 className="footer__links-title">Halaman</h3>
            <nav aria-label="Footer navigation">
              <NavLink to="/" className="footer__link">Home</NavLink>
              <NavLink to="/layanan" className="footer__link">Layanan</NavLink>
              <NavLink to="/portofolio" className="footer__link">Portofolio</NavLink>
              <NavLink to="/tentang" className="footer__link">Tentang Kami</NavLink>
              <NavLink to="/kontak" className="footer__link">Kontak</NavLink>
            </nav>
          </div>

          {/* Services */}
          <div className="footer__links">
            <h3 className="footer__links-title">Layanan</h3>
            <nav aria-label="Footer layanan">
              <NavLink to="/layanan" className="footer__link">Company Profile</NavLink>
              <NavLink to="/layanan" className="footer__link">Landing Page</NavLink>
              <NavLink to="/layanan" className="footer__link">Toko Online</NavLink>
              <NavLink to="/layanan" className="footer__link">Website Portofolio</NavLink>
              <NavLink to="/layanan" className="footer__link">Maintenance</NavLink>
            </nav>
          </div>

          {/* Contact */}
          <div className="footer__links">
            <h3 className="footer__links-title">Kontak</h3>
            <a
              href={`https://wa.me/${company.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link footer__link--contact"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.557 4.116 1.529 5.843L.057 23.143a.75.75 0 00.917.916l5.356-1.461A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.91 0-3.694-.523-5.22-1.432l-.374-.222-3.88 1.058 1.087-3.797-.243-.387A9.714 9.714 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
              </svg>
              WhatsApp
            </a>
            <a href={`mailto:${company.email}`} className="footer__link footer__link--contact">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              {company.email}
            </a>
            <NavLink to="/kontak" className="btn btn-primary footer__cta">
              Mulai Proyek
            </NavLink>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            &copy; {year} IDKA Solutions. All rights reserved.
          </p>
          <p className="footer__made">
            Dibuat dengan dedikasi untuk bisnis Indonesia
          </p>
        </div>
      </div>
    </footer>
  )
}
