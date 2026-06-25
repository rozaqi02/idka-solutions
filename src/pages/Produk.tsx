import { NavLink } from 'react-router-dom'
import { products, company } from '../data/content'
import './Produk.css'

export default function Produk() {
  return (
    <div className="produk-page">
      {/* Header */}
      <section className="page-header section" aria-labelledby="produk-heading">
        <div className="container">
          <div className="page-header__inner">
            <div className="section-tag">Template Siap Gas</div>
            <h1 id="produk-heading" className="section-title">
              Budget Terbatas? <span className="gradient-text">Template-nya Tetap Keren</span>
            </h1>
            <p className="section-subtitle">
              Pilih template, pakai sendiri atau minta kami custom sesuai brand kamu. Cepat, terjangkau, langsung bisa dipake.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section" aria-labelledby="products-heading">
        <div className="container">
          <div className="section-header">
            <h2 id="products-heading" className="section-title">
              Semua Template, <span className="gradient-text">Tinggal Pilih yang Cocok</span>
            </h2>
          </div>
          <div className="produk-grid">
            {products.map((prod) => (
              <article key={prod.id} className="produk-card neu-raised">
                <div
                  className="produk-card__visual"
                  style={{ background: `linear-gradient(135deg, ${prod.color}18 0%, ${prod.color}38 100%)` }}
                  aria-hidden="true"
                >
                  <div
                    className="produk-card__icon-wrap"
                    style={{ background: `${prod.color}22`, boxShadow: `4px 4px 12px ${prod.color}30, -4px -4px 12px rgba(255,255,255,0.8)` }}
                  >
                    <span className="produk-card__icon">{prod.icon}</span>
                  </div>
                  <span
                    className="produk-card__category"
                    style={{ background: prod.color }}
                  >
                    {prod.category}
                  </span>
                </div>

                <div className="produk-card__body">
                  <h3 className="produk-card__name">{prod.name}</h3>
                  <p className="produk-card__desc">{prod.description}</p>
                  <ul className="produk-card__features" role="list">
                    {prod.features.map((f, i) => (
                      <li key={i} className="produk-card__feature">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="produk-card__actions">
                    <a
                      href={`https://wa.me/${company.whatsapp}?text=Halo%20IDKA%20Solutions!%20Saya%20tertarik%20dengan%20${encodeURIComponent(prod.name)}.%20Boleh%20info%20lebih%20lanjut%3F`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary produk-card__btn"
                    >
                      Tanya Harga 💬
                    </a>
                    <NavLink to="/kontak" className="btn btn-secondary produk-card__btn">
                      Custom Brand
                    </NavLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Upsell Section */}
      <section className="section produk-upsell" aria-labelledby="upsell-heading">
        <div className="container">
          <div className="upsell-card neu-raised-lg">
            <div className="upsell-card__content">
              <div className="section-tag">Mau Lebih Personal?</div>
              <h2 id="upsell-heading" className="upsell-card__title">
                Template-nya Kami yang Pasang & Custom Sesuai Brand Kamu
              </h2>
              <p className="upsell-card__desc">
                Nggak mau ribet setting sendiri? Kami yang handle—dari ganti logo, warna brand, teks, gambar, sambungin tombol WA, sampe website live di domain kamu sendiri.
              </p>
              <div className="upsell-card__features">
                {[
                  { icon: '🎨', label: 'Ganti logo & warna brand' },
                  { icon: '✏️', label: 'Update teks & gambar' },
                  { icon: '💬', label: 'Sambung tombol WhatsApp' },
                  { icon: '🌐', label: 'Setup domain & hosting' },
                  { icon: '📱', label: 'Responsive mobile' },
                  { icon: '⚡', label: 'Pengerjaan cepat' },
                ].map((f) => (
                  <div key={f.label} className="upsell-feature neu-raised">
                    <span aria-hidden="true">{f.icon}</span>
                    <span>{f.label}</span>
                  </div>
                ))}
              </div>
              <NavLink to="/kontak" className="btn btn-primary">
                Yuk, Custom Sekarang!
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Custom vs Template */}
      <section className="section produk-compare">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Bingung Pilih <span className="gradient-text">Template atau Custom?</span>
            </h2>
            <p className="section-subtitle">Ini bedanya biar kamu bisa milih yang paling cocok sama kondisi bisnis kamu sekarang.</p>
          </div>
          <div className="compare-grid">
            <div className="compare-card neu-raised">
              <div className="compare-card__header">
                <span className="compare-card__icon" aria-hidden="true">&#128204;</span>
                <h3 className="compare-card__title">Template</h3>
              </div>
              <ul className="compare-card__list" role="list">
                {[
                  'Harga lebih ramah di kantong',
                  'Bisa jadi dalam hitungan hari',
                  'Cocok buat kebutuhan yang udah jelas',
                  'Pakai sendiri atau minta kami setup',
                  'Perfect buat UMKM & personal brand',
                ].map((item) => (
                  <li key={item} className="compare-card__item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <NavLink to="/kontak" className="btn btn-secondary">
                Gas Pakai Template
              </NavLink>
            </div>
            <div className="compare-card compare-card--custom neu-raised">
              <div className="compare-card__header">
                <span className="compare-card__icon" aria-hidden="true">&#11088;</span>
                <h3 className="compare-card__title">Website Custom</h3>
              </div>
              <ul className="compare-card__list" role="list">
                {[
                  'Desain 100% unik, nggak ada yang sama',
                  'Fitur & halaman sesuai kebutuhan spesifik',
                  'Full kontrol tampilan & fungsionalitas',
                  'Cocok buat bisnis yang mau naik level',
                  'Kesan brand jauh lebih kuat & premium',
                ].map((item) => (
                  <li key={item} className="compare-card__item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <NavLink to="/layanan" className="btn btn-primary">
                Mau yang Full Custom
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
