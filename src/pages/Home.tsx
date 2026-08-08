import { useState, useCallback, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { company } from '../data/content'
import { useLanguage } from '../context/LanguageContext'
import { getT } from '../data/translations'
import { getLocalizedPortfolio, getLocalizedProducts } from '../data/getLocalizedData'
import WordReveal from '../components/WordReveal'
import ScribbleUnderline from '../components/ScribbleUnderline'
import ContinuousLineArt from '../components/ContinuousLineArt'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useHeroEnter } from '../hooks/useHeroEnter'
import { usePageTitle } from '../hooks/usePageTitle'
import './Layanan.css'

const WA_BASE = 'https://wa.me/' + company.whatsapp + '?text='

/* ─── Inline DoodleBadge (same as Layanan) ─────────────────────────────── */
function DoodleBadge({ text, shape = 'oval', popular = false }: { text: string; shape?: 'oval' | 'tape' | 'cloud'; popular?: boolean }) {
  return (
    <div className={`doodle-badge doodle-badge--${shape} ${popular ? 'doodle-badge--popular' : ''}`}>
      {shape === 'oval' && (
        <svg className="doodle-badge__bg" viewBox="0 0 170 42" fill="none" preserveAspectRatio="none" aria-hidden="true">
          <path d="M 6,21 C 4,7 18,3 85,4 C 152,5 166,7 164,21 C 162,35 148,38 85,38 C 22,38 8,35 6,21 Z M 9,19 C 7,9 21,5 85,6 C 149,7 161,9 161,19 C 161,29 146,35 85,35 C 24,35 11,29 9,19 Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {shape === 'tape' && (
        <svg className="doodle-badge__bg" viewBox="0 0 170 42" fill="none" preserveAspectRatio="none" aria-hidden="true">
          <path d="M 4,8 L 166,2 L 162,36 L 8,40 Z M 2,12 L 168,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {shape === 'cloud' && (
        <svg className="doodle-badge__bg" viewBox="0 0 170 42" fill="none" preserveAspectRatio="none" aria-hidden="true">
          <path d="M 15,25 C 5,20 10,8 25,10 C 35,2 60,4 75,10 C 95,2 125,5 135,12 C 155,10 165,22 155,32 C 160,40 135,42 120,38 C 105,44 75,40 60,38 C 40,42 20,40 15,25 Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      <span className="doodle-badge__text">{text}</span>
    </div>
  )
}

/* ─── Process SVG Art ───────────────────────────────────────────────────── */
function ProcessLineArt({ step }: { step: string }) {
  switch (step) {
    case '01':
      return (
        <svg className="process-line-svg" viewBox="0 0 140 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path className="continuous-path" d="M 15,50 C 15,25 40,15 70,15 C 100,15 125,25 125,50 C 125,75 100,85 70,85 C 55,85 45,95 30,95 C 38,85 25,80 15,50 Z M 45,45 C 55,45 65,35 85,55 M 95,35 L 110,20 L 120,30 L 105,45" />
        </svg>
      )
    case '02':
      return (
        <svg className="process-line-svg" viewBox="0 0 140 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path className="continuous-path" d="M 25,20 L 115,20 L 115,70 L 25,70 Z M 10,78 L 130,78 M 45,40 C 55,30 75,50 95,35 M 40,55 L 60,55 M 70,55 L 100,55" />
        </svg>
      )
    case '03':
      return (
        <svg className="process-line-svg" viewBox="0 0 140 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path className="continuous-path" d="M 70,15 C 85,35 80,65 70,85 C 60,65 55,35 70,15 Z M 55,60 C 40,65 25,75 20,90 C 35,85 50,75 55,60 Z M 85,60 C 100,65 115,75 120,90 C 105,85 90,75 85,60 M 70,25 A 5 5 0 1 1 70,35 A 5 5 0 1 1 70,25" />
        </svg>
      )
    default:
      return null
  }
}

/* ─── Portfolio Preview Card ────────────────────────────────────────────── */
function screenshotCandidates(src: string) {
  if (!src) return [] as string[]
  if (src.endsWith('.webp')) return [src, src.replace(/\.webp$/i, '.png')]
  return [src]
}

function PreviewScreenshot({ src, alt, color }: { src: string; alt: string; color: string }) {
  const candidates = screenshotCandidates(src)
  const [idx, setIdx] = useState(0)
  const [failed, setFailed] = useState(false)
  const current = candidates[idx] ?? src

  const imgRef = useCallback((node: HTMLImageElement | null) => {
    if (node && node.complete && node.naturalWidth > 0) {
      node.classList.add('portfolio-preview-card__screenshot--ready')
    }
  }, [])

  if (failed) {
    return (
      <div
        className="portfolio-preview-card__screenshot portfolio-preview-card__screenshot--fallback"
        style={{ background: `linear-gradient(145deg, ${color}33 0%, ${color}55 100%)` }}
        role="img"
        aria-label={alt}
      />
    )
  }

  return (
    <img
      ref={imgRef}
      src={current}
      alt={alt}
      className="portfolio-preview-card__screenshot"
      width={640}
      height={400}
      loading="eager"
      decoding="async"
      onLoad={(e) => { e.currentTarget.classList.add('portfolio-preview-card__screenshot--ready') }}
      onError={() => {
        if (idx + 1 < candidates.length) setIdx((i) => i + 1)
        else setFailed(true)
      }}
    />
  )
}

type PortfolioItem = ReturnType<typeof getLocalizedPortfolio>[number]

function PortfolioPreviewCard({ item, delay }: { item: PortfolioItem; delay: number }) {
  const liveUrl = item.url || '/portofolio'
  const isExternal = liveUrl.startsWith('http')
  const cardClass = `portfolio-preview-card art-card art-card--v${(delay % 4) + 1} reveal reveal--delay-${delay}`

  const visual = (
    <div className="portfolio-preview-card__visual">
      <div className="portfolio-preview-card__browser-bar" aria-hidden="true">
        <div className="portfolio-preview-card__browser-dots">
          <span className="dot--red" />
          <span className="dot--yellow" />
          <span className="dot--green" />
        </div>
        {isExternal ? (
          <div className="portfolio-preview-card__url-text">{liveUrl.replace('https://', '')}</div>
        ) : (
          <div className="portfolio-preview-card__url-bar" />
        )}
      </div>
      {item.screenshot ? (
        <PreviewScreenshot src={item.screenshot} alt={`Screenshot ${item.title}`} color={item.color} />
      ) : (
        <div className="portfolio-preview-card__placeholder" style={{ width: 80, height: 60, opacity: 0.5, margin: '0 auto' }}>
          <ContinuousLineArt type={item.icon} />
        </div>
      )}
    </div>
  )

  const body = (
    <div className="portfolio-preview-card__body">
      <div className="portfolio-preview-card__top-meta">
        <span className="portfolio-preview-card__category">{item.category}</span>
      </div>
      <h3 className="portfolio-preview-card__title">{item.title}</h3>
      <p className="portfolio-preview-card__desc">{item.description}</p>
      <div className="portfolio-preview-card__tags">
        {item.tags.map((tag: string) => (
          <span key={tag} className="art-card__tag-doodle"><span className="art-card__tag-bullet">•</span> {tag}</span>
        ))}
      </div>
      <span className="portfolio-preview-card__go">
        {isExternal ? 'Kunjungi Website' : 'Lihat Detail'} ›
      </span>
    </div>
  )

  if (isExternal) {
    return (
      <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={cardClass} aria-label={`${item.title} - buka website live`}>
        {visual}{body}
      </a>
    )
  }
  return (
    <NavLink to={liveUrl} className={cardClass} aria-label={`${item.title} - buka portofolio`}>
      {visual}{body}
    </NavLink>
  )
}

/* ─── Hero Value Icons (doodle style) ──────────────────────────────────── */
function HeroValueIcons() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const rowRef = useRef<HTMLDivElement>(null)
  const { lang } = useLanguage()
  const t = getT(lang)

  const VALUE_ITEMS = [
    { id: 'online', label: t.home.valueOnlineLabel, detail: t.home.valueOnlineDetail },
    { id: 'chat', label: t.home.valueChatLabel, detail: t.home.valueChatDetail },
    { id: 'trust', label: t.home.valueTrustLabel, detail: t.home.valueTrustDetail },
    { id: 'growth', label: t.home.valueGrowthLabel, detail: t.home.valueGrowthDetail },
    { id: 'mobile', label: t.home.valueMobileLabel, detail: t.home.valueMobileDetail },
    { id: 'fast', label: t.home.valueFastLabel, detail: t.home.valueFastDetail },
  ]

  useEffect(() => {
    if (!activeId) return
    const onPointerDown = (e: PointerEvent) => {
      if (!rowRef.current?.contains(e.target as Node)) setActiveId(null)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [activeId])

  return (
    <div ref={rowRef} className="home-value-row hero-in__item hero-in__item--sub" role="list" aria-label={t.home.valueAriaLabel}>
      {VALUE_ITEMS.map((item) => {
        const open = activeId === item.id
        return (
          <div key={item.id} className={`home-value-chip${open ? ' home-value-chip--open' : ''}`} role="listitem">
            <button
              type="button"
              className="home-value-chip__btn art-card__tag-doodle"
              aria-label={item.label}
              aria-expanded={open}
              onClick={() => setActiveId((prev) => (prev === item.id ? null : item.id))}
              onFocus={() => setActiveId(item.id)}
              onBlur={() => setActiveId(null)}
            >
              <span className="art-card__tag-bullet">•</span>
              <span>{item.label}</span>
            </button>
            {open && <div className="home-value-chip__popover">{item.detail}</div>}
          </div>
        )
      })}
    </div>
  )
}

/* ─── Main Component ────────────────────────────────────────────────────── */
export default function Home() {
  useScrollReveal()
  useHeroEnter()
  const { lang } = useLanguage()
  const t = getT(lang)

  const portfolio = getLocalizedPortfolio(lang)
  const products = getLocalizedProducts(lang)

  const PACKAGES = [
    {
      id: 'starter',
      name: t.layanan.pkg_starter_name,
      tagline: t.layanan.pkg_starter_tagline,
      price: t.layanan.pkg_starter_price,
      highlighted: false,
      features: t.layanan.pkg_starter_features,
    },
    {
      id: 'business',
      name: t.layanan.pkg_business_name,
      tagline: t.layanan.pkg_business_tagline,
      price: t.layanan.pkg_business_price,
      highlighted: true,
      features: t.layanan.pkg_business_features,
    },
    {
      id: 'premium',
      name: t.layanan.pkg_premium_name,
      tagline: t.layanan.pkg_premium_tagline,
      price: t.layanan.pkg_premium_price,
      highlighted: false,
      features: t.layanan.pkg_premium_features,
    },
  ]

  usePageTitle({
    title: lang === 'en'
      ? 'IDKA Solutions | Professional Website & Mobile App Services'
      : 'IDKA Solutions | Jasa Website Profesional untuk Bisnis',
    description: lang === 'en'
      ? 'IDKA Solutions helps SMEs, personal brands, and startups build modern websites & mobile apps that are functional and ready to support business growth.'
      : 'IDKA Solutions membantu UMKM, personal brand, dan startup membangun website modern yang fungsional dan siap mendukung pertumbuhan bisnis.',
    fullTitle: true,
    path: '/',
  })

  const WA_HERO = WA_BASE + encodeURIComponent(t.wa.heroConsult)
  const WA_CTA = WA_BASE + encodeURIComponent(t.wa.ctaConsult)

  const SERVICES = [
    {
      id: 'profil-branding',
      icon: 'building' as const,
      badge: t.home.svc1Badge,
      popular: false,
      title: t.home.svc1Title,
      description: t.home.svc1Desc,
      tags: lang === 'en' ? ['Business Profile', 'Landing Page', 'Google-friendly'] : ['Profil Bisnis', 'Landing Page', 'Google-friendly'],
      accent: 'indigo',
    },
    {
      id: 'katalog-toko-online',
      icon: 'shopping-bag' as const,
      badge: t.home.svc2Badge,
      popular: true,
      title: t.home.svc2Title,
      description: t.home.svc2Desc,
      tags: lang === 'en' ? ['Product Catalog', 'WhatsApp Order', 'Photo Gallery'] : ['Katalog Produk', 'WhatsApp Order', 'Galeri Foto'],
      accent: 'purple',
    },
    {
      id: 'sistem-kustom',
      icon: 'cpu' as const,
      badge: t.home.svc3Badge,
      popular: false,
      title: t.home.svc3Title,
      description: t.home.svc3Desc,
      tags: lang === 'en' ? ['Web App', 'Dashboard', 'Data Automation'] : ['Web App', 'Dashboard', 'Otomasi Data'],
      accent: 'amber',
    },
    {
      id: 'maintenance-care',
      icon: 'shield-check' as const,
      badge: t.home.svc4Badge,
      popular: false,
      title: t.home.svc4Title,
      description: t.home.svc4Desc,
      tags: lang === 'en' ? ['SSL & Backup', 'Uptime Monitor', 'Regular Revision'] : ['SSL & Backup', 'Uptime Monitor', 'Revisi Berkala'],
      accent: 'emerald',
    },
  ]

  const WHY_US = [
    {
      icon: 'building' as const,
      badge: t.home.why1Badge,
      title: t.home.why1Title,
      desc: t.home.why1Desc,
      tags: ['Google Search', 'Google Maps'],
      accent: 'indigo',
    },
    {
      icon: 'shopping-bag' as const,
      badge: t.home.why2Badge,
      title: t.home.why2Title,
      desc: t.home.why2Desc,
      tags: lang === 'en' ? ['Clean Design', 'Responsive'] : ['Visual Clean', 'Responsive HP'],
      accent: 'purple',
    },
    {
      icon: 'cpu' as const,
      badge: t.home.why3Badge,
      title: t.home.why3Title,
      desc: t.home.why3Desc,
      tags: ['Quick Chat', 'Form Lead'],
      accent: 'amber',
    },
    {
      icon: 'shield-check' as const,
      badge: t.home.why4Badge,
      title: t.home.why4Title,
      desc: t.home.why4Desc,
      tags: ['High Speed', 'SSL'],
      accent: 'emerald',
    },
  ]

  const PROCESS = [
    { n: '01', title: t.home.step1Title, desc: t.home.step1Desc },
    { n: '02', title: t.home.step2Title, desc: t.home.step2Desc },
    { n: '03', title: t.home.step3Title, desc: t.home.step3Desc },
  ]

  return (
    <div className="layanan-page home-page">

      {/* 1. Hero — Kiblat Layanan.tsx */}
      <section className="apple-hero section artistic-hero" aria-labelledby="hero-heading" data-hero-enter="home">
        <div className="container">
          <div className="apple-hero__inner">
            <div className="apple-hero__eyebrow hero-in__item hero-in__item--tag doodle-tag">
              <span>{t.home.heroEyebrow}</span>
            </div>
            <h1 id="hero-heading" className="apple-hero__title hero-in__item hero-in__item--title artistic-title">
              <WordReveal>{t.home.heroTitle}</WordReveal>{' '}
              <WordReveal className="apple-hero__title-accent">{t.home.heroTitleAccent}</WordReveal>
              <ScribbleUnderline variant="wavy" />
            </h1>
            <p className="apple-hero__subtitle hero-in__item hero-in__item--sub">
              {t.home.heroSubtitle}{' '}
              <strong className="apple-text-bold">{t.home.heroSubtitleBold}</strong>
            </p>

            <HeroValueIcons />

            <div className="apple-hero__actions hero-in__item hero-in__item--actions" style={{ marginTop: '1.5rem' }}>
              <a
                href={WA_HERO}
                target="_blank"
                rel="noopener noreferrer"
                className="art-card__btn-doodle"
              >
                <span>{t.home.heroCta1}</span>
                <svg className="art-card__btn-arrow" width="22" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M 2 7 Q 10 3, 18 7 M 15 2 L 21 7 L 15 12" />
                </svg>
              </a>
              <NavLink to="/layanan" className="art-card__btn-doodle">
                <span>{t.home.heroCta2}</span>
                <svg className="art-card__btn-arrow" width="22" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M 2 7 Q 10 3, 18 7 M 15 2 L 21 7 L 15 12" />
                </svg>
              </NavLink>
            </div>
            <p className="apple-hero__proof hero-in__item" style={{ marginTop: '1.25rem' }}>
              {t.home.heroProof}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Layanan Utama */}
      <section className="section section--tint layanan-artistic-section" aria-labelledby="all-services-heading">
        <div className="container">
          <div className="section-header reveal artistic-header">
            <div className="section-tag doodle-tag">
              <span>{t.home.servicesSectionTag}</span>
            </div>
            <h2 id="all-services-heading" className="section-title artistic-title">
              {t.home.servicesSectionTitle}
              <ScribbleUnderline variant="double" />
            </h2>
            <p className="section-subtitle artistic-subtitle">
              {t.home.servicesSectionSubtitle}
            </p>
          </div>

          <div className="artistic-grid">
            {SERVICES.map((svc, i) => (
              <div
                key={svc.id}
                id={svc.id}
                className={`art-card art-card--v${(i % 4) + 1} ${svc.popular ? 'art-card--featured' : ''} art-card--${svc.accent} reveal reveal--delay-${i + 1}`}
              >
                <div className="art-card__top">
                  <div className="art-card__illustration" aria-hidden="true">
                    <ContinuousLineArt type={svc.icon} />
                  </div>
                  <DoodleBadge text={svc.badge} popular={svc.popular} shape={i % 3 === 0 ? 'tape' : i % 3 === 1 ? 'cloud' : 'oval'} />
                </div>

                <div className="art-card__content">
                  <h3 className="art-card__title">{svc.title}</h3>
                  <p className="art-card__desc">{svc.description}</p>
                </div>

                <div className="art-card__tags">
                  {svc.tags.map((tag, idx) => (
                    <span key={idx} className="art-card__tag-doodle">
                      <span className="art-card__tag-bullet">•</span> {tag}
                    </span>
                  ))}
                </div>

                <div className="art-card__footer">
                  <NavLink to="/layanan" className="art-card__btn-doodle">
                    <span>{t.home.servicesViewDetail}</span>
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

      {/* 3. Keunggulan IDKA — Kiblat Layanan.tsx */}
      <section className="section layanan-artistic-section" aria-labelledby="why-heading">
        <div className="container">
          <div className="section-header reveal artistic-header">
            <div className="section-tag doodle-tag">
              <span>{t.home.whySectionTag}</span>
            </div>
            <h2 id="why-heading" className="section-title artistic-title">
              {t.home.whySectionTitle}
              <ScribbleUnderline variant="zigzag" />
            </h2>
            <p className="section-subtitle artistic-subtitle">
              {t.home.whySectionSubtitle}
            </p>
          </div>

          <div className="artistic-grid">
            {WHY_US.map((item, i) => (
              <div key={item.badge} className={`art-card art-card--v${(i % 4) + 1} art-card--${item.accent} reveal reveal--delay-${i + 1}`}>
                <div className="art-card__top">
                  <div className="art-card__illustration" aria-hidden="true">
                    <ContinuousLineArt type={item.icon} />
                  </div>
                  <DoodleBadge text={item.badge} shape={i % 3 === 0 ? 'tape' : i % 3 === 1 ? 'cloud' : 'oval'} />
                </div>
                <div className="art-card__content">
                  <h3 className="art-card__title">{item.title}</h3>
                  <p className="art-card__desc">{item.desc}</p>
                </div>
                <div className="art-card__tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="art-card__tag-doodle">
                      <span className="art-card__tag-bullet">•</span> {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Cara kerja — Kiblat Layanan.tsx (layanan-process) */}
      <section className="section section--tint layanan-process" aria-labelledby="process-heading">
        <div className="container">
          <div className="section-header reveal artistic-header">
            <div className="section-tag doodle-tag"><span>{t.home.processSectionTag}</span></div>
            <h2 id="process-heading" className="section-title artistic-title">
              {t.home.processSectionTitle}
              <ScribbleUnderline variant="zigzag" />
            </h2>
            <p className="section-subtitle artistic-subtitle">
              {t.home.processSectionSubtitle}
            </p>
          </div>
          <div className="process-list artistic-process-list">
            {PROCESS.map((step, idx) => (
              <div key={step.n} className={`art-card process-art-card art-card--v${idx + 1} reveal`}>
                <div className="process-art-card__header">
                  <DoodleBadge
                    text={step.n === '01' ? t.home.step1Label : step.n === '02' ? t.home.step2Label : t.home.step3Label}
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

      {/* 5. Portofolio Karya Nyata — Kiblat Layanan.tsx */}
      <section className="section layanan-artistic-section" aria-labelledby="portfolio-heading">
        <div className="container">
          <div className="section-header reveal artistic-header">
            <div className="section-tag doodle-tag"><span>{t.home.portfolioSectionTag}</span></div>
            <h2 id="portfolio-heading" className="section-title artistic-title">
              {t.home.portfolioSectionTitle}
              <ScribbleUnderline variant="wavy" />
            </h2>
            <p className="section-subtitle artistic-subtitle">
              {t.home.portfolioSectionSubtitle}
            </p>
          </div>

          <div className="portfolio-preview-grid">
            {portfolio.slice(0, 3).map((item, i) => (
              <PortfolioPreviewCard key={item.id} item={item} delay={i + 1} />
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
            <NavLink to="/portofolio" className="art-card__btn-doodle">
              <span>{t.home.portfolioViewAll}</span>
              <svg className="art-card__btn-arrow" width="22" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M 2 7 Q 10 3, 18 7 M 15 2 L 21 7 L 15 12" />
              </svg>
            </NavLink>
          </div>
        </div>
      </section>

      {/* 6. Produk Pipeline 2026 — Kiblat Layanan.tsx */}
      <section className="section section--tint layanan-artistic-section" aria-labelledby="products-heading">
        <div className="container">
          <div className="section-header reveal artistic-header">
            <div className="section-tag doodle-tag"><span>{t.home.productsSectionTag}</span></div>
            <h2 id="products-heading" className="section-title artistic-title">
              {t.home.productsSectionTitle}
              <ScribbleUnderline variant="arc" />
            </h2>
            <p className="section-subtitle artistic-subtitle">
              {t.home.productsSectionSubtitle}
            </p>
          </div>
          <div className="artistic-grid">
            {products.map((p, i) => (
              <NavLink
                key={p.id}
                to="/produk"
                className={`art-card art-card--v${(i % 4) + 1} reveal reveal--delay-${i + 1}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="art-card__top">
                  <div className="art-card__illustration" aria-hidden="true">
                    <ContinuousLineArt type={p.icon} />
                  </div>
                  <DoodleBadge text={p.status} shape={i % 2 === 0 ? 'tape' : 'cloud'} />
                </div>
                <div className="art-card__content">
                  <h3 className="art-card__title">{p.title}</h3>
                  <p className="art-card__desc">{p.tagline}</p>
                </div>
                <div className="art-card__footer">
                  <span className="art-card__btn-doodle">
                    <span>{t.home.productsLearnMore}</span>
                    <svg className="art-card__btn-arrow" width="22" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M 2 7 Q 10 3, 18 7 M 15 2 L 21 7 L 15 12" />
                    </svg>
                  </span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Paket Harga Transparan — Kiblat Layanan.tsx (layanan-packages) */}
      <section className="section layanan-packages" aria-labelledby="packages-heading">
        <div className="container">
          <div className="section-header reveal artistic-header">
            <div className="section-tag doodle-tag"><span>{t.home.pricingSectionTag}</span></div>
            <h2 id="packages-heading" className="section-title artistic-title">
              {t.home.pricingSectionTitle}
              <ScribbleUnderline variant="double" />
            </h2>
            <p className="section-subtitle artistic-subtitle">
              {t.home.pricingSectionSubtitle}
            </p>
          </div>
          <div className="packages-grid artistic-packages-grid">
            {PACKAGES.map((pkg, i) => (
              <div
                key={pkg.id}
                className={`art-card package-art-card art-card--v${(i % 3) + 1} reveal reveal--delay-${i + 1}${pkg.highlighted ? ' art-card--featured' : ''}`}
              >
                {pkg.highlighted && (
                  <DoodleBadge text={t.layanan.packagesMostChosen} popular shape="tape" />
                )}
                <div className="package-art-card__header">
                  <h3 className="art-card__title">{pkg.name}</h3>
                  <div className="package-art-card__price">{pkg.price}</div>
                  <p className="art-card__desc">{pkg.tagline}</p>
                </div>
                <ul className="package-art-card__features" role="list">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="art-card__tag-doodle">
                      <span className="art-card__tag-bullet">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <div className="art-card__footer">
                  <NavLink to="/kontak" className="art-card__btn-doodle">
                    <span>{t.home.pricingChoose}</span>
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

      {/* 8. Final CTA Banner — Kiblat Layanan.tsx */}
      <section className="section section--tint layanan-artistic-section" aria-labelledby="cta-heading">
        <div className="container">
          <div className="art-card art-card--v1 art-card--featured reveal" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
            <div className="section-tag doodle-tag" style={{ marginBottom: '1.25rem' }}>
              <span>{t.home.ctaSectionTag}</span>
            </div>
            <h2 id="cta-heading" className="section-title artistic-title" style={{ display: 'block', margin: '0 auto 1rem' }}>
              {t.home.ctaSectionTitle}
              <ScribbleUnderline variant="zigzag" />
            </h2>
            <p className="section-subtitle artistic-subtitle" style={{ maxWidth: '580px', margin: '0 auto 2rem' }}>
              {t.home.ctaSectionSubtitle}
            </p>
            <div className="apple-hero__actions">
              <a
                href={WA_CTA}
                target="_blank"
                rel="noopener noreferrer"
                className="art-card__btn-doodle"
              >
                <span>{t.home.ctaWhatsApp}</span>
                <svg className="art-card__btn-arrow" width="22" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M 2 7 Q 10 3, 18 7 M 15 2 L 21 7 L 15 12" />
                </svg>
              </a>
              <NavLink to="/kontak" className="art-card__btn-doodle">
                <span>{t.home.ctaBrief}</span>
                <svg className="art-card__btn-arrow" width="22" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M 2 7 Q 10 3, 18 7 M 15 2 L 21 7 L 15 12" />
                </svg>
              </NavLink>
            </div>
            <p className="apple-hero__proof" style={{ marginTop: '1.25rem' }}>
              {t.home.ctaProof}
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}
