import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { company, services, packages, maintenancePackages, faq } from '../data/content'
import PriceEstimator from '../components/PriceEstimator'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useHeroEnter } from '../hooks/useHeroEnter'
import { usePageTitle } from '../hooks/usePageTitle'
import WordReveal from '../components/WordReveal'
import './Layanan.css'

/* Continuous Line Art SVGs: Single unbroken line drawings with scribble aesthetics */
function ContinuousLineArt({ type }: { type: string }) {
  switch (type) {
    case 'building':
      /* Profile & Branding: Continuous line forming a face profile merged with a window frame & star doodle */
      return (
        <svg className="continuous-line-svg" viewBox="0 0 160 120" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path
            className="continuous-path"
            d="M 15,105 C 25,105 35,95 40,85 C 45,70 30,55 45,40 C 55,30 70,35 75,25 C 80,15 95,15 105,25 C 115,35 110,50 125,55 C 135,60 145,50 145,65 C 145,80 130,85 125,95 C 120,105 135,110 145,105 C 130,105 115,105 100,105 M 40,85 L 100,85 L 100,35 L 40,35 Z M 40,60 L 100,60 M 70,35 L 70,85"
          />
          <path className="scribble-accent-path" d="M 120,20 C 125,15 130,25 135,18 M 128,12 L 128,26 M 120,18 L 136,18" strokeWidth="1.8" opacity="0.75" />
          <path className="scribble-loop-path" d="M 15,30 C 22,22 28,38 20,40 C 14,42 22,25 30,28" strokeWidth="1.8" opacity="0.6" />
        </svg>
      )
    case 'shopping-bag':
      /* E-commerce: Continuous line forming a shopping handle, bag contour, cart wheel & doodle spark */
      return (
        <svg className="continuous-line-svg" viewBox="0 0 160 120" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path
            className="continuous-path"
            d="M 25,45 C 25,25 45,20 60,20 C 75,20 95,25 95,45 M 20,45 L 100,45 L 90,100 L 30,100 Z M 55,45 C 55,60 65,60 65,45 M 100,60 C 115,55 130,50 140,60 C 150,70 135,85 120,80 C 110,75 125,95 145,95"
          />
          <circle cx="45" cy="100" r="6" strokeWidth="2" />
          <circle cx="75" cy="100" r="6" strokeWidth="2" />
          <path className="scribble-accent-path" d="M 115,25 Q 125,15 135,25 Q 125,35 115,25 Z" strokeWidth="1.8" opacity="0.8" />
        </svg>
      )
    case 'cpu':
      /* Custom System: Continuous line forming brain neural loops, gear teeth & digital code bracket doodle */
      return (
        <svg className="continuous-line-svg" viewBox="0 0 160 120" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path
            className="continuous-path"
            d="M 20,60 C 20,35 40,20 65,20 C 85,20 95,35 105,30 C 115,25 130,30 135,45 C 140,60 125,75 135,90 C 125,100 105,95 95,105 C 75,105 60,95 45,100 C 30,105 20,85 20,60 Z M 55,45 C 50,55 70,65 65,75 M 95,45 C 100,55 80,65 85,75 M 40,60 C 60,50 100,70 120,60"
          />
          <path className="scribble-accent-path" d="M 135,18 L 125,28 L 135,38 M 145,18 L 155,28 L 145,38" strokeWidth="2" opacity="0.85" />
          <circle cx="65" cy="60" r="4" fill="currentColor" />
        </svg>
      )
    case 'shield-check':
      /* Maintenance & Speed: Continuous line forming a shield silhouette, pulse heart line & leaf doodle */
      return (
        <svg className="continuous-line-svg" viewBox="0 0 160 120" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path
            className="continuous-path"
            d="M 35,25 C 55,20 75,15 80,15 C 85,15 105,20 125,25 L 125,60 C 125,90 85,110 80,110 C 75,110 35,90 35,60 Z M 15,65 L 45,65 L 55,45 L 70,85 L 85,55 L 95,65 L 145,65"
          />
          <path className="scribble-accent-path" d="M 65,60 L 75,72 L 100,45" strokeWidth="3" opacity="0.9" />
          <path className="scribble-loop-path" d="M 125,18 C 135,10 145,20 135,30 C 125,40 140,45 145,35" strokeWidth="1.8" opacity="0.75" />
        </svg>
      )
    default:
      return null
  }
}

function ScribbleUnderline({ variant = 'wavy' }: { variant?: 'wavy' | 'double' | 'zigzag' | 'arc' }) {
  switch (variant) {
    case 'wavy':
      return (
        <svg className="scribble-underline-svg scribble-underline-svg--wavy" viewBox="0 0 240 22" fill="none" aria-hidden="true">
          <path
            d="M 4 14 C 45 4, 85 18, 125 9 C 165 2, 205 16, 230 8 C 238 5, 235 15, 225 14 C 180 18, 130 12, 85 15"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'double':
      return (
        <svg className="scribble-underline-svg scribble-underline-svg--double" viewBox="0 0 240 22" fill="none" aria-hidden="true">
          <path
            d="M 5 10 C 60 4, 120 12, 180 5 C 205 2, 225 8, 235 10"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 15 17 C 70 12, 130 18, 190 12 C 210 10, 225 15, 230 16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.8"
          />
        </svg>
      )
    case 'zigzag':
      return (
        <svg className="scribble-underline-svg scribble-underline-svg--zigzag" viewBox="0 0 240 22" fill="none" aria-hidden="true">
          <path
            d="M 6 12 Q 25 3, 45 15 T 85 5 T 125 14 T 165 4 T 205 15 T 235 7"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'arc':
      return (
        <svg className="scribble-underline-svg scribble-underline-svg--arc" viewBox="0 0 240 24" fill="none" aria-hidden="true">
          <path
            d="M 8 16 Q 120 -4, 232 16"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 220 5 L 226 5 M 223 2 L 223 8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )
    default:
      return null
  }
}

function HandDrawnBadge({ text, popular, shape = 'oval' }: { text: string; popular?: boolean; shape?: 'oval' | 'tape' | 'cloud' }) {
  return (
    <div className={`doodle-badge doodle-badge--${shape} ${popular ? 'doodle-badge--popular' : ''}`}>
      {shape === 'oval' && (
        <svg className="doodle-badge__bg" viewBox="0 0 170 42" fill="none" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M 6,21 C 4,7 18,3 85,4 C 152,5 166,7 164,21 C 162,35 148,38 85,38 C 22,38 8,35 6,21 Z M 9,19 C 7,9 21,5 85,6 C 149,7 161,9 161,19 C 161,29 146,35 85,35 C 24,35 11,29 9,19 Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {shape === 'tape' && (
        <svg className="doodle-badge__bg" viewBox="0 0 170 42" fill="none" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M 4,8 L 166,2 L 162,36 L 8,40 Z M 2,12 L 168,6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {shape === 'cloud' && (
        <svg className="doodle-badge__bg" viewBox="0 0 170 42" fill="none" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M 15,25 C 5,20 10,8 25,10 C 35,2 60,4 75,10 C 95,2 125,5 135,12 C 155,10 165,22 155,32 C 160,40 135,42 120,38 C 105,44 75,40 60,38 C 40,42 20,40 15,25 Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <span className="doodle-badge__text">{text}</span>
    </div>
  )
}

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
  usePageTitle({
    title: 'Layanan',
    description:
      'Jasa pembuatan website profesional: landing page, company profile, toko online, dan portofolio. Harga transparan, hasil berkualitas.',
    path: '/layanan',
  })

  /* Deep-link: /layanan#website-profil dll. */
  useEffect(() => {
    const id = location.hash.replace(/^#/, '')
    if (!id) return
    const el = document.getElementById(id)
    if (!el) return
    const t = window.setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.classList.add('layanan-card--highlight')
      window.setTimeout(() => el.classList.remove('layanan-card--highlight'), 2000)
    }, 120)
    return () => window.clearTimeout(t)
  }, [location.hash])

  return (
    <div className="layanan-page">
      {/* 1. Hero */}
      <section className="apple-hero section artistic-hero" aria-labelledby="layanan-heading" data-hero-enter="layanan">
        <div className="container">
          <div className="apple-hero__inner">
            <div className="apple-hero__eyebrow hero-in__item hero-in__item--tag doodle-tag">
              <span>Layanan IDKA Solutions</span>
            </div>
            <h1 id="layanan-heading" className="apple-hero__title hero-in__item hero-in__item--title artistic-title">
              <WordReveal>Website &amp; Aplikasi Mobile</WordReveal>{' '}
              <WordReveal className="apple-hero__title-accent">untuk Berbagai Kebutuhan Bisnis.</WordReveal>
              <ScribbleUnderline />
            </h1>
            <p className="apple-hero__subtitle hero-in__item hero-in__item--sub">
              Untuk UMKM, profesional, dan startup — dari landing page, toko online, hingga aplikasi Android &amp; iOS kustom.{' '}
              <strong className="apple-text-bold">Semua kebutuhan digital, dalam satu langkah yang jelas.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* 2. Apa yang kami kerjakan - Artistic Continuous Line & Scribble Section */}
      <section className="section section--tint layanan-artistic-section" aria-labelledby="all-services-heading">
        <div className="container">
          <div className="section-header reveal artistic-header">
            <div className="section-tag doodle-tag">
              <span>Artistic Canvas</span>
            </div>
            <h2 id="all-services-heading" className="section-title artistic-title">
              Layanan Digital yang Kami Kerjakan
              <ScribbleUnderline variant="double" />
            </h2>
            <p className="section-subtitle artistic-subtitle">
              Website modern dan aplikasi mobile dengan desain artistik yang merepresentasikan karakter brand Anda.
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
                      text={svc.badge}
                      popular={svc.popular}
                      shape={i % 3 === 0 ? 'tape' : i % 3 === 1 ? 'cloud' : 'oval'}
                    />
                  )}
                </div>

                <div className="art-card__content">
                  <h3 className="art-card__title">
                    {svc.title}
                  </h3>
                  <p className="art-card__desc">{svc.description}</p>
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
                    <span>Jelajahi Estimasi</span>
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
            <div className="section-tag doodle-tag"><span>Workflow Art</span></div>
            <h2 id="process-heading" className="section-title artistic-title">
              3 Langkah ke Website Live
              <ScribbleUnderline variant="zigzag" />
            </h2>
            <p className="section-subtitle artistic-subtitle">
              Alur sederhana dan transparan dari konsultasi hingga go-live.
            </p>
          </div>
          <div className="process-list artistic-process-list">
            {[
              {
                n: '01',
                title: 'Ceritakan Kebutuhan',
                desc: 'Konsultasi gratis via WhatsApp atau form. Kami petakan tujuan, fitur, dan anggaran.',
              },
              {
                n: '02',
                title: 'Kami Kerjakan',
                desc: 'Desain, development, dan revisi sesuai paket. Anda review progres di staging.',
              },
              {
                n: '03',
                title: 'Website Live',
                desc: 'Domain aktif, SSL terpasang, website online dan siap dipakai bisnis.',
              },
            ].map((step, idx) => (
              <div key={step.n} className={`art-card process-art-card art-card--v${idx + 1} reveal`}>
                <div className="process-art-card__header">
                  <HandDrawnBadge
                    text={`Langkah ${step.n}`}
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
            <div className="section-tag doodle-tag"><span>Investasi Jelas</span></div>
            <h2 id="packages-heading" className="section-title artistic-title">
              Harga Transparan, Scope Jelas
              <ScribbleUnderline variant="arc" />
            </h2>
            <p className="section-subtitle artistic-subtitle">
              Harga sekali bayar (bukan langganan bulanan). Scope dan revisi disepakati di awal.
            </p>
          </div>
          <div className="packages-grid artistic-packages-grid">
            {packages.map((pkg, i) => (
              <div
                key={pkg.id}
                className={`art-card package-art-card art-card--v${(i % 3) + 1} reveal reveal--delay-${i + 1}${pkg.highlighted ? ' art-card--featured' : ''}`}
              >
                {pkg.highlighted && (
                  <HandDrawnBadge text="Paling Dipilih" popular shape="tape" />
                )}
                <div className="package-art-card__header">
                  <h3 className="art-card__title">{pkg.name}</h3>
                  {'price' in pkg && <div className="package-art-card__price">{pkg.price as string}</div>}
                  <p className="art-card__desc">{pkg.tagline}</p>
                </div>
                <div className="art-card__divider" />
                <ul className="package-art-card__features" role="list">
                  {pkg.features.map((f, idx) => (
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
          <div className="art-card packages-note-art art-card--v4">
            <div className="packages-note__icon" aria-hidden="true">💡</div>
            <div>
              <strong style={{ fontSize: '1.1rem', color: '#1e1b4b' }}>Butuh solusi kustom?</strong>
              <p style={{ margin: '4px 0 0', color: '#4b5563' }}>
                Kami menerima proyek di luar paket standar.{' '}
                <NavLink to="/kontak" style={{ color: '#5e17eb', fontWeight: 800 }}>Hubungi kami</NavLink>{' '}
                untuk estimasi yang sesuai.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Estimator — bantu putuskan sebelum maintenance */}
      <section className="section layanan-estimator" aria-labelledby="estimator-heading">
        <div className="container">
          <div className="section-header reveal artistic-header">
            <div className="section-tag doodle-tag"><span>Kalkulator Live</span></div>
            <h2 id="estimator-heading" className="section-title artistic-title">
              Estimasi Harga Cepat
              <ScribbleUnderline variant="wavy" />
            </h2>
            <p className="section-subtitle artistic-subtitle">
              Pilih kebutuhan Anda untuk mendapat perkiraan harga. Harga final dikonfirmasi saat konsultasi.
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
            <div className="section-tag doodle-tag"><span>After Go-Live</span></div>
            <h2 id="maintenance-heading" className="section-title artistic-title">
              Maintenance Opsional
              <ScribbleUnderline variant="double" />
            </h2>
            <p className="section-subtitle artistic-subtitle">
              Jaga website tetap stabil setelah live. Bisa diambil terpisah dari paket pembuatan website.
            </p>
          </div>
          <div className="maintenance-grid artistic-maintenance-grid">
            {maintenancePackages.map((pkg, i) => (
              <div key={pkg.name} className={`art-card maintenance-art-card art-card--v${i + 1} reveal reveal--delay-1`}>
                <h3 className="art-card__title">{pkg.name}</h3>
                {'price' in pkg && <div className="package-art-card__price">{pkg.price as string}</div>}
                <ul className="package-art-card__features" role="list">
                  {pkg.features.map((f, idx) => (
                    <li key={idx} className="art-card__tag-doodle">
                      <span className="art-card__tag-bullet">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <div className="art-card__footer">
                  <NavLink to="/kontak" className="art-card__btn-doodle">
                    <span>Konsultasi Paket</span>
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
            <div className="section-tag doodle-tag"><span>Jawaban Cepat</span></div>
            <h2 id="faq-heading" className="section-title artistic-title">
              Pertanyaan yang Sering Diajukan
              <ScribbleUnderline variant="zigzag" />
            </h2>
          </div>
          <div className="faq-list artistic-faq-list">
            {faq.map((item, index) => (
              <AccordionItem
                key={item.question}
                id={String(index)}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
          <div className="faq-cta art-card art-card--v3" style={{ marginTop: '3rem', textAlign: 'center' }}>
            <h3 className="art-card__title" style={{ marginBottom: '0.5rem' }}>Masih Ada Pertanyaan?</h3>
            <p className="art-card__desc" style={{ marginBottom: '1.5rem' }}>
              Tim kami siap mendiskusikan ide website dan memberikan solusi terbaik untuk bisnis Anda.
            </p>
            <div className="faq-cta__actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <NavLink to="/kontak" className="art-card__btn-doodle" style={{ background: '#5e17eb', color: '#fff' }}>
                <span>Isi Brief Proyek</span>
              </NavLink>
              <a
                href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent('Halo IDKA Solutions, saya ingin bertanya tentang jasa website.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="art-card__btn-doodle"
              >
                <span>Chat WhatsApp</span>
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
