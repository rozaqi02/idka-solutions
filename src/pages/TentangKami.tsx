import { NavLink } from 'react-router-dom'
import { company, teamMembers, techStack, workValues } from '../data/content'
import './TentangKami.css'

export default function TentangKami() {
  return (
    <div className="tentang-page">
      {/* Header */}
      <section className="page-header section" aria-labelledby="tentang-heading">
        <div className="container">
          <div className="page-header__inner">
            <div className="section-tag">Who We Are</div>
            <h1 id="tentang-heading" className="section-title">
              Hai, Kami <span className="gradient-text">IDKA Solutions</span> 👋
            </h1>
            <p className="section-subtitle">
              Bukan sekadar jasa bikin website. Kami partner digital yang genuinely peduli sama pertumbuhan bisnis kamu online.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section tentang-story" aria-labelledby="story-heading">
        <div className="container">
          <div className="story-grid">
            <div className="story-visual" aria-hidden="true">
              <div className="story-card neu-raised-lg">
                <div className="story-card__logo">
                  <div className="story-logo-icon">I</div>
                  <div>
                    <div className="story-logo-name">IDKA Solutions</div>
                    <div className="story-logo-tagline">{company.tagline}</div>
                  </div>
                </div>
                <div className="story-card__divider" />
                <p className="story-card__quote">
                  &ldquo;Every business deserves to look legit online—nggak peduli seberapa kecil bisnis kamu.&rdquo;
                </p>
                <div className="story-card__stats">
                  <div className="story-stat neu-inset">
                    <span className="story-stat__num">50+</span>
                    <span className="story-stat__label">Proyek</span>
                  </div>
                  <div className="story-stat neu-inset">
                    <span className="story-stat__num">100%</span>
                    <span className="story-stat__label">Klien Puas</span>
                  </div>
                  <div className="story-stat neu-inset">
                    <span className="story-stat__num">4</span>
                    <span className="story-stat__label">Tim Ahli</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="story-content">
              <div className="section-tag" style={{ alignSelf: 'flex-start' }}>Our Story</div>
              <h2 id="story-heading" className="section-title" style={{ textAlign: 'left' }}>
                Dari Satu Pertanyaan: <span className="gradient-text">&ldquo;Kenapa Susah Banget Eksis Online?&rdquo;</span>
              </h2>
              <div className="story-text">
                <p>
                  IDKA Solutions lahir dari frustrasi yang banyak dialami—bisnis bagus, produk oke, tapi online-nya nggak ada atau terkesan amatir. Padahal kesan pertama di internet itu penting banget.
                </p>
                <p>
                  Kami hadir buat UMKM, freelancer, kreator, dan startup yang pengen eksis online tapi nggak mau ribet. Bukan sekadar bikin website &ldquo;biar ada&rdquo;—tapi website yang beneran ngasih impact buat bisnis kamu.
                </p>
                <p>
                  {company.position}
                </p>
              </div>
              <NavLink to="/kontak" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                Kolaborasi Yuk!
              </NavLink>
            </div>
          </div>

          {/* Mobile stats — visible only on mobile when story-visual is hidden */}
          <div className="story-mobile-stats">
            <div className="story-mobile-stat">
              <span className="story-mobile-stat__num">50+</span>
              <span className="story-mobile-stat__label">Proyek</span>
            </div>
            <div className="story-mobile-stat">
              <span className="story-mobile-stat__num">100%</span>
              <span className="story-mobile-stat__label">Klien Puas</span>
            </div>
            <div className="story-mobile-stat">
              <span className="story-mobile-stat__num">4</span>
              <span className="story-mobile-stat__label">Tim Ahli</span>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section tentang-values" aria-labelledby="values-heading">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">How We Roll</div>
            <h2 id="values-heading" className="section-title">
              Ini yang Bikin Kami <span className="gradient-text">Beda</span>
            </h2>
          </div>
          <div className="values-grid">
            {workValues.map((val) => (
              <div key={val.title} className="value-card neu-raised">
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
          <div className="section-header">
            <div className="section-tag">Meet the Team</div>
            <h2 id="team-heading" className="section-title">
              The People Behind <span className="gradient-text">IDKA Solutions</span>
            </h2>
            <p className="section-subtitle">
              Tim kecil tapi mighty. Masing-masing punya expertise-nya sendiri, semua fokus ke satu hal: website kamu harus keren dan nggak bikin kamu kecewa.
            </p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-card neu-raised">
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
          <div className="section-header">
            <div className="section-tag">Tech Stack</div>
            <h2 id="tech-heading" className="section-title">
              Tools yang Kami <span className="gradient-text">Pakai Sehari-hari</span>
            </h2>
            <p className="section-subtitle">
              Semua modern, battle-tested, dan dipilih buat bikin website yang ngebut, aman, dan scalable.
            </p>
          </div>
          <div className="tech-grid">
            {techStack.map((tech) => (
              <div key={tech.name} className={`tech-badge tech-badge--${tech.category} neu-raised`}>
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
            <div className="section-tag">Untuk Siapa?</div>
            <h2 id="target-heading" className="section-title">
              Kalau Kamu <span className="gradient-text">Salah Satu dari Ini</span>, Kami Bisa Bantu
            </h2>
          </div>
          <div className="target-grid">
                          {[
              {
                icon: '🏪',
                title: 'UMKM & Bisnis Lokal',
                examples: 'Kafe, laundry, salon, toko, jasa rumahan',
                need: 'Profil bisnis online, katalog produk, tombol WA, trust yang lebih tinggi',
              },
              {
                icon: '🎯',
                title: 'Freelancer & Kreator',
                examples: 'Fotografer, coach, desainer, content creator',
                need: 'Portofolio keren, landing page, personal branding yang strong',
              },
              {
                icon: '🚀',
                title: 'Startup & Bisnis Baru',
                examples: 'Side project, bisnis tahap awal, produk baru',
                need: 'Company profile yang legit, landing page, MVP yang simple tapi keren',
              },
              {
                icon: '💼',
                title: 'Bisnis yang Mau Naik Level',
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
      <section className="section tentang-cta">
        <div className="container">
          <div className="tentang-cta__card neu-raised-lg text-center">
            <div className="section-tag" style={{ display: 'inline-block' }}>Let&apos;s Work Together</div>
            <h2 className="tentang-cta__title">
              Bisnis Kamu Deserve <span className="gradient-text">Website yang Lebih Baik</span>
            </h2>
            <p className="tentang-cta__desc">
              Udah tau apa yang dibutuhkan? Gas langsung kontak kami. Masih bingung? Juga boleh—kami bantu figure out bareng.
            </p>
            <div className="tentang-cta__actions">
              <NavLink to="/kontak" className="btn btn-primary">Ngobrol Dulu, Gratis!</NavLink>
              <NavLink to="/layanan" className="btn btn-secondary">Cek Layanan Kami</NavLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
