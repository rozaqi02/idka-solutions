import { NavLink } from 'react-router-dom'
import { company, teamMembers, techStack, workValues, stats } from '../data/content'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useHeroEnter } from '../hooks/useHeroEnter'
import { usePageTitle } from '../hooks/usePageTitle'
import WordReveal from '../components/WordReveal'
import ScribbleUnderline from '../components/ScribbleUnderline'
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
    <div className="layanan-page tentang-page">
      {/* Apple Business Page Header */}
      <section className="apple-hero page-header section artistic-hero" aria-labelledby="tentang-heading" data-hero-enter="tentang">
        <div className="container">
          <div className="apple-hero__inner">
            <div className="apple-hero__eyebrow hero-in__item hero-in__item--tag doodle-tag">
              <span>Tentang IDKA Solutions</span>
            </div>
            <h1 id="tentang-heading" className="apple-hero__title hero-in__item hero-in__item--title artistic-title">
              <WordReveal>Mitra Digital untuk</WordReveal>{' '}
              <WordReveal className="apple-hero__title-accent">Pertumbuhan Bisnis Anda.</WordReveal>
              <ScribbleUnderline variant="arc" />
            </h1>
            <p className="apple-hero__subtitle hero-in__item hero-in__item--sub">
              Membantu UMKM, profesional, dan startup membangun kehadiran digital yang kredibel, modern, dan berdampak.{' '}
              <strong className="apple-text-bold">Semua kebutuhan digital, dalam satu langkah yang jelas.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section section--tint layanan-artistic-section tentang-story" aria-labelledby="story-heading">
        <div className="container">
          <div className="story-grid">
            <div className="story-visual reveal reveal--left" aria-hidden="true">
              <div className="story-card art-card art-card--v1">
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
                    <div key={s.num} className="story-stat art-card__tag-doodle">
                      <span className="story-stat__num">{s.num}</span>
                      <span className="story-stat__label">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="story-content reveal reveal--right">
              <div className="section-tag doodle-tag" style={{ alignSelf: 'flex-start' }}>
                <span>Cerita Kami</span>
              </div>
              <h2 id="story-heading" className="section-title artistic-title" style={{ textAlign: 'left' }}>
                Mengapa Kehadiran Online Perlu Lebih Mudah
                <ScribbleUnderline variant="double" />
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
              <NavLink to="/kontak" className="art-card__btn-doodle" style={{ alignSelf: 'flex-start' }}>
                <span>Hubungi Kami</span>
                <svg className="art-card__btn-arrow" width="22" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M 2 7 Q 10 3, 18 7 M 15 2 L 21 7 L 15 12" />
                </svg>
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
      <section className="section tentang-values" aria-labelledby="values-heading">
        <div className="container">
          <div className="section-header reveal artistic-header">
            <div className="section-tag doodle-tag">
              <span>Nilai Kami</span>
            </div>
            <h2 id="values-heading" className="section-title artistic-title">
              Yang Membedakan Kami
              <ScribbleUnderline variant="zigzag" />
            </h2>
          </div>
          <div className="values-grid">
            {workValues.map((val, i) => (
              <div key={val.title} className={`value-card art-card art-card--v${(i % 4) + 1} reveal reveal--delay-${Math.min(i + 1, 5)}`}>
                <div className="value-card__icon art-card__tag-doodle" aria-hidden="true">{val.icon}</div>
                <h3 className="value-card__title art-card__title">{val.title}</h3>
                <p className="value-card__desc art-card__desc">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section section--tint tentang-team" aria-labelledby="team-heading">
        <div className="container">
          <div className="section-header reveal artistic-header">
            <div className="section-tag doodle-tag">
              <span>Tim IDKA</span>
            </div>
            <h2 id="team-heading" className="section-title artistic-title">
              Tim di Balik IDKA Solutions
              <ScribbleUnderline variant="wavy" />
            </h2>
            <p className="section-subtitle artistic-subtitle">
              Tim ringkas dengan keahlian yang saling melengkapi—fokus pada website berkualitas dan hasil yang memuaskan.
            </p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, i) => (
              <div key={member.id} className={`team-card art-card art-card--v${(i % 4) + 1} reveal reveal--delay-${Math.min(i + 1, 5)}`}>
                <div className="team-card__photo-wrap">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="team-card__photo"
                      width={160}
                      height={160}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="team-card__photo team-card__photo--placeholder" aria-hidden="true">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h3 className="team-card__name art-card__title">{member.name}</h3>
                <div className="team-card__role art-card__tag-doodle">{member.role}</div>
                <p className="team-card__desc art-card__desc">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section tentang-tech" aria-labelledby="tech-heading">
        <div className="container">
          <div className="section-header reveal artistic-header">
            <div className="section-tag doodle-tag">
              <span>Teknologi</span>
            </div>
            <h2 id="tech-heading" className="section-title artistic-title">
              Tools yang Kami Gunakan
              <ScribbleUnderline variant="arc" />
            </h2>
            <p className="section-subtitle artistic-subtitle">
              Teknologi modern dan teruji, dipilih untuk website yang cepat, aman, dan mudah dikembangkan.
            </p>
          </div>
          <div className="tech-grid">
            {techStack.map((tech, i) => (
              <div key={tech.name} className={`tech-badge tech-badge--${tech.category} art-card__tag-doodle reveal reveal--delay-${Math.min(i % 5 + 1, 5)}`}>
                <span className="tech-badge__icon" aria-hidden="true">{tech.icon}</span>
                <span className="tech-badge__name">{tech.name}</span>
                <span className="tech-badge__category">{tech.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Market */}
      <section className="section section--tint tentang-target" aria-labelledby="target-heading">
        <div className="container">
          <div className="section-header artistic-header">
            <div className="section-tag doodle-tag"><span>Untuk Siapa</span></div>
            <h2 id="target-heading" className="section-title artistic-title">
              Siapa yang Kami Layani
              <ScribbleUnderline variant="double" />
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
            ].map((seg, i) => (
              <div key={seg.title} className={`target-card art-card art-card--v${(i % 4) + 1}`}>
                <div className="target-card__icon" aria-hidden="true">{seg.icon}</div>
                <h3 className="target-card__title art-card__title">{seg.title}</h3>
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
      <section className="section tentang-cta">
        <div className="container">
          <div className="tentang-cta__card art-card art-card--v1 art-card--featured text-center reveal reveal--scale">
            <div className="section-tag doodle-tag" style={{ display: 'inline-block' }}><span>Mari Berkolaborasi</span></div>
            <h2 className="tentang-cta__title artistic-title">
              Bisnis Anda Layak <span className="gradient-text">Website yang Lebih Baik</span>
              <ScribbleUnderline variant="wavy" />
            </h2>
            <p className="tentang-cta__desc artistic-subtitle">
              Sudah memiliki gambaran kebutuhan? Hubungi kami. Masih mempertimbangkan opsi? Kami bantu merumuskannya.
            </p>
            <div className="tentang-cta__actions">
              <NavLink to="/kontak" className="art-card__btn-doodle">
                <span>Konsultasi Gratis</span>
                <svg className="art-card__btn-arrow" width="22" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M 2 7 Q 10 3, 18 7 M 15 2 L 21 7 L 15 12" />
                </svg>
              </NavLink>
              <NavLink to="/layanan" className="art-card__btn-doodle">
                <span>Lihat Layanan</span>
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
