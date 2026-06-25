import { NavLink } from 'react-router-dom'
import { services, packages, maintenancePackages, faq } from '../data/content'
import PriceEstimator from '../components/PriceEstimator'
import './Layanan.css'

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="faq-item neu-raised">
      <summary className="faq-item__question">
        {question}
        <svg className="faq-item__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </summary>
      <div className="faq-item__answer">
        <p>{answer}</p>
      </div>
    </details>
  )
}

export default function Layanan() {
  return (
    <div className="layanan-page">
      {/* Page Header */}
      <section className="page-header section" aria-labelledby="layanan-heading">
        <div className="container">
          <div className="page-header__inner">
            <div className="section-tag">Semua Layanan</div>
            <h1 id="layanan-heading" className="section-title">
              Website Apapun yang Kamu Butuhkan, <span className="gradient-text">Kami Bisa</span>
            </h1>
            <p className="section-subtitle">
              UMKM, freelancer, startup, kreator—semua welcome. Dari yang simpel sampe yang kompleks, kami handle.
            </p>
          </div>
        </div>
      </section>

      {/* All Services */}
      <section className="section" aria-labelledby="all-services-heading">
        <div className="container">
          <div className="section-header">
            <h2 id="all-services-heading" className="section-title">
              Yang Bisa Kami <span className="gradient-text">Buatin Buat Kamu</span>
            </h2>
          </div>
          <div className="layanan-grid">
            {services.map((svc) => (
              <div key={svc.id} className="layanan-card neu-raised">
                <div className="layanan-card__icon neu-inset" aria-hidden="true">
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
      <section className="section layanan-packages" aria-labelledby="packages-heading">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Pilih Paket</div>
            <h2 id="packages-heading" className="section-title">
              Harga Jelas, <span className="gradient-text">Nggak Ada yang Disembunyiin</span>
            </h2>
            <p className="section-subtitle">
              Semua udah tertulis jelas dari awal—scope, revisi, harga. Biar kamu bisa planning dengan tenang.
            </p>
          </div>
          <div className="packages-grid">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`package-card neu-raised${pkg.highlighted ? ' package-card--highlighted' : ''}`}
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
          <div className="section-header">
            <div className="section-tag">Maintenance</div>
            <h2 id="maintenance-heading" className="section-title">
              Website Udah Live? <span className="gradient-text">Kami yang Jaga</span>
            </h2>
            <p className="section-subtitle">
              Website yang nggak dijaga lama-lama bisa lemot, error, atau tiba-tiba down pas lagi rame. Biar itu nggak kejadian, ada maintenance.
            </p>
          </div>
          <div className="maintenance-grid">
            {maintenancePackages.map((pkg, idx) => (
              <div key={pkg.name} className={`maintenance-card neu-raised${idx === 1 ? ' maintenance-card--mid' : ''}`}>
                <h3 className="maintenance-card__name">{pkg.name}</h3>
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
                  Tanya Harga
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
              Gimana Kami <span className="gradient-text">Ngerjain Website Kamu</span>
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
              Cek Estimasi Harga <span className="gradient-text">Sekarang Juga</span>
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
      <section className="section" aria-labelledby="faq-heading">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">FAQ</div>
            <h2 id="faq-heading" className="section-title">
              Yang Sering <span className="gradient-text">Ditanyain</span>
            </h2>
          </div>
          <div className="faq-list">
            {faq.map((item, i) => (
              <AccordionItem key={i} question={item.question} answer={item.answer} />
            ))}
          </div>
          <div className="faq-cta text-center" style={{ marginTop: 'var(--space-2xl)' }}>
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
