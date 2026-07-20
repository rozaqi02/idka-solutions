import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { company, services, packages, maintenancePackages, faq } from '../data/content'
import PriceEstimator from '../components/PriceEstimator'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useHeroEnter } from '../hooks/useHeroEnter'
import { usePageTitle } from '../hooks/usePageTitle'
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

  /* Deep-link dari home service cards: /layanan#company-profile */
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
      {/* Page Header */}
      <section className="page-header section" aria-labelledby="layanan-heading" data-hero-enter="layanan">
        <div className="container">
          <div className="page-header__inner">
            <div className="section-tag hero-in__item hero-in__item--tag">Layanan</div>
            <h1 id="layanan-heading" className="section-title hero-in__item hero-in__item--title">
              Solusi Website untuk Berbagai Kebutuhan
            </h1>
            <p className="section-subtitle hero-in__item hero-in__item--sub">
              Untuk UMKM, freelancer, startup, dan kreator—dari yang sederhana hingga kustom.
            </p>
          </div>
        </div>
      </section>

      {/* All Services */}
      <section className="section" aria-labelledby="all-services-heading">
        <div className="container">
          <div className="section-header reveal">
            <h2 id="all-services-heading" className="section-title">
              Jenis Website yang Kami Kerjakan
            </h2>
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

      {/* Packages */}
      <section className="section section--tint layanan-packages" aria-labelledby="packages-heading">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag">Paket</div>
            <h2 id="packages-heading" className="section-title">
              Harga Transparan, Scope Jelas
            </h2>
            <p className="section-subtitle">
              Ruang lingkup, revisi, dan harga disampaikan di awal agar perencanaan lebih mudah.
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
              <p>Kami menerima proyek di luar paket standar. <NavLink to="/kontak" className="text-primary-color font-semibold">Hubungi kami</NavLink> untuk estimasi yang sesuai.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance */}
      <section className="section layanan-maintenance" aria-labelledby="maintenance-heading">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag">Maintenance</div>
            <h2 id="maintenance-heading" className="section-title">
              Pemeliharaan Setelah Go-Live
            </h2>
            <p className="section-subtitle">
              Website tanpa perawatan rentan lambat, error, atau tidak stabil. Paket maintenance membantu menjaga performa dan keamanan.
            </p>
          </div>
          <div className="maintenance-grid">
            {maintenancePackages.map((pkg, idx) => (
              <div key={pkg.name} className={`maintenance-card neu-raised reveal reveal--delay-${idx + 1}${idx === 1 ? ' maintenance-card--mid' : ''}`}>
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

      {/* Process */}
      <section className="section layanan-process" aria-labelledby="process-heading">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Proses Kerja</div>
            <h2 id="process-heading" className="section-title">
              Tahapan Pengerjaan Website
            </h2>
          </div>
          <div className="process-list">
            {[
              { n: '01', title: 'Brief', desc: 'Kami kumpulkan detail tujuan, fitur, halaman, deadline, dan anggaran.' },
              { n: '02', title: 'Proposal', desc: 'Ruang lingkup, timeline, harga, dan kuota revisi dikirim secara tertulis.' },
              { n: '03', title: 'Materi', desc: 'Anda menyiapkan logo, teks, foto, dan referensi visual.' },
              { n: '04', title: 'Wireframe & Desain', desc: 'Struktur dan desain disetujui terlebih dahulu sebelum development.' },
              { n: '05', title: 'Development', desc: 'Desain diimplementasikan menjadi website. Fitur dan formulir diuji.' },
              { n: '06', title: 'Review & Revisi', desc: 'Anda meninjau staging; revisi dilakukan sesuai kuota yang disepakati.' },
              { n: '07', title: 'Go Live', desc: 'Pelunasan, pengaturan domain, SSL aktif, dan website diluncurkan.' },
              { n: '08', title: 'After Sales', desc: 'Follow-up, opsi testimoni, dan penawaran maintenance jika diperlukan.' },
            ].map((step) => (
              <div key={step.n} className="process-item neu-raised">
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

      {/* Price Estimator */}
      <section className="section layanan-estimator" aria-labelledby="estimator-heading">
        <div className="container">
          <div className="section-header">
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

      {/* FAQ */}
      <section className="section section--tint" aria-labelledby="faq-heading">
        <div className="container">
          <div className="section-header">
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
