import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import './PriceEstimator.css'

type Option = {
  label: string
  value: number
  desc?: string
}

type Step = {
  key: string
  label: string
  options: Option[]
}

function formatPrice(n: number, lang: string) {
  return 'Rp ' + n.toLocaleString(lang === 'en' ? 'en-US' : 'id-ID')
}

export default function PriceEstimator() {
  const [selections, setSelections] = useState<Record<string, number>>({})
  const [selectedFeatures, setSelectedFeatures] = useState<number[]>([])
  const { lang } = useLanguage()

  const isEn = lang === 'en'

  const steps: Step[] = [
    {
      key: 'type',
      label: isEn ? '1 · Website Type' : '1 · Jenis Website',
      options: [
        { label: 'Landing Page', value: 300000, desc: isEn ? '1 high-conversion page' : '1 halaman fokus konversi' },
        { label: 'Company Profile', value: 900000, desc: isEn ? '3-5 business profile pages' : '3-5 halaman profil bisnis' },
        { label: isEn ? 'Portfolio Website' : 'Website Portofolio', value: 400000, desc: isEn ? 'Professional showcase gallery' : 'Galeri karya profesional' },
        { label: isEn ? 'Service Website' : 'Website Jasa', value: 1000000, desc: isEn ? 'Services & booking form' : 'Layanan & form booking' },
        { label: isEn ? 'Simple Online Store' : 'Toko Online Sederhana', value: 1200000, desc: isEn ? 'Catalog & WhatsApp order' : 'Katalog & tombol order' },
        { label: isEn ? 'Full Custom System' : 'Full Custom', value: 1700000, desc: isEn ? 'Custom web app & features' : 'Sistem & fitur kustom' },
      ],
    },
    {
      key: 'pages',
      label: isEn ? '2 · Number of Pages' : '2 · Jumlah Halaman',
      options: [
        { label: isEn ? '1 Page' : '1 Halaman', value: 0 },
        { label: isEn ? '2–3 Pages' : '2–3 Halaman', value: 100000 },
        { label: isEn ? '4–5 Pages' : '4–5 Halaman', value: 200000 },
        { label: isEn ? '6–8 Pages' : '6–8 Halaman', value: 350000 },
        { label: isEn ? '8+ Pages' : '8+ Halaman', value: 600000 },
      ],
    },
    {
      key: 'features',
      label: isEn ? '3 · Additional Features (Select Multiple)' : '3 · Fitur Tambahan (Pilih Lebih dari Satu)',
      options: [
        { label: isEn ? 'Direct WhatsApp Button' : 'Tombol WhatsApp Direct', value: 0, desc: isEn ? 'Included' : 'Sudah termasuk' },
        { label: isEn ? 'Contact & Email Form' : 'Form Kontak & Email', value: 50000 },
        { label: isEn ? 'Photo Gallery / Slider' : 'Galeri / Slider Foto', value: 75000 },
        { label: isEn ? 'Blog / Articles' : 'Blog / Artikel', value: 150000 },
        { label: isEn ? 'CMS (Self Editable)' : 'CMS (Bisa Edit Sendiri)', value: 250000 },
        { label: isEn ? 'Google Maps Integration' : 'Integrasi Google Maps', value: 75000 },
        { label: isEn ? 'Animations & Interactivity' : 'Animasi & Interaktif', value: 200000 },
      ],
    },
    {
      key: 'deadline',
      label: isEn ? '4 · Target Timeline' : '4 · Target Timeline',
      options: [
        { label: isEn ? 'Flexible (2–3 weeks)' : 'Fleksibel (2–3 minggu)', value: 0 },
        { label: isEn ? 'Standard (1–2 weeks)' : 'Standar (1–2 minggu)', value: 75000 },
        { label: isEn ? 'Priority (3–7 days)' : 'Prioritas (3–7 hari)', value: 200000 },
        { label: isEn ? 'Urgent (1–2 days)' : 'Mendesak (1–2 hari)', value: 400000 },
      ],
    },
  ]

  const reset = () => {
    setSelections({})
    setSelectedFeatures([])
  }

  const selectSingle = (key: string, value: number) => {
    setSelections((prev) => ({ ...prev, [key]: value }))
  }

  const toggleFeature = (optIdx: number) => {
    setSelectedFeatures((prev) =>
      prev.includes(optIdx) ? prev.filter((i) => i !== optIdx) : [...prev, optIdx]
    )
  }

  const base = selections['type'] ?? 0
  const pages = selections['pages'] ?? 0
  const deadline = selections['deadline'] ?? 0
  const featureSum = selectedFeatures.reduce(
    (acc, idx) => acc + (steps[2].options[idx]?.value || 0),
    0
  )

  const total = base + pages + deadline + featureSum
  const low = Math.floor(total * 0.95)
  const high = Math.ceil(total * 1.15)

  const hasSelections = Object.keys(selections).length > 0 || selectedFeatures.length > 0
  const isComplete = selections['type'] !== undefined

  return (
    <div className="estimator-container">
      <div className="estimator-card">
        {/* Header */}
        <div className="estimator-header">
          <div className="estimator-header__text">
            <span className="estimator-badge">{isEn ? 'Instant Cost Estimator' : 'Estimator Harga Instan'}</span>
            <h3 className="estimator-title">{isEn ? 'Calculate Estimated Website Cost' : 'Hitung Perkiraan Biaya Website'}</h3>
            <p className="estimator-subtitle">
              {isEn
                ? 'Select your requirements below for transparent cost calculation.'
                : 'Pilih kebutuhan Anda di bawah untuk mendapatkan estimasi transparan.'}
            </p>
          </div>
          {hasSelections && (
            <button type="button" className="estimator-reset-btn" onClick={reset}>
              {isEn ? 'Reset Options' : 'Reset Pilihan'}
            </button>
          )}
        </div>

        {/* Steps */}
        <div className="estimator-steps">
          {steps.map((step) => (
            <div key={step.key} className="estimator-step">
              <div className="estimator-step-label">{step.label}</div>
              <div className="estimator-options-grid">
                {step.options.map((opt, optIdx) => {
                  const isSelected =
                    step.key === 'features'
                      ? selectedFeatures.includes(optIdx)
                      : selections[step.key] === opt.value

                  return (
                    <button
                      key={opt.label}
                      type="button"
                      className={`estimator-opt-btn${isSelected ? ' estimator-opt-btn--selected' : ''}`}
                      onClick={() =>
                        step.key === 'features'
                          ? toggleFeature(optIdx)
                          : selectSingle(step.key, opt.value)
                      }
                      aria-pressed={isSelected}
                    >
                      <div className="estimator-opt-top">
                        <span className="estimator-opt-title">{opt.label}</span>
                        {isSelected && <span className="estimator-opt-check">✓</span>}
                      </div>
                      {opt.desc && <span className="estimator-opt-desc">{opt.desc}</span>}
                      <span className="estimator-opt-price">
                        {opt.value > 0 ? `+${formatPrice(opt.value, lang)}` : (isEn ? 'Included' : 'Termasuk')}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Live Result Footer */}
        <div className="estimator-result-bar">
          <div className="estimator-result-info">
            <span className="estimator-result-label">{isEn ? 'Estimated Total Cost' : 'Perkiraan Total Biaya'}</span>
            {isComplete ? (
              <div className="estimator-result-price">
                {formatPrice(low, lang)} &ndash; {formatPrice(high, lang)}
              </div>
            ) : (
              <div className="estimator-result-placeholder">
                {isEn
                  ? 'Select website type above to calculate estimate'
                  : 'Pilih jenis website di atas untuk melihat estimasi'}
              </div>
            )}
            <span className="estimator-result-note">
              {isEn
                ? '*Final price confirmed during free brief & consultation.'
                : '*Harga final dikonfirmasi saat brief & konsultasi gratis.'}
            </span>
          </div>

          <NavLink to="/kontak" className="apple-pill-btn apple-pill-btn--primary estimator-cta-btn">
            {isEn ? 'Consult Final Pricing →' : 'Konsultasi Harga Final →'}
          </NavLink>
        </div>
      </div>
    </div>
  )
}
