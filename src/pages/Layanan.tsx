import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { company, services, packages, maintenancePackages, faq } from '../data/content'
import PriceEstimator from '../components/PriceEstimator'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useHeroEnter } from '../hooks/useHeroEnter'
import { usePageTitle } from '../hooks/usePageTitle'
import WordReveal from '../components/WordReveal'
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
      <section className="apple-hero section" aria-labelledby="layanan-heading" data-hero-enter="layanan">
        <div className="container">
          <div className="apple-hero__inner">
            <div className="apple-hero__eyebrow hero-in__item hero-in__item--tag">
              Layanan IDKA
            </div>
            <h1 id="layanan-heading" className="apple-hero__title hero-in__item hero-in__item--title">
              <WordReveal>Solusi Website untuk</WordReveal>{' '}
              <WordReveal className="apple-hero__title-accent">Berbagai Kebutuhan Bisnis.</WordReveal>
            </h1>
            <p className="apple-hero__subtitle hero-in__item hero-in__item--sub">
              Untuk UMKM, freelancer, startup, dan perusahaan—dari landing page cepat hingga sistem kustom scalable.{' '}
              <strong className="apple-text-bold">Semua kebutuhan digital, dalam satu langkah yang jelas.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* 2. Apa yang kami kerjakan */}
      <section className="section section--tint" aria-labelledby="all-services-heading">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag">Layanan</div>
            <h2 id="all-services-heading" className="section-title">
              Jenis Website yang Kami Kerjakan
            </h2>
            <p className="section-subtitle">
              Empat fokus utama: profil, katalog/toko, kustom, dan maintenance.
            </p>
          </div>
          <div className="layanan-grid">
            {services.map((svc, i) => (
              <div
                key={svc.id}
                id={svc.id}
                className={`layanan-card neu-raised reveal reveal--delay-${Math.min(i % 3 + 1, 5)}`}
              >
                <div className="layanan-card__icon" aria-hidden="true">
                  {svc.icon}
                </div>
                <div className="layanan-card__body">
                  <h3 className="layanan-card__title">{svc.title}</h3>
                  <p className="layanan-card__desc">{svc.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Cara kerja — sebelum harga, biar flow jelas */}
      <section className="section layanan-process" aria-labelledby="process-heading">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag">Proses Kerja</div>
            <h2 id="process-heading" className="section-title">
              3 Langkah ke Website Live
            </h2>
            <p className="section-subtitle">
              Alur sederhana dan transparan dari konsultasi hingga go-live.
            </p>
          </div>
          <div className="process-list">
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
            ].map((step) => (
              <div key={step.n} className="process-item neu-raised reveal">
                <div className="process-item__number" aria-hidden="true">{step.n}</div>
                <div className="process-item__body">
                  <h3 className="process-item__title">{step.title}</h3>
                  <p className="process-item__desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Paket harga */}
      <section className="section section--tint layanan-packages" aria-labelledby="packages-heading">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag">Paket</div>
            <h2 id="packages-heading" className="section-title">
              Harga Transparan, Scope Jelas
            </h2>
            <p className="section-subtitle">
              Harga sekali bayar (bukan langganan bulanan). Scope dan revisi disepakati di awal.
            </p>
          </div>
          <div className="packages-grid">
            {packages.map((pkg, i) => (
              <div
                key={pkg.id}
                className={`package-card neu-raised reveal reveal--delay-${i + 1}${pkg.highlighted ? ' package-card--highlighted' : ''}`}
              >
                {pkg.highlighted && (
                  <div className="package-card__popular">Paling Dipilih</div>
                )}
                <div className="package-card__header">
                  <h3 className="package-card__name">{pkg.name}</h3>
                  {'price' in pkg && <div className="package-card__price">{pkg.price as string}</div>}
                  <p className="package-card__tagline">{pkg.tagline}</p>
                </div>
                <div className="package-card__divider" />
                <ul className="package-card__features" role="list">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="package-card__feature">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <NavLink
                  to="/kontak"
                  className={`btn package-card__btn${pkg.highlighted ? ' btn-primary' : ' btn-secondary'}`}
                >
                  {pkg.cta}
                </NavLink>
              </div>
            ))}
          </div>
          <div className="packages-note neu-raised">
            <div className="packages-note__icon" aria-hidden="true">&#128161;</div>
            <div>
              <strong>Butuh solusi kustom?</strong>
              <p>
                Kami menerima proyek di luar paket standar.{' '}
                <NavLink to="/kontak" className="text-primary-color font-semibold">Hubungi kami</NavLink>{' '}
                untuk estimasi yang sesuai.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Estimator — bantu putuskan sebelum maintenance */}
      <section className="section layanan-estimator" aria-labelledby="estimator-heading">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag">Estimasi</div>
            <h2 id="estimator-heading" className="section-title">
              Estimasi Harga Cepat
            </h2>
            <p className="section-subtitle">
              Pilih kebutuhan Anda untuk mendapat perkiraan harga. Harga final dikonfirmasi saat konsultasi.
            </p>
          </div>
          <div className="layanan-estimator__wrap">
            <PriceEstimator />
          </div>
        </div>
      </section>

      {/* 6. Maintenance — after-sales, setelah harga website */}
      <section className="section section--tint layanan-maintenance" aria-labelledby="maintenance-heading">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag">After Go-Live</div>
            <h2 id="maintenance-heading" className="section-title">
              Maintenance Opsional
            </h2>
            <p className="section-subtitle">
              Jaga website tetap stabil setelah live. Bisa diambil terpisah dari paket pembuatan website.
            </p>
          </div>
          <div className="maintenance-grid">
            {maintenancePackages.map((pkg) => (
              <div key={pkg.name} className="maintenance-card neu-raised reveal reveal--delay-1">
                <h3 className="maintenance-card__name">{pkg.name}</h3>
                {'price' in pkg && <div className="maintenance-card__price">{pkg.price as string}</div>}
                <ul className="maintenance-card__features" role="list">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="maintenance-card__feature">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <NavLink to="/kontak" className="btn btn-secondary maintenance-card__btn">
                  Konsultasi Paket
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ + CTA */}
      <section className="section" aria-labelledby="faq-heading">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag">FAQ</div>
            <h2 id="faq-heading" className="section-title">
              Pertanyaan yang Sering Diajukan
            </h2>
          </div>
          <div className="faq-list">
            {faq.map((item, index) => (
              <AccordionItem
                key={item.question}
                id={String(index)}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
          <div className="faq-cta">
            <p className="text-muted" style={{ marginBottom: 'var(--space-md)' }}>
              Masih ada pertanyaan? Hubungi kami.
            </p>
            <div className="faq-cta__actions">
              <NavLink to="/kontak" className="btn btn-primary">Isi Brief Proyek</NavLink>
              <a
                href={
                  'https://wa.me/' +
                  company.whatsapp +
                  '?text=' +
                  encodeURIComponent(
                    'Halo IDKA Solutions, saya ingin bertanya tentang jasa website.',
                  )
                }
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa"
              >
                Chat WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
