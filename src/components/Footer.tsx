import { NavLink } from 'react-router-dom'
import { company } from '../data/content'
import { useLanguage } from '../context/LanguageContext'
import { getT } from '../data/translations'
import ScribbleUnderline from './ScribbleUnderline'
import ContinuousLineArt from './ContinuousLineArt'
import HandDrawnBadge from './HandDrawnBadge'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  const { lang } = useLanguage()
  const t = getT(lang)

  return (
    <footer className="footer-canvas" role="contentinfo">
      <div className="container">
        <div className="footer__grid">
          {/* Brand Column */}
          <div className="footer__brand">
            <div className="footer__brand-top">
              <div className="doodle-tag">
                <span>{t.footer.studioTag}</span>
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

            <p className="footer__desc">{t.footer.desc}</p>

            <div className="footer__socials">
              <a
                href={`https://instagram.com/${company.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="art-card__tag-doodle"
                aria-label="Instagram IDKA Solutions"
              >
                <span className="art-card__tag-bullet">•</span> Instagram
              </a>
              <a
                href={`https://wa.me/${company.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="art-card__tag-doodle"
                aria-label="WhatsApp IDKA Solutions"
              >
                <span className="art-card__tag-bullet">•</span> WhatsApp
              </a>
              <a
                href={`mailto:${company.email}`}
                className="art-card__tag-doodle"
                aria-label={`Email ${company.email}`}
              >
                <span className="art-card__tag-bullet">•</span> Email
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div className="footer__links">
            <h3 className="footer__links-title artistic-title">
              {t.footer.pagesTitle}
              <ScribbleUnderline variant="wavy" />
            </h3>
            <nav aria-label="Footer navigation">
              <NavLink to="/" className="footer__link">{t.footer.home}</NavLink>
              <NavLink to="/layanan" className="footer__link">{t.footer.services}</NavLink>
              <NavLink to="/produk" className="footer__link">{t.footer.products}</NavLink>
              <NavLink to="/portofolio" className="footer__link">{t.footer.portfolio}</NavLink>
              <NavLink to="/tentang" className="footer__link">{t.footer.about}</NavLink>
              <NavLink to="/kontak" className="footer__link">{t.footer.contact}</NavLink>
            </nav>
          </div>

          {/* Services Column */}
          <div className="footer__links">
            <h3 className="footer__links-title artistic-title">
              {t.footer.servicesTitle}
              <ScribbleUnderline variant="double" />
            </h3>
            <nav aria-label="Footer services">
              <NavLink to="/layanan#website-profil" className="footer__link">{t.footer.companyProfile}</NavLink>
              <NavLink to="/layanan#website-profil" className="footer__link">{t.footer.landingPage}</NavLink>
              <NavLink to="/layanan#website-katalog" className="footer__link">{t.footer.storeAndCatalog}</NavLink>
              <NavLink to="/layanan#aplikasi-mobile" className="footer__link">{t.footer.mobileApp}</NavLink>
              <NavLink to="/layanan#maintenance" className="footer__link">{t.footer.maintenance}</NavLink>
            </nav>
          </div>

          {/* Contact & CTA Column */}
          <div className="footer__links footer__cta-col">
            <h3 className="footer__links-title artistic-title">
              {t.footer.startTitle}
              <ScribbleUnderline variant="arc" />
            </h3>
            <p className="footer__cta-desc">
              {t.footer.ctaDesc}
            </p>
            <NavLink to="/kontak" className="art-card__btn-doodle">
              <span>{t.footer.ctaBtn}</span>
              <svg className="art-card__btn-arrow" width="20" height="12" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M 2 7 Q 10 3, 18 7 M 15 2 L 21 7 L 15 12" />
              </svg>
            </NavLink>

            <div className="footer__direct-contacts">
              <HandDrawnBadge shape="cloud">
                <span>{t.footer.fastResponse}</span>
              </HandDrawnBadge>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer__bottom">
          <p className="footer__copy">
            Copyright &copy; {year} IDKA Solutions. {t.misc.copyright}
          </p>
          <span className="footer__bottom-tag art-card__tag-doodle">
            {t.footer.bottomTag}
          </span>
        </div>
      </div>
    </footer>
  )
}
