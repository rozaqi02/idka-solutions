import { NavLink } from 'react-router-dom'
import { company, teamMembers, techStack, workValues, stats } from '../data/content'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useHeroEnter } from '../hooks/useHeroEnter'
import { usePageTitle } from '../hooks/usePageTitle'
import './TentangKami.css'

export default function TentangKami() {
  useScrollReveal()
  useHeroEnter()
  usePageTitle({
    title: 'Tentang Kami',
    description:
      'Kenali IDKA Solutions — mitra digital yang membantu bisnis tampil profesional online melalui website modern dan berdampak.',
    path: '/tentang',
  })

  return (
    <div className="tentang-page">
      {/* Header */}
      <section className="page-header section" aria-labelledby="tentang-heading" data-hero-enter="tentang">
        <div className="container">
          <div className="page-header__inner">
            <div className="section-tag hero-in__item hero-in__item--tag">Tentang Kami</div>
            <h1 id="tentang-heading" className="section-title hero-in__item hero-in__item--title">
              Kami <span className="gradient-text">IDKA Solutions</span>
            </h1>
            <p className="section-subtitle hero-in__item hero-in__item--sub">
              Mitra digital yang membantu bisnis membangun website profesional dan mendukung pertumbuhan online.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section tentang-story" aria-labelledby="story-heading">
        <div className="container">
          <div className="story-grid">
            <div className="story-visual reveal reveal--left" aria-hidden="true">
              <div className="story-card neu-raised-lg">
                <div className="story-card__logo">
                  <img
                    src="/logo-idka-solutions.png"
                    alt="IDKA Solutions"
                    className="story-logo-img"
                    width="40"
                    height="40"
                  />
                  <div>
                    <div className="story-logo-name">IDKA Solutions</div>
                    <div className="story-logo-tagline">{company.tagline}</div>
                  </div>
                </div>
                <div className="story-card__divider" />
                <p className="story-card__quote">
                  &ldquo;Setiap bisnis berhak tampil profesional di internet—tanpa memandang skala.&rdquo;
                </p>
                <div className="story-card__stats">
                  {stats.map((s) => (
                    <div key={s.num} className="story-stat neu-inset">
                      <span className="story-stat__num">{s.num}</span>
                      <span className="story-stat__label">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="story-content reveal reveal--right">
              <div className="section-tag" style={{ alignSelf: 'flex-start' }}>Cerita Kami</div>
              <h2 id="story-heading" className="section-title" style={{ textAlign: 'left' }}>
                Mengapa Kehadiran Online Perlu Lebih Mudah
              </h2>
              <div className="story-text">
                <p>
                  Saya <strong>Abror Rozaqi</strong>, founder IDKA Solutions. Saya sering melihat bisnis potensial di sekitar—kafe, jasa kreatif, UMKM lokal—yang belum punya kehadiran online yang memadai, atau tampil kurang profesional.
                </p>
                <p>
                  Dari situ IDKA Solutions berdiri. Bersama tim kecil, kami membantu UMKM, freelancer, kreator, dan startup hadir secara online dengan cara yang efisien. Bukan sekadar website formalitas, tetapi website yang mendukung kredibilitas dan pertumbuhan bisnis.
                </p>
                <p>
                  {company.position}
                </p>
              </div>
              <NavLink to="/kontak" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                Hubungi Kami
              </NavLink>
            </div>
          </div>

          {/* Mobile stats — visible only on mobile when story-visual is hidden */}
          <div className="story-mobile-stats">
            {stats.map((s) => (
              <div key={s.num} className="story-mobile-stat">
                <span className="story-mobile-stat__num">{s.num}</span>
                <span className="story-mobile-stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section section--tint tentang-values" aria-labelledby="values-heading">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag">Nilai Kami</div>
            <h2 id="values-heading" className="section-title">
              Yang Membedakan Kami
            </h2>
          </div>
          <div className="values-grid">
            {workValues.map((val, i) => (
              <div key={val.title} className={`value-card neu-raised reveal reveal--delay-${Math.min(i + 1, 5)}`}>
                <div className="value-card__icon neu-inset" aria-hidden="true">{val.icon}</div>
                <h3 className="value-card__title">{val.title}</h3>
                <p className="value-card__desc">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section tentang-team" aria-labelledby="team-heading">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag">Tim</div>
            <h2 id="team-heading" className="section-title">
              Tim di Balik IDKA Solutions
            </h2>
            <p className="section-subtitle">
              Tim ringkas dengan keahlian yang saling melengkapi—fokus pada website berkualitas dan hasil yang memuaskan.
            </p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, i) => (
              <div key={member.id} className={`team-card neu-raised reveal reveal--delay-${Math.min(i + 1, 5)}`}>
                <div className="team-card__avatar neu-inset" aria-hidden="true">
                  {member.icon}
                </div>
                <h3 className="team-card__name">{member.name}</h3>
                <div className="team-card__role">{member.role}</div>
                <p className="team-card__desc">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section tentang-tech" aria-labelledby="tech-heading">
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag">Teknologi</div>
            <h2 id="tech-heading" className="section-title">
              Tools yang Kami Gunakan
            </h2>
            <p className="section-subtitle">
              Teknologi modern dan teruji, dipilih untuk website yang cepat, aman, dan mudah dikembangkan.
            </p>
          </div>
          <div className="tech-grid">
            {techStack.map((tech, i) => (
              <div key={tech.name} className={`tech-badge tech-badge--${tech.category} neu-raised reveal reveal--delay-${Math.min(i % 5 + 1, 5)}`}>
                <span className="tech-badge__icon" aria-hidden="true">{tech.icon}</span>
                <span className="tech-badge__name">{tech.name}</span>
                <span className="tech-badge__category">{tech.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Market */}
      <section className="section tentang-target" aria-labelledby="target-heading">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Untuk Siapa</div>
            <h2 id="target-heading" className="section-title">
              Siapa yang Kami Layani
            </h2>
          </div>
          <div className="target-grid">
            {[
              {
                icon: '🏪',
                title: 'UMKM & Bisnis Lokal',
                examples: 'Kafe, laundry, salon, toko, jasa rumahan',
                need: 'Profil bisnis online, katalog produk, tombol WhatsApp, kredibilitas yang lebih kuat',
              },
              {
                icon: '🎯',
                title: 'Freelancer & Kreator',
                examples: 'Fotografer, coach, desainer, content creator',
                need: 'Portofolio profesional, landing page, personal branding yang jelas',
              },
              {
                icon: '🚀',
                title: 'Startup & Bisnis Baru',
                examples: 'Side project, bisnis tahap awal, produk baru',
                need: 'Company profile yang kredibel, landing page, MVP yang sederhana dan efektif',
              },
              {
                icon: '💼',
                title: 'Bisnis yang Naik Level',
                examples: 'Perusahaan kecil, startup profesional',
                need: 'Website yang lebih kredibel, case study, kesan brand yang lebih premium',
              },
            ].map((seg) => (
              <div key={seg.title} className="target-card neu-raised">
                <div className="target-card__icon" aria-hidden="true">{seg.icon}</div>
                <h3 className="target-card__title">{seg.title}</h3>
                <div className="target-card__examples">
                  <span className="target-card__label">Contoh:</span> {seg.examples}
                </div>
                <div className="target-card__need">
                  <span className="target-card__label">Kebutuhan:</span> {seg.need}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--tint tentang-cta">
        <div className="container">
          <div className="tentang-cta__card neu-raised-lg text-center reveal reveal--scale">
            <div className="section-tag" style={{ display: 'inline-block' }}>Mari Berkolaborasi</div>
            <h2 className="tentang-cta__title">
              Bisnis Anda Layak <span className="gradient-text">Website yang Lebih Baik</span>
            </h2>
            <p className="tentang-cta__desc">
              Sudah memiliki gambaran kebutuhan? Hubungi kami. Masih mempertimbangkan opsi? Kami bantu merumuskannya.
            </p>
            <div className="tentang-cta__actions">
              <NavLink to="/kontak" className="btn btn-primary">Konsultasi Gratis</NavLink>
              <NavLink to="/layanan" className="btn btn-secondary">Lihat Layanan</NavLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
