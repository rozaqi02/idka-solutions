import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { services, packages, maintenancePackages, faq } from '../data/content'
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
  useScrollReveal()
  useHeroEnter()
  usePageTitle({
    title: 'Layanan',
    description:
      'Jasa pembuatan website profesional: landing page, company profile, toko online, portofolio, dan lebih. Harga transparan, hasil keren.',
    path: '/layanan',
  })

  return (
    <div className="layanan-page">
      {/* Page Header */}
      <section className="page-header section" aria-labelledby="layanan-heading" data-hero-enter>
        <div className="container">
          <div className="page-header__inner">
            <div className="section-tag hero-in__item hero-in__item--tag">Semua Layanan</div>
            <h1 id="layanan-heading" className="section-title hero-in__item hero-in__item--title">
              Website Apapun yang Kamu Butuhkan, Kami Bisa
            </h1>
            <p className="section-subtitle hero-in__item hero-in__item--sub">
              UMKM, freelancer, startup, kreator—semua welcome. Dari yang simpel sampe yang kompleks, kami handle.
            </p>
          </div>
        </div>
      </section>

      {/* All Services */}
      <section className="section" aria-labelledby="all-services-heading">
        <div className="container">
          <div className="section-header reveal">
            <h2 id="all-services-heading" className="section-title">
              Yang Bisa Kami Buatin Buat Kamu
            </h2>
          </div>
          <div className="layanan-grid">
            {services.map((svc, i) => (
              <div key={svc.id} className={`layanan-card neu-raised reveal reveal--delay-${Math.min(i % 3 + 1, 5)}`}>
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
            <div className="section-tag">Pilih Paket</div>
            <h2 id="packages-heading" className="section-title">
              Harga Jelas, Tanpa yang Disembunyikan
            </h2>
            <p className="section-subtitle">
              Semua udah tertulis jelas dari awal—scope, revisi, harga. Biar kamu bisa planning dengan tenang.
            </p>
          </div>
          <div className="packages-grid">
            {packages.map((pkg, i) => (
              <div
                key={pkg.id}
                className={`package-card neu-raised reveal reveal--delay-${i + 1}${pkg.highlighted ? ' package-card--highlighted' : ''}`}
              >
                {pkg.highlighted && (
                  <div className="package-card__popular">🔥 Most Picked</div>
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
              <strong>Butuh yang lebih custom?</strong>
              <p>Nggak masalah, kami juga terima proyek di luar paket. <NavLink to="/kontak" className="text-primary-color font-semibold">Ceritain dulu</NavLink> dan kami kasih estimasi yang pas.</p>
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
              Website Udah Live? Kami yang Jaga
            </h2>
            <p className="section-subtitle">
              Website yang nggak dijaga lama-lama bisa lemot, error, atau tiba-tiba down pas lagi rame. Biar itu nggak kejadian, ada maintenance.
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
                  Mulai Sekarang
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
            <div className="section-tag">Behind the Scenes</div>
            <h2 id="process-heading" className="section-title">
              Gimana Kami Ngerjain Website Kamu
            </h2>
          </div>
          <div className="process-list">
            {[
              { n: '01', title: 'Brief', desc: 'Kami tanya semua yang perlu kami tahu—tujuan, fitur, halaman, deadline, dan budget kamu.' },
              { n: '02', title: 'Proposal', desc: 'Kami kirim scope kerja, timeline, harga, dan berapa kali bisa revisi. Semua tertulis jelas.' },
              { n: '03', title: 'Siapkan Materi', desc: 'Kamu kirim logo, teks, foto, dan referensi visual. Kami yang atur sisanya.' },
              { n: '04', title: 'Wireframe & Desain', desc: 'Kami desain dulu strukturnya, kamu setujuin. Baru masuk ke tampilan finalnya.' },
              { n: '05', title: 'Development', desc: 'Desain dibangun jadi website beneran. Semua fitur, tombol, dan form ditest dulu.' },
              { n: '06', title: 'Review & Revisi', desc: 'Kamu cek staging link-nya, kasih feedback, kami revisi sesuai kuota yang udah disepakati.' },
              { n: '07', title: 'Go Live!', desc: 'Pelunasan done, domain tersambung, SSL aktif—website kamu resmi live! 🎉' },
              { n: '08', title: 'After Sales', desc: 'Kami follow-up, minta testimoni, dan tawarkan maintenance biar website kamu tetap prima.' },
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
            <div className="section-tag">Kira-Kira Berapa?</div>
            <h2 id="estimator-heading" className="section-title">
              Cek Estimasi Harga Sekarang Juga
            </h2>
            <p className="section-subtitle">
              Pilih kebutuhanmu dan langsung dapet perkiraan harga. Harga final dikonfirmasi pas konsultasi.
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
              Yang Sering Ditanyain
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
              Masih ada yang pengen ditanyain? Langsung aja chat kami.
            </p>
            <NavLink to="/kontak" className="btn btn-primary">Chat Sekarang</NavLink>
          </div>
        </div>
      </section>
    </div>
  )
}
