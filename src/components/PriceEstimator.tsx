import { useState } from 'react'
import { NavLink } from 'react-router-dom'
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

const steps: Step[] = [
  {
    key: 'type',
    label: '1 · Jenis Website',
    options: [
      { label: 'Landing Page', value: 300000, desc: '1 halaman fokus konversi' },
      { label: 'Company Profile', value: 900000, desc: '3-5 halaman profil bisnis' },
      { label: 'Website Portofolio', value: 400000, desc: 'Galeri karya profesional' },
      { label: 'Website Jasa', value: 1000000, desc: 'Layanan & form booking' },
      { label: 'Toko Online Sederhana', value: 1200000, desc: 'Katalog & tombol order' },
      { label: 'Full Custom', value: 1700000, desc: 'Sistem & fitur kustom' },
    ],
  },
  {
    key: 'pages',
    label: '2 · Jumlah Halaman',
    options: [
      { label: '1 Halaman', value: 0 },
      { label: '2–3 Halaman', value: 100000 },
      { label: '4–5 Halaman', value: 200000 },
      { label: '6–8 Halaman', value: 350000 },
      { label: '8+ Halaman', value: 600000 },
    ],
  },
  {
    key: 'features',
    label: '3 · Fitur Tambahan (Pilih Lebih dari Satu)',
    options: [
      { label: 'Tombol WhatsApp Direct', value: 0, desc: 'Sudah termasuk' },
      { label: 'Form Kontak & Email', value: 50000 },
      { label: 'Galeri / Slider Foto', value: 75000 },
      { label: 'Blog / Artikel', value: 150000 },
      { label: 'CMS (Bisa Edit Sendiri)', value: 250000 },
      { label: 'Integrasi Google Maps', value: 75000 },
      { label: 'Animasi & Interaktif', value: 200000 },
    ],
  },
  {
    key: 'deadline',
    label: '4 · Target Timeline',
    options: [
      { label: 'Fleksibel (2–3 minggu)', value: 0 },
      { label: 'Standar (1–2 minggu)', value: 75000 },
      { label: 'Prioritas (3–7 hari)', value: 200000 },
      { label: 'Mendesak (1–2 hari)', value: 400000 },
    ],
  },
]

function formatRp(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID')
}

export default function PriceEstimator() {
  const [selections, setSelections] = useState<Record<string, number>>({})
  const [selectedFeatures, setSelectedFeatures] = useState<number[]>([])

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
            <span className="estimator-badge">Estimator Harga Instan</span>
            <h3 className="estimator-title">Hitung Perkiraan Biaya Website</h3>
            <p className="estimator-subtitle">
              Pilih kebutuhan Anda di bawah untuk mendapatkan estimasi transparan.
            </p>
          </div>
          {hasSelections && (
            <button type="button" className="estimator-reset-btn" onClick={reset}>
              Reset Pilihan
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
                        {opt.value > 0 ? `+${formatRp(opt.value)}` : 'Termasuk'}
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
            <span className="estimator-result-label">Perkiraan Total Biaya</span>
            {isComplete ? (
              <div className="estimator-result-price">
                {formatRp(low)} &ndash; {formatRp(high)}
              </div>
            ) : (
              <div className="estimator-result-placeholder">
                Pilih jenis website di atas untuk melihat estimasi
              </div>
            )}
            <span className="estimator-result-note">
              *Harga final dikonfirmasi saat brief &amp; konsultasi gratis.
            </span>
          </div>

          <NavLink to="/kontak" className="apple-pill-btn apple-pill-btn--primary estimator-cta-btn">
            Konsultasi Harga Final →
          </NavLink>
        </div>
      </div>
    </div>
  )
}
