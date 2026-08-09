import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { company, services, mobileAppPackage } from '../data/content'
import { useLanguage } from '../context/LanguageContext'
import { getT } from '../data/translations'
import PriceEstimator from '../components/PriceEstimator'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useHeroEnter } from '../hooks/useHeroEnter'
import { usePageTitle } from '../hooks/usePageTitle'
import WordReveal from '../components/WordReveal'
import ContinuousLineArt from '../components/ContinuousLineArt'
import ScribbleUnderline from '../components/ScribbleUnderline'
import HandDrawnBadge from '../components/HandDrawnBadge'
import './Layanan.css'

function AccordionItem({
  id,
  question,
  answer,
}: {
  id: string
  question: string
  answer: string
}) {
  const [open, setOpen] = useState(false)
  const panelId = `faq-panel-${id}`
  const buttonId = `faq-button-${id}`

  return (
    <div className={`faq-item neu-raised${open ? ' faq-item--open' : ''}`}>
      <button
        id={buttonId}
        type="button"
        className="faq-item__question"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        {question}
        <svg className="faq-item__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="faq-item__answer"
        aria-hidden={!open}
      >
        <p>{answer}</p>
      </div>
    </div>
  )
}

function ProcessLineArt({ step }: { step: string }) {
  switch (step) {
    case '01':
      return (
        <svg className="process-line-svg" viewBox="0 0 140 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path
            className="continuous-path"
            d="M 15,50 C 15,25 40,15 70,15 C 100,15 125,25 125,50 C 125,75 100,85 70,85 C 55,85 45,95 30,95 C 38,85 25,80 15,50 Z M 45,45 C 55,45 65,35 85,55 M 95,35 L 110,20 L 120,30 L 105,45"
          />
        </svg>
      )
    case '02':
      return (
        <svg className="process-line-svg" viewBox="0 0 140 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path
            className="continuous-path"
            d="M 25,20 L 115,20 L 115,70 L 25,70 Z M 10,78 L 130,78 M 45,40 C 55,30 75,50 95,35 M 40,55 L 60,55 M 70,55 L 100,55"
          />
        </svg>
      )
    case '03':
      return (
        <svg className="process-line-svg" viewBox="0 0 140 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path
            className="continuous-path"
            d="M 70,15 C 85,35 80,65 70,85 C 60,65 55,35 70,15 Z M 55,60 C 40,65 25,75 20,90 C 35,85 50,75 55,60 Z M 85,60 C 100,65 115,75 120,90 C 105,85 90,75 85,60 M 70,25 A 5 5 0 1 1 70,35 A 5 5 0 1 1 70,25"
          />
        </svg>
      )
    default:
      return null
  }
}

export default function Layanan() {
  const location = useLocation()
  useScrollReveal()
  useHeroEnter()
  const { lang } = useLanguage()
  const t = getT(lang)

  // Build translated service data map
  const svcMap: Record<string, { badge: string; title: string; desc: string }> = {
    'website-profil': { badge: t.layanan.svc_website_profil_badge, title: t.layanan.svc_website_profil_title, desc: t.layanan.svc_website_profil_desc },
    'aplikasi-mobile': { badge: t.layanan.svc_aplikasi_mobile_badge, title: t.layanan.svc_aplikasi_mobile_title, desc: t.layanan.svc_aplikasi_mobile_desc },
    'website-katalog': { badge: t.layanan.svc_website_katalog_badge, title: t.layanan.svc_website_katalog_title, desc: t.layanan.svc_website_katalog_desc },
    'website-kustom': { badge: t.layanan.svc_website_kustom_badge, title: t.layanan.svc_website_kustom_title, desc: t.layanan.svc_website_kustom_desc },
    'maintenance': { badge: t.layanan.svc_maintenance_badge, title: t.layanan.svc_maintenance_title, desc: t.layanan.svc_maintenance_desc },
  }

  const pkgs = [
    { id: 'starter', name: t.layanan.pkg_starter_name, tagline: t.layanan.pkg_starter_tagline, price: t.layanan.pkg_starter_price, highlighted: false, features: t.layanan.pkg_starter_features, cta: t.layanan.pkg_starter_cta },
    { id: 'business', name: t.layanan.pkg_business_name, tagline: t.layanan.pkg_business_tagline, price: t.layanan.pkg_business_price, highlighted: true, features: t.layanan.pkg_business_features, cta: t.layanan.pkg_business_cta },
    { id: 'premium', name: t.layanan.pkg_premium_name, tagline: t.layanan.pkg_premium_tagline, price: t.layanan.pkg_premium_price, highlighted: false, features: t.layanan.pkg_premium_features, cta: t.layanan.pkg_premium_cta },
  ]

  const maintPkgs = [{ name: t.layanan.maint_name, price: t.layanan.maint_price, features: t.layanan.maint_features }]

  usePageTitle({
    title: lang === 'en' ? 'Services' : 'Layanan',
    description: lang === 'en'
      ? 'Professional website creation services: landing pages, company profiles, online stores, and portfolios. Transparent pricing, quality results.'
      : 'Jasa pembuatan website profesional: landing page, company profile, toko online, dan portofolio. Harga transparan, hasil berkualitas.',
    path: '/layanan',
  })

  /* Deep-link: /layanan#website-profil dll. */
  useEffect(() => {
    const id = location.hash.replace(/^#/, '')
    if (!id) return
    const el = document.getElementById(id)
    if (!el) return
    const timer = window.setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.classList.add('layanan-card--highlight')
      window.setTimeout(() => el.classList.remove('layanan-card--highlight'), 2000)
    }, 120)
    return () => window.clearTimeout(timer)
  }, [location.hash])

  return (
    <div className="layanan-page">
      {/* 1. Hero */}
      <section className="apple-hero section artistic-hero" aria-labelledby="layanan-heading" data-hero-enter="layanan">
        <div className="container">
          <div className="apple-hero__inner">
            <div className="apple-hero__eyebrow hero-in__item hero-in__item--tag doodle-tag">
              <span>{t.layanan.heroEyebrow}</span>
            </div>
            <h1 id="layanan-heading" className="apple-hero__title hero-in__item hero-in__item--title artistic-title">
              <WordReveal>{t.layanan.heroTitle}</WordReveal>{' '}
              <WordReveal className="apple-hero__title-accent">{t.layanan.heroTitleAccent}</WordReveal>
              <ScribbleUnderline />
            </h1>
            <p className="apple-hero__subtitle hero-in__item hero-in__item--sub">
              {t.layanan.heroSubtitle}{' '}
              <strong className="apple-text-bold">{t.layanan.heroSubtitleBold}</strong>
            </p>
          </div>
        </div>
      </section>

      {/* 2. Apa yang kami kerjakan - Artistic Continuous Line & Scribble Section */}
      <section className="section section--tint layanan-artistic-section" aria-labelledby="all-services-heading">
        <div className="container">
          <div className="section-header reveal artistic-header">
            <div className="section-tag doodle-tag">
              <span>{t.layanan.servicesSectionTag}</span>
            </div>
            <h2 id="all-services-heading" className="section-title artistic-title">
              {t.layanan.servicesSectionTitle}
              <ScribbleUnderline variant="double" />
            </h2>
            <p className="section-subtitle artistic-subtitle">
              {t.layanan.servicesSectionSubtitle}
            </p>
          </div>

          <div className="artistic-grid">
            {services.map((svc, i) => (
              <div
                key={svc.id}
                id={svc.id}
                className={`art-card art-card--v${(i % 4) + 1} ${svc.popular ? 'art-card--featured' : ''} art-card--${svc.accent} reveal reveal--delay-${i + 1}`}
              >
                <div className="art-card__top">
                  {/* Continuous Line Art Frame */}
                  <div className="art-card__illustration" aria-hidden="true">
                    <ContinuousLineArt type={svc.icon} />
                  </div>
                  {svc.badge && (
                    <HandDrawnBadge
                      text={svcMap[svc.id]?.badge ?? svc.badge}
                      popular={svc.popular}
                      shape={i % 3 === 0 ? 'tape' : i % 3 === 1 ? 'cloud' : 'oval'}
                    />
                  )}
                </div>

                <div className="art-card__content">
                  <h3 className="art-card__title">
                    {svcMap[svc.id]?.title ?? svc.title}
                  </h3>
                  <p className="art-card__desc">{svcMap[svc.id]?.desc ?? svc.description}</p>
                </div>

                {svc.tags && svc.tags.length > 0 && (
                  <div className="art-card__tags">
                    {svc.tags.map((tag, idx) => (
                      <span key={idx} className="art-card__tag-doodle">
                        <span className="art-card__tag-bullet">•</span> {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="art-card__footer">
                  <button
                    type="button"
                    className="art-card__btn-doodle"
                    onClick={() => {
                      const targetId = svc.id === 'maintenance' ? 'maintenance-heading' : 'estimator-heading'
                      const el = document.getElementById(targetId)
                      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }}
                  >
                    <span>{t.layanan.servicesExplore}</span>
                    <svg className="art-card__btn-arrow" width="22" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M 2 7 Q 10 3, 18 7 M 15 2 L 21 7 L 15 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Cara kerja — dengan Continuous Line Process */}
      <section className="section layanan-process" aria-labelledby="process-heading">
        <div className="container">
          <div className="section-header reveal artistic-header">
            <div className="section-tag doodle-tag"><span>{t.layanan.processSectionTag}</span></div>
            <h2 id="process-heading" className="section-title artistic-title">
              {t.layanan.processSectionTitle}
              <ScribbleUnderline variant="zigzag" />
            </h2>
            <p className="section-subtitle artistic-subtitle">
              {t.layanan.processSectionSubtitle}
            </p>
          </div>
          <div className="process-list artistic-process-list">
            {[
              { n: '01', title: t.layanan.step1Title, desc: t.layanan.step1Desc },
              { n: '02', title: t.layanan.step2Title, desc: t.layanan.step2Desc },
              { n: '03', title: t.layanan.step3Title, desc: t.layanan.step3Desc },
            ].map((step, idx) => (
              <div key={step.n} className={`art-card process-art-card art-card--v${idx + 1} reveal`}>
                <div className="process-art-card__header">
                  <HandDrawnBadge
                    text={step.n === '01' ? t.layanan.step1Label : step.n === '02' ? t.layanan.step2Label : t.layanan.step3Label}
                    popular={step.n === '01'}
                    shape={idx === 0 ? 'cloud' : idx === 1 ? 'tape' : 'oval'}
                  />
                  <div className="process-art-card__illustration" aria-hidden="true">
                    <ProcessLineArt step={step.n} />
                  </div>
                </div>
                <div className="process-art-card__body">
                  <h3 className="art-card__title">{step.title}</h3>
                  <p className="art-card__desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Paket harga */}
      <section className="section section--tint layanan-packages" aria-labelledby="packages-heading">
        <div className="container">
          <div className="section-header reveal artistic-header">
            <div className="section-tag doodle-tag"><span>{t.layanan.packagesSectionTag}</span></div>
            <h2 id="packages-heading" className="section-title artistic-title">
              {t.layanan.packagesSectionTitle}
              <ScribbleUnderline variant="arc" />
            </h2>
            <p className="section-subtitle artistic-subtitle">
              {t.layanan.packagesSectionSubtitle}
            </p>
          </div>
          <div className="packages-grid artistic-packages-grid">
            {pkgs.map((pkg, i) => (
              <div
                key={pkg.id}
                className={`art-card package-art-card art-card--v${(i % 3) + 1} reveal reveal--delay-${i + 1}${pkg.highlighted ? ' art-card--featured' : ''}`}
              >
                {pkg.highlighted && (
                  <HandDrawnBadge text={t.layanan.packagesMostChosen} popular shape="tape" />
                )}
                <div className="package-art-card__header">
                  <h3 className="art-card__title">{pkg.name}</h3>
                  <div className="package-art-card__price">{pkg.price}</div>
                  <p className="art-card__desc">{pkg.tagline}</p>
                </div>
                <div className="art-card__divider" />
                <ul className="package-art-card__features" role="list">
                  {pkg.features.map((f: string, idx: number) => (
                    <li key={idx} className="art-card__tag-doodle">
                      <span className="art-card__tag-bullet">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <div className="art-card__footer">
                  <NavLink
                    to="/kontak"
                    className="art-card__btn-doodle"
                  >
                    <span>{pkg.cta}</span>
                    <svg className="art-card__btn-arrow" width="22" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M 2 7 Q 10 3, 18 7 M 15 2 L 21 7 L 15 12" />
                    </svg>
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
          <div className="art-card packages-note-art art-card--v4" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.5rem 2rem' }}>
            <div className="packages-note__icon" aria-hidden="true" style={{ width: '60px', height: '50px', color: '#5e17eb', flexShrink: 0 }}>
              <ContinuousLineArt type="bulb" />
            </div>
            <div>
              <strong className="artistic-title" style={{ fontSize: '1.15rem', color: '#1e1b4b', display: 'inline-block' }}>
                {t.layanan.packagesCustomTitle}
                <ScribbleUnderline variant="zigzag" />
              </strong>
              <p style={{ margin: '6px 0 0', color: '#4b5563', fontSize: '0.95rem' }}>
                {t.layanan.packagesCustomDesc}{' '}
                <NavLink to="/kontak" style={{ color: '#5e17eb', fontWeight: 800, textDecoration: 'underline' }}>{t.layanan.packagesCustomContact}</NavLink>{' '}
                {lang === 'en' ? 'for a matching estimate.' : 'untuk estimasi yang sesuai.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5. Section Khusus Aplikasi Mobile (Android & iOS) */}
      <section className="section layanan-mobile-app" aria-labelledby="mobile-app-heading">
        <div className="container">
          <div className="section-header reveal artistic-header">
            <div className="section-tag doodle-tag"><span>Android &amp; iOS</span></div>
            <h2 id="mobile-app-heading" className="section-title artistic-title">
              {lang === 'en' ? 'Mobile App Development (Android & iOS)' : 'Pengembangan Aplikasi Mobile (Android & iOS)'}
              <ScribbleUnderline variant="zigzag" />
            </h2>
            <p className="section-subtitle artistic-subtitle">
              {lang === 'en'
                ? 'High-performance cross-platform Flutter & React Native apps tailored for your business.'
                : 'Solusi aplikasi mobile kustom dengan performa tinggi & desain UI/UX modern untuk bisnis Anda.'}
            </p>
          </div>

          <div className="art-card art-card--v2 art-card--featured reveal" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
            <div className="mobile-app-showcase__inner" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center' }}>
              <div className="mobile-app-showcase__info">
                <HandDrawnBadge text="Android & iOS" popular shape="cloud" />
                <h3 className="art-card__title" style={{ fontSize: '1.6rem', marginTop: '0.75rem', marginBottom: '0.5rem' }}>
                  {mobileAppPackage.name}
                </h3>
                <div className="package-art-card__price" style={{ fontSize: '1.8rem', color: '#5e17eb', marginBottom: '1rem', fontWeight: 900 }}>
                  {lang === 'en' ? t.layanan.pkg_mobile_app_price : mobileAppPackage.price}
                </div>
                <p className="art-card__desc" style={{ marginBottom: '1.5rem', lineHeight: '1.6', fontSize: '0.95rem' }}>
                  {lang === 'en'
                    ? 'Custom Flutter / React Native cross-platform apps for business operations, CRM, POS, digital catalogs, and startup MVPs.'
                    : mobileAppPackage.tagline}
                </p>
                <div className="mobile-app-showcase__actions" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <NavLink to="/kontak" className="art-card__btn-doodle" style={{ background: '#5e17eb', color: '#ffffff' }}>
                    <span>{lang === 'en' ? 'Consult Mobile App →' : 'Konsultasi Mobile App →'}</span>
                  </NavLink>
                  <a
                    href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
                      lang === 'en'
                        ? 'Hello IDKA Solutions, I want to consult about Mobile App Development (Android & iOS).'
                        : 'Halo IDKA Solutions, saya ingin konsultasi mengenai Pengembangan Aplikasi Mobile (Android & iOS).'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="art-card__btn-doodle"
                  >
                    <span>{lang === 'en' ? 'Chat WhatsApp Mobile App' : 'Chat WA Mobile App'}</span>
                    <svg className="art-card__btn-arrow" width="22" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M 2 7 Q 10 3, 18 7 M 15 2 L 21 7 L 15 12" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="mobile-app-showcase__features" style={{ background: 'rgba(94, 23, 235, 0.04)', borderRadius: '20px', padding: '1.5rem', border: '1px solid rgba(94, 23, 235, 0.12)' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '1rem', color: '#1e1b4b' }}>
                  {lang === 'en' ? 'Key Features Included:' : 'Fitur & Keunggulan Utama:'}
                </h4>
                <ul className="package-art-card__features" role="list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '10px', padding: 0 }}>
                  {(lang === 'en' ? t.layanan.pkg_mobile_app_features : mobileAppPackage.features).map((f: string, idx: number) => (
                    <li key={idx} className="art-card__tag-doodle" style={{ margin: 0 }}>
                      <span className="art-card__tag-bullet">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Estimator — bantu putuskan sebelum maintenance */}
      <section className="section layanan-estimator" aria-labelledby="estimator-heading">
        <div className="container">
          <div className="section-header reveal artistic-header">
            <div className="section-tag doodle-tag"><span>{t.layanan.estimatorSectionTag}</span></div>
            <h2 id="estimator-heading" className="section-title artistic-title">
              {t.layanan.estimatorSectionTitle}
              <ScribbleUnderline variant="wavy" />
            </h2>
            <p className="section-subtitle artistic-subtitle">
              {t.layanan.estimatorSectionSubtitle}
            </p>
          </div>
          <div className="layanan-estimator__wrap art-card art-card--v2" style={{ padding: '2rem' }}>
            <PriceEstimator />
          </div>
        </div>
      </section>

      {/* 6. Maintenance — after-sales */}
      <section className="section section--tint layanan-maintenance" aria-labelledby="maintenance-heading">
        <div className="container">
          <div className="section-header reveal artistic-header">
            <div className="section-tag doodle-tag"><span>{t.layanan.maintenanceSectionTag}</span></div>
            <h2 id="maintenance-heading" className="section-title artistic-title">
              {t.layanan.maintenanceSectionTitle}
              <ScribbleUnderline variant="double" />
            </h2>
            <p className="section-subtitle artistic-subtitle">
              {t.layanan.maintenanceSectionSubtitle}
            </p>
          </div>
          <div className="maintenance-grid artistic-maintenance-grid">
            {maintPkgs.map((pkg, i) => (
              <div key={pkg.name} className={`art-card maintenance-art-card art-card--v${i + 1} reveal reveal--delay-1`}>
                <h3 className="art-card__title">{pkg.name}</h3>
                <div className="package-art-card__price">{pkg.price}</div>
                <ul className="package-art-card__features" role="list">
                  {pkg.features.map((f, idx) => (
                    <li key={idx} className="art-card__tag-doodle">
                      <span className="art-card__tag-bullet">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <div className="art-card__footer">
                  <NavLink to="/kontak" className="art-card__btn-doodle">
                    <span>{t.layanan.maintenanceConsult}</span>
                    <svg className="art-card__btn-arrow" width="22" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M 2 7 Q 10 3, 18 7 M 15 2 L 21 7 L 15 12" />
                    </svg>
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ + CTA */}
      <section className="section" aria-labelledby="faq-heading">
        <div className="container">
          <div className="section-header reveal artistic-header">
            <div className="section-tag doodle-tag"><span>{t.layanan.faqSectionTag}</span></div>
            <h2 id="faq-heading" className="section-title artistic-title">
              {t.layanan.faqSectionTitle}
              <ScribbleUnderline variant="zigzag" />
            </h2>
          </div>
          <div className="faq-list artistic-faq-list">
            {t.layanan.faq.map((item, index) => (
              <AccordionItem
                key={item.question}
                id={String(index)}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
          <div className="faq-cta art-card art-card--v3" style={{ marginTop: '3rem', textAlign: 'center' }}>
            <h3 className="art-card__title" style={{ marginBottom: '0.5rem' }}>{t.layanan.faqStillQuestion}</h3>
            <p className="art-card__desc" style={{ marginBottom: '1.5rem' }}>
              {t.layanan.faqStillDesc}
            </p>
            <div className="faq-cta__actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <NavLink to="/kontak" className="art-card__btn-doodle" style={{ background: '#5e17eb', color: '#fff' }}>
                <span>{t.layanan.faqBrief}</span>
              </NavLink>
              <a
                href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(t.wa.serviceConsult)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="art-card__btn-doodle"
              >
                <span>{t.layanan.faqChat}</span>
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
