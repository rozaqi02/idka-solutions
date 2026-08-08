import { NavLink } from 'react-router-dom'
import { company } from '../data/content'
import { useLanguage } from '../context/LanguageContext'
import { getT } from '../data/translations'
import { getLocalizedProducts } from '../data/getLocalizedData'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useHeroEnter } from '../hooks/useHeroEnter'
import { usePageTitle } from '../hooks/usePageTitle'
import WordReveal from '../components/WordReveal'
import ScribbleUnderline from '../components/ScribbleUnderline'
import ContinuousLineArt from '../components/ContinuousLineArt'
import HandDrawnBadge from '../components/HandDrawnBadge'
import './Produk.css'

export default function Produk() {
  useScrollReveal()
  useHeroEnter()
  const { lang } = useLanguage()
  const t = getT(lang)
  const products = getLocalizedProducts(lang)

  usePageTitle({
    title: lang === 'en' ? 'Products' : 'Produk',
    description: lang === 'en'
      ? 'IDKA Solutions digital products — SME Dashboard and Ngelamar, a personal career CRM for tracking job applications.'
      : 'Produk digital IDKA Solutions — Dashboard UMKM dan Ngelamar, personal career CRM untuk melacak lamaran kerja.',
    path: '/produk',
  })

  return (
    <div className="layanan-page produk-page">
      <section className="apple-hero section artistic-hero" aria-labelledby="produk-heading" data-hero-enter="produk">
        <div className="container">
          <div className="apple-hero__inner">
            <div className="apple-hero__eyebrow hero-in__item hero-in__item--tag doodle-tag">
              <span>{t.produk.heroEyebrow}</span>
            </div>
            <h1 id="produk-heading" className="apple-hero__title hero-in__item hero-in__item--title artistic-title">
              <WordReveal>{t.produk.heroTitle}</WordReveal>{' '}
              <WordReveal className="apple-hero__title-accent">{t.produk.heroTitleAccent}</WordReveal>
              <ScribbleUnderline variant="zigzag" />
            </h1>
            <p className="apple-hero__subtitle hero-in__item hero-in__item--sub">
              {t.produk.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="section section--tint layanan-artistic-section produk-showcase" aria-labelledby="produk-list-heading">
        <div className="container">
          <div className="section-header reveal artistic-header">
            <div className="section-tag doodle-tag">
              <span>{t.produk.showcaseSectionTag}</span>
            </div>
            <h2 id="produk-list-heading" className="section-title artistic-title">
              {t.produk.showcaseSectionTitle}
              <ScribbleUnderline variant="wavy" />
            </h2>
            <p className="section-subtitle artistic-subtitle">
              {t.produk.showcaseSectionSubtitle}
            </p>
          </div>

          <div className="produk-bento">
            {products.map((p, i) => (
              <article
                key={p.id}
                className={`produk-card art-card art-card--v${(i % 4) + 1} produk-card--${p.accent} reveal reveal--delay-${i + 1}`}
              >
                {/* Washi tape decoration */}
                <div className="doodle-tape" style={{ top: -10, left: 24 }} aria-hidden="true" />
                
                <div className="produk-card__badge-wrapper">
                  <HandDrawnBadge shape="tape">
                    <span>{p.status}</span>
                  </HandDrawnBadge>
                </div>

                <div className="produk-card__visual" aria-hidden="true">
                  {/* Continuous Line Art Background Accent */}
                  <div className="produk-card__line-art-bg">
                    <ContinuousLineArt type={p.id === 'dashboard-umkm' ? 'cpu' : 'smartphone'} />
                  </div>

                  {p.id === 'dashboard-umkm' ? (
                    <div className="produk-mock produk-mock--dashboard">
                      <div className="produk-mock__chrome">
                        <span /><span /><span />
                      </div>
                      <div className="produk-mock__body">
                        <div className="produk-mock__sidebar" />
                        <div className="produk-mock__main">
                          <div className="produk-mock__stat" />
                          <div className="produk-mock__stat" />
                          <div className="produk-mock__chart" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="produk-image-wrapper">
                      <img
                        src="/portfolio/ngelamar-app.png"
                        alt="Tampilan Asli Aplikasi Ngelamar (v1.7.6)"
                        className="produk-image-direct"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>

                <div className="produk-card__content">
                  <h3 className="produk-card__title art-card__title">
                    {p.title}
                    <ScribbleUnderline variant="arc" />
                  </h3>
                  <p className="produk-card__tagline art-card__desc">{p.tagline}</p>
                  
                  {p.downloadUrl && (
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                      <a
                        href={p.downloadUrl}
                        download={p.downloadName || 'Ngelamar.apk'}
                        className="art-card__btn-doodle"
                        style={{ width: '100%', justifyContent: 'center' }}
                      >
                        <span>{t.produk.downloadBtn} ({p.version} · {p.fileSize})</span>
                        <svg className="art-card__btn-arrow" width="22" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M 2 7 Q 10 3, 18 7 M 15 2 L 21 7 L 15 12" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="produk-cta art-card art-card--v1 art-card--featured reveal">
            <div className="doodle-tape" style={{ top: -12, right: 36 }} aria-hidden="true" />
            <p className="produk-cta__text">
              {lang === 'en'
                ? 'Interested in becoming an early user or need a similar system for your business?'
                : 'Tertarik menjadi early user atau membutuhkan sistem serupa untuk bisnis Anda?'}
            </p>
            <div className="produk-cta__actions">
              <NavLink to="/kontak" className="art-card__btn-doodle">
                <span>{lang === 'en' ? 'Contact Us' : 'Hubungi Kami'}</span>
                <svg className="art-card__btn-arrow" width="22" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M 2 7 Q 10 3, 18 7 M 15 2 L 21 7 L 15 12" />
                </svg>
              </NavLink>
              <a
                href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(t.wa.ctaConsult)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="art-card__btn-doodle"
              >
                <span>{lang === 'en' ? 'WhatsApp Chat' : 'Chat WhatsApp'}</span>
                <svg className="art-card__btn-arrow" width="22" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M 2 7 Q 10 3, 18 7 M 15 2 L 21 7 L 15 12" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


