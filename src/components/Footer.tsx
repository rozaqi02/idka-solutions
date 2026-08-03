import { NavLink } from 'react-router-dom'
import { company } from '../data/content'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        {/* Apple Business style footer links */}
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
                className="footer__social-link"
                aria-label="Instagram IDKA Solutions"
              >
                Instagram
              </a>
              <span className="footer__social-sep" aria-hidden="true">·</span>
              <a
                href={`https://wa.me/${company.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="WhatsApp IDKA Solutions"
              >
                WhatsApp
              </a>
              <span className="footer__social-sep" aria-hidden="true">·</span>
              <a
                href={`mailto:${company.email}`}
                className="footer__social-link"
                aria-label={`Email ${company.email}`}
              >
                Email
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="footer__links">
            <h3 className="footer__links-title">Halaman</h3>
            <nav aria-label="Footer navigation">
              <NavLink to="/" className="footer__link">Beranda</NavLink>
              <NavLink to="/layanan" className="footer__link">Layanan</NavLink>
              <NavLink to="/produk" className="footer__link">Produk</NavLink>
              <NavLink to="/portofolio" className="footer__link">Portofolio</NavLink>
              <NavLink to="/tentang" className="footer__link">Tentang Kami</NavLink>
              <NavLink to="/kontak" className="footer__link">Kontak</NavLink>
            </nav>
          </div>

          {/* Services */}
          <div className="footer__links">
            <h3 className="footer__links-title">Layanan</h3>
            <nav aria-label="Footer layanan">
              <NavLink to="/layanan#website-profil" className="footer__link">Website Profil</NavLink>
              <NavLink to="/layanan#website-profil" className="footer__link">Landing Page</NavLink>
              <NavLink to="/layanan#website-katalog" className="footer__link">Website Katalog & Toko</NavLink>
              <NavLink to="/layanan#website-profil" className="footer__link">Website Portofolio</NavLink>
              <NavLink to="/layanan#maintenance" className="footer__link">Maintenance</NavLink>
            </nav>
          </div>

          {/* Contact */}
          <div className="footer__links">
            <h3 className="footer__links-title">Kontak</h3>
            <a
              href={`https://wa.me/${company.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              WhatsApp
            </a>
            <a href={`mailto:${company.email}`} className="footer__link">
              {company.email}
            </a>
            <NavLink to="/kontak" className="footer__cta-link">
              Mulai Proyek →
            </NavLink>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            Copyright &copy; {year} IDKA Solutions. All rights reserved.
          </p>
          <span className="footer__bottom-link">Dibuat untuk bisnis yang ingin tumbuh dengan jelas.</span>
        </div>
      </div>
    </footer>
  )
}
