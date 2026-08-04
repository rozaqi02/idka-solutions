import { NavLink } from 'react-router-dom'
import { company, products } from '../data/content'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useHeroEnter } from '../hooks/useHeroEnter'
import { usePageTitle } from '../hooks/usePageTitle'
import WordReveal from '../components/WordReveal'
import './Produk.css'

export default function Produk() {
  useScrollReveal()
  useHeroEnter()
  usePageTitle({
    title: 'Produk',
    description:
      'Produk digital IDKA Solutions — Dashboard UMKM dan Ngelamar, personal career CRM untuk melacak lamaran kerja.',
    path: '/produk',
  })

  return (
    <div className="produk-page">
      <section className="apple-hero section" aria-labelledby="produk-heading" data-hero-enter="produk">
        <div className="container">
          <div className="apple-hero__inner">
            <div className="apple-hero__eyebrow hero-in__item hero-in__item--tag">Produk IDKA</div>
            <h1 id="produk-heading" className="apple-hero__title hero-in__item hero-in__item--title">
              <WordReveal>Produk digital yang</WordReveal>{' '}
              <WordReveal className="apple-hero__title-accent">segera hadir.</WordReveal>
            </h1>
            <p className="apple-hero__subtitle hero-in__item hero-in__item--sub">
              Selain website, kami membangun produk untuk operasional bisnis dan perjalanan karier yang lebih tertata.
            </p>
          </div>
        </div>
      </section>

      <section className="section produk-showcase" aria-labelledby="produk-list-heading">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag">Coming Soon</div>
            <h2 id="produk-list-heading" className="section-title">
              Dua produk dalam pipeline
            </h2>
            <p className="section-subtitle">
              Dirancang sederhana, fokus pada pekerjaan nyata, dan nyaman digunakan setiap hari.
            </p>
          </div>

          <div className="produk-bento">
            {products.map((p, i) => (
              <article
                key={p.id}
                className={`produk-card produk-card--${p.accent} reveal reveal--delay-${i + 1}`}
              >
                <div className="produk-card__badge">{p.status}</div>
                <div className="produk-card__visual" aria-hidden="true">
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
                    <div className="produk-mock produk-mock--phone">
                      <div className="produk-mock__phone-notch" />
                      <div className="produk-mock__phone-screen">
                        <img
                          src="/portfolio/ngelamar-app.png"
                          alt="Tampilan Asli Aplikasi Ngelamar (v1.7.6)"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="produk-card__content">
                  <span className="produk-card__icon" aria-hidden="true">{p.icon}</span>
                  <h3 className="produk-card__title">{p.title}</h3>
                  <p className="produk-card__tagline">{p.tagline}</p>
                  
                  {p.downloadUrl && (
                    <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <a
                        href={p.downloadUrl}
                        download={p.downloadName || 'Ngelamar.apk'}
                        className="btn btn-primary"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          padding: '10px 18px',
                          borderRadius: '12px',
                          textDecoration: 'none',
                          fontWeight: 600,
                          fontSize: '14px',
                        }}
                      >
                        <span>📥 Unduh APK Gratis</span>
                        <span style={{ fontSize: '12px', opacity: 0.85 }}>({p.version} • {p.fileSize})</span>
                      </a>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="produk-cta reveal">
            <p className="produk-cta__text">
               Tertarik menjadi early user atau membutuhkan sistem serupa untuk bisnis Anda?
            </p>
            <div className="produk-cta__actions">
              <NavLink to="/kontak" className="btn btn-primary">
                Hubungi Kami
              </NavLink>
              <a
                href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent('Halo IDKA, saya tertarik produk Coming Soon (Dashboard UMKM / Ngelamar).')}`}
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
