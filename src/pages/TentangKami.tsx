import { NavLink } from 'react-router-dom'
import { techStack } from '../data/content'
import { useLanguage } from '../context/LanguageContext'
import { getT } from '../data/translations'
import { getLocalizedCompany, getLocalizedStats, getLocalizedWorkValues, getLocalizedTeamMembers } from '../data/getLocalizedData'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useHeroEnter } from '../hooks/useHeroEnter'
import { usePageTitle } from '../hooks/usePageTitle'
import WordReveal from '../components/WordReveal'
import ScribbleUnderline from '../components/ScribbleUnderline'
import ContinuousLineArt from '../components/ContinuousLineArt'
import './TentangKami.css'

export default function TentangKami() {
  useScrollReveal()
  useHeroEnter()
  const { lang } = useLanguage()
  const t = getT(lang)

  const company = getLocalizedCompany(lang)
  const stats = getLocalizedStats(lang)
  const workValues = getLocalizedWorkValues(lang)
  const teamMembers = getLocalizedTeamMembers(lang)

  usePageTitle({
    title: lang === 'en' ? 'About Us' : 'Tentang Kami',
    description: lang === 'en'
      ? 'Learn about IDKA Solutions — a digital partner helping businesses appear professional online through modern, impactful websites.'
      : 'Kenali IDKA Solutions — mitra digital yang membantu bisnis tampil profesional online melalui website modern dan berdampak.',
    path: '/tentang',
  })

  return (
    <div className="layanan-page tentang-page">
      {/* Apple Business Page Header */}
      <section className="apple-hero page-header section artistic-hero" aria-labelledby="tentang-heading" data-hero-enter="tentang">
        <div className="container">
          <div className="apple-hero__inner">
            <div className="apple-hero__eyebrow hero-in__item hero-in__item--tag doodle-tag">
              <span>{t.tentang.heroEyebrow}</span>
            </div>
            <h1 id="tentang-heading" className="apple-hero__title hero-in__item hero-in__item--title artistic-title">
              <WordReveal>{t.tentang.heroTitle}</WordReveal>{' '}
              <WordReveal className="apple-hero__title-accent">{t.tentang.heroTitleAccent}</WordReveal>
              <ScribbleUnderline variant="arc" />
            </h1>
            <p className="apple-hero__subtitle hero-in__item hero-in__item--sub">
              {t.tentang.heroSubtitle}{' '}
              <strong className="apple-text-bold">{t.tentang.heroSubtitleBold}</strong>
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
                  {lang === 'en'
                    ? '“Every business deserves a professional online presence through quality websites & mobile apps.”'
                    : '“Setiap bisnis berhak tampil profesional di internet lewat website & aplikasi mobile berkualitas.”'}
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
                <span>{t.tentang.storyTag}</span>
              </div>
              <h2 id="story-heading" className="section-title artistic-title" style={{ textAlign: 'left' }}>
                {t.tentang.storyTitle}
                <ScribbleUnderline variant="double" />
              </h2>
              <div className="story-text">
                <p>{t.tentang.storyP1}</p>
                <p>{t.tentang.storyP2}</p>
                <p>{t.tentang.storyP3}</p>
              </div>
              <NavLink to="/kontak" className="art-card__btn-doodle" style={{ alignSelf: 'flex-start' }}>
                <span>{lang === 'en' ? 'Contact Us' : 'Hubungi Kami'}</span>
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
              <span>{t.tentang.valuesTag}</span>
            </div>
            <h2 id="values-heading" className="section-title artistic-title">
              {t.tentang.valuesTitle}
              <ScribbleUnderline variant="zigzag" />
            </h2>
          </div>
          <div className="values-grid">
            {workValues.map((val, i) => (
              <div key={val.title} className={`value-card art-card art-card--v${(i % 4) + 1} reveal reveal--delay-${Math.min(i + 1, 5)}`}>
                <div className="value-card__icon art-card__tag-doodle" aria-hidden="true">
                  {val.icon === 'check' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  )}
                  {val.icon === 'handshake' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.4-.4.9-.6 1.4-.6h4c.6 0 1.1.2 1.4.6L17 21"/><path d="M15 9h-2a2 2 0 1 0 0 4h3c.6 0 1.1-.2 1.4-.6L21 7"/></svg>
                  )}
                  {val.icon === 'zap' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  )}
                  {val.icon === 'target' && (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                  )}
                </div>
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
              <span>{t.tentang.teamTag}</span>
            </div>
            <h2 id="team-heading" className="section-title artistic-title">
              {t.tentang.teamTitle}
              <ScribbleUnderline variant="wavy" />
            </h2>
            <p className="section-subtitle artistic-subtitle">
              {t.tentang.teamSubtitle}
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
              <span>{t.tentang.techTag}</span>
            </div>
            <h2 id="tech-heading" className="section-title artistic-title">
              {t.tentang.techTitle}
              <ScribbleUnderline variant="arc" />
            </h2>
            <p className="section-subtitle artistic-subtitle">
              {t.tentang.techSubtitle}
            </p>
          </div>
          <div className="tech-grid">
            {techStack.map((tech, i) => (
              <div key={tech.name} className={`tech-badge tech-badge--${tech.category} art-card__tag-doodle reveal reveal--delay-${Math.min(i % 5 + 1, 5)}`}>
                <span className="art-card__tag-bullet" aria-hidden="true">•</span>
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
            <div className="section-tag doodle-tag"><span>{lang === 'en' ? 'For Whom' : 'Untuk Siapa'}</span></div>
            <h2 id="target-heading" className="section-title artistic-title">
              {lang === 'en' ? 'Who We Serve' : 'Siapa yang Kami Layani'}
              <ScribbleUnderline variant="double" />
            </h2>
          </div>
          <div className="target-grid">
            {[
              {
                artType: 'building',
                title: lang === 'en' ? 'SMEs & Local Businesses' : 'UMKM & Bisnis Lokal',
                examples: lang === 'en' ? 'Cafes, laundry, salons, stores, home services' : 'Kafe, laundry, salon, toko, jasa rumahan',
                need: lang === 'en' ? 'Online business profile, product catalog, WhatsApp button, stronger credibility' : 'Profil bisnis online, katalog produk, tombol WhatsApp, kredibilitas yang lebih kuat',
              },
              {
                artType: 'shopping-bag',
                title: lang === 'en' ? 'Freelancers & Creators' : 'Freelancer & Kreator',
                examples: lang === 'en' ? 'Photographers, coaches, designers, content creators' : 'Fotografer, coach, desainer, content creator',
                need: lang === 'en' ? 'Professional portfolio, landing page, clear personal branding' : 'Portofolio profesional, landing page, personal branding yang jelas',
              },
              {
                artType: 'smartphone',
                title: lang === 'en' ? 'Startups & New Ventures' : 'Startup & Bisnis Baru',
                examples: lang === 'en' ? 'Side projects, early-stage business, new product launches' : 'Side project, bisnis tahap awal, produk baru',
                need: lang === 'en' ? 'Credible company profile, landing page, simple & effective MVP' : 'Company profile yang kredibel, landing page, MVP yang sederhana dan efektif',
              },
              {
                artType: 'shield-check',
                title: lang === 'en' ? 'Scaling Businesses' : 'Bisnis yang Naik Level',
                examples: lang === 'en' ? 'Growing companies, professional startups' : 'Perusahaan kecil, startup profesional',
                need: lang === 'en' ? 'More credible website, case studies, premium brand positioning' : 'Website yang lebih kredibel, case study, kesan brand yang lebih premium',
              },
            ].map((seg, i) => (
              <div key={seg.title} className={`target-card art-card art-card--v${(i % 4) + 1}`}>
                <div className="art-card__illustration" style={{ width: 75, height: 55, margin: '0 auto 0.75rem' }} aria-hidden="true">
                  <ContinuousLineArt type={seg.artType} />
                </div>
                <h3 className="target-card__title art-card__title">{seg.title}</h3>
                <div className="target-card__examples">
                  <span className="target-card__label">{lang === 'en' ? 'Examples:' : 'Contoh:'}</span> {seg.examples}
                </div>
                <div className="target-card__need">
                  <span className="target-card__label">{lang === 'en' ? 'Needs:' : 'Kebutuhan:'}</span> {seg.need}
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
            <div className="section-tag doodle-tag" style={{ display: 'inline-block' }}><span>{lang === 'en' ? "Let's Collaborate" : 'Mari Berkolaborasi'}</span></div>
            <h2 className="tentang-cta__title artistic-title">
              {lang === 'en' ? 'Your Business Deserves ' : 'Bisnis Anda Layak '}
              <span className="gradient-text">{lang === 'en' ? 'a Better Website' : 'Website yang Lebih Baik'}</span>
              <ScribbleUnderline variant="wavy" />
            </h2>
            <p className="tentang-cta__desc artistic-subtitle">
              {lang === 'en'
                ? 'Already have an idea of your requirements? Contact us. Still weighing your options? We will help you formulate them.'
                : 'Sudah memiliki gambaran kebutuhan? Hubungi kami. Masih mempertimbangkan opsi? Kami bantu merumuskannya.'}
            </p>
            <div className="tentang-cta__actions">
              <NavLink to="/kontak" className="art-card__btn-doodle">
                <span>{t.tentang.ctaConsult}</span>
                <svg className="art-card__btn-arrow" width="22" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M 2 7 Q 10 3, 18 7 M 15 2 L 21 7 L 15 12" />
                </svg>
              </NavLink>
              <NavLink to="/layanan" className="art-card__btn-doodle">
                <span>{lang === 'en' ? 'View Services' : 'Lihat Layanan'}</span>
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
