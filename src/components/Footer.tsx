import { NavLink } from 'react-router-dom'
import { company } from '../data/content'
import ScribbleUnderline from './ScribbleUnderline'
import ContinuousLineArt from './ContinuousLineArt'
import HandDrawnBadge from './HandDrawnBadge'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer-canvas" role="contentinfo">
      <div className="container">
        <div className="footer__grid">
          {/* Brand Column */}
          <div className="footer__brand">
            <div className="footer__brand-top">
              <div className="doodle-tag">
                <span>IDKA Solutions Studio</span>
              </div>
              <div className="footer__illustration" aria-hidden="true">
                <ContinuousLineArt type="building" />
              </div>
            </div>

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
                className="art-card__tag-doodle"
                aria-label="Instagram IDKA Solutions"
              >
                <span className="art-card__tag-bullet">📸</span> Instagram
              </a>
              <a
                href={`https://wa.me/${company.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="art-card__tag-doodle"
                aria-label="WhatsApp IDKA Solutions"
              >
                <span className="art-card__tag-bullet">💬</span> WhatsApp
              </a>
              <a
                href={`mailto:${company.email}`}
                className="art-card__tag-doodle"
                aria-label={`Email ${company.email}`}
              >
                <span className="art-card__tag-bullet">✉️</span> Email
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div className="footer__links">
            <h3 className="footer__links-title artistic-title">
              Halaman
              <ScribbleUnderline variant="wavy" />
            </h3>
            <nav aria-label="Footer navigation">
              <NavLink to="/" className="footer__link">Beranda</NavLink>
              <NavLink to="/layanan" className="footer__link">Layanan</NavLink>
              <NavLink to="/produk" className="footer__link">Produk</NavLink>
              <NavLink to="/portofolio" className="footer__link">Portofolio</NavLink>
              <NavLink to="/tentang" className="footer__link">Tentang Kami</NavLink>
              <NavLink to="/kontak" className="footer__link">Kontak</NavLink>
            </nav>
          </div>

          {/* Services Column */}
          <div className="footer__links">
            <h3 className="footer__links-title artistic-title">
              Layanan
              <ScribbleUnderline variant="double" />
            </h3>
            <nav aria-label="Footer layanan">
              <NavLink to="/layanan#website-profil" className="footer__link">Company Profile</NavLink>
              <NavLink to="/layanan#website-profil" className="footer__link">Landing Page</NavLink>
              <NavLink to="/layanan#website-katalog" className="footer__link">Toko &amp; Katalog</NavLink>
              <NavLink to="/layanan#website-profil" className="footer__link">Portofolio Web</NavLink>
              <NavLink to="/layanan#maintenance" className="footer__link">Maintenance Care+</NavLink>
            </nav>
          </div>

          {/* Contact & CTA Column */}
          <div className="footer__links footer__cta-col">
            <h3 className="footer__links-title artistic-title">
              Mulai
              <ScribbleUnderline variant="arc" />
            </h3>
            <p className="footer__cta-desc">
              Siap hadirkan website profesional untuk bisnis Anda?
            </p>
            <NavLink to="/kontak" className="art-card__btn-doodle">
              <span>Mulai Proyek</span>
              <svg className="art-card__btn-arrow" width="20" height="12" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M 2 7 Q 10 3, 18 7 M 15 2 L 21 7 L 15 12" />
              </svg>
            </NavLink>

            <div className="footer__direct-contacts">
              <HandDrawnBadge shape="cloud">
                <span>💬 Fast response 1–3 jam</span>
              </HandDrawnBadge>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer__bottom">
          <p className="footer__copy">
            Copyright &copy; {year} IDKA Solutions. All rights reserved.
          </p>
          <span className="footer__bottom-tag art-card__tag-doodle">
            <span className="art-card__tag-bullet">✨</span> Dibuat untuk bisnis yang ingin tumbuh dengan jelas.
          </span>
        </div>
      </div>
    </footer>
  )
}

