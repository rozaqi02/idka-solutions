import { NavLink } from 'react-router-dom'
import { company, products } from '../data/content'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useHeroEnter } from '../hooks/useHeroEnter'
import { usePageTitle } from '../hooks/usePageTitle'
import './Produk.css'

export default function Produk() {
  useScrollReveal()
  useHeroEnter()
  usePageTitle({
    title: 'Produk',
    description:
      'Produk digital IDKA Solutions — Dashboard UMKM dan Absensi Mobile. Segera hadir.',
    path: '/produk',
  })

  return (
    <div className="produk-page">
      <section className="apple-hero section" aria-labelledby="produk-heading" data-hero-enter="produk">
        <div className="container">
          <div className="apple-hero__inner">
            <div className="apple-hero__eyebrow hero-in__item hero-in__item--tag">Produk IDKA</div>
            <h1 id="produk-heading" className="apple-hero__title hero-in__item hero-in__item--title">
              Software bisnis yang <span className="apple-hero__title-accent">segera hadir.</span>
            </h1>
            <p className="apple-hero__subtitle hero-in__item hero-in__item--sub">
              Selain website, kami membangun produk digital untuk operasional UMKM.
              Dua aplikasi sedang dalam tahap pengembangan.
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
              Dirancang sederhana, modern, dan siap pakai — visual & pengalaman ala Apple.
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
                        <div className="produk-mock__phone-row" />
                        <div className="produk-mock__phone-row produk-mock__phone-row--short" />
                        <div className="produk-mock__phone-btn" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="produk-card__content">
                  <span className="produk-card__icon" aria-hidden="true">{p.icon}</span>
                  <h3 className="produk-card__title">{p.title}</h3>
                  <p className="produk-card__tagline">{p.tagline}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="produk-cta reveal">
            <p className="produk-cta__text">
              Ingin jadi early user atau butuh custom system serupa?
            </p>
            <div className="produk-cta__actions">
              <NavLink to="/kontak" className="btn btn-primary">
                Hubungi Kami
              </NavLink>
              <a
                href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent('Halo IDKA, saya tertarik produk Coming Soon (Dashboard UMKM / Absensi Mobile).')}`}
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
