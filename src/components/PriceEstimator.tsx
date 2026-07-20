import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './PriceEstimator.css'

type Step = {
  key: string
  label: string
  options: { label: string; value: number; desc?: string }[]
}

// Harga selaras paket: Starter 300rb · Business 900rb · Premium 1,7jt
const steps: Step[] = [
  {
    key: 'type',
    label: 'Jenis Website',
    options: [
      { label: 'Landing Page', value: 300000, desc: '1 halaman fokus konversi (Starter)' },
      { label: 'Company Profile', value: 900000, desc: '3-5 halaman profil bisnis (Business)' },
      { label: 'Website Portofolio', value: 400000, desc: 'Galeri karya profesional' },
      { label: 'Website Jasa', value: 1000000, desc: 'Layanan + form booking' },
      { label: 'Toko Online Sederhana', value: 1200000, desc: 'Katalog + tombol order' },
      { label: 'Full Custom', value: 1700000, desc: 'Sesuai kebutuhan (Premium)' },
    ],
  },
  {
    key: 'pages',
    label: 'Jumlah Halaman',
    options: [
      { label: '1 halaman', value: 0 },
      { label: '2-3 halaman', value: 100000 },
      { label: '4-5 halaman', value: 200000 },
      { label: '6-8 halaman', value: 350000 },
      { label: '8+ halaman', value: 600000 },
    ],
  },
  {
    key: 'features',
    label: 'Fitur Tambahan',
    options: [
      { label: 'Tombol WhatsApp', value: 0, desc: 'Sudah termasuk' },
      { label: 'Form Kontak', value: 50000 },
      { label: 'Galeri / Slider', value: 75000 },
      { label: 'Blog / Artikel', value: 150000 },
      { label: 'CMS (bisa edit sendiri)', value: 250000 },
      { label: 'Integrasi Maps', value: 75000 },
      { label: 'Animasi Interaktif', value: 200000 },
    ],
  },
  {
    key: 'deadline',
    label: 'Deadline Pengerjaan',
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

// Track fitur by index agar aman walau ada value duplikat (e.g. value: 0)
type FeatureSelection = { stepIdx: number; optIdx: number; value: number }

export default function PriceEstimator() {
  const [selections, setSelections] = useState<Record<string, number>>({})
  const [multiFeatures, setMultiFeatures] = useState<FeatureSelection[]>([])

  const reset = () => {
    setSelections({})
    setMultiFeatures([])
  }

  const select = (key: string, value: number) => {
    if (key === 'features') return
    setSelections((prev) => ({ ...prev, [key]: value }))
  }

  const toggleFeature = (stepIdx: number, optIdx: number, value: number) => {
    setMultiFeatures((prev) => {
      const exists = prev.some((f) => f.stepIdx === stepIdx && f.optIdx === optIdx)
      return exists
        ? prev.filter((f) => !(f.stepIdx === stepIdx && f.optIdx === optIdx))
        : [...prev, { stepIdx, optIdx, value }]
    })
  }

  const isFeatureSelected = (stepIdx: number, optIdx: number) =>
    multiFeatures.some((f) => f.stepIdx === stepIdx && f.optIdx === optIdx)

  const base = selections['type'] ?? 0
  const pages = selections['pages'] ?? 0
  const deadline = selections['deadline'] ?? 0
  const features = multiFeatures.reduce((a, f) => a + f.value, 0)

  const total = base + pages + deadline + features
  const low = Math.floor(total * 0.9)
  const high = Math.ceil(total * 1.2)

  const isComplete = selections['type'] !== undefined && selections['pages'] !== undefined

  const hasAnySelection = Object.keys(selections).length > 0 || multiFeatures.length > 0

  return (
    <div className="estimator neu-raised">
      <div className="estimator__header">
        <div className="estimator__icon" aria-hidden="true">&#128176;</div>
        <div className="estimator__header-text">
          <h3 className="estimator__title">Estimator Harga</h3>
          <p className="estimator__subtitle">Perkiraan harga instan. Harga final dikonfirmasi saat konsultasi.</p>
        </div>
        {hasAnySelection && (
          <button
            type="button"
            className="estimator__reset"
            onClick={reset}
            aria-label="Reset estimator"
          >
            Reset
          </button>
        )}
      </div>

      <div className="estimator__steps">
        {steps.map((step) => (
          <div key={step.key} className="estimator__step">
            <div className="estimator__step-label">{step.label}</div>
            <div className="estimator__options">
              {step.options.map((opt, optIdx) => {
                const stepIdx = steps.findIndex((s) => s.key === step.key)
                const isSelected =
                  step.key === 'features'
                    ? isFeatureSelected(stepIdx, optIdx)
                    : selections[step.key] === opt.value

                return (
                  <button
                    key={opt.label}
                    type="button"
                    className={`estimator__option${isSelected ? ' estimator__option--selected' : ''}`}
                    onClick={() =>
                      step.key === 'features'
                        ? toggleFeature(stepIdx, optIdx, opt.value)
                        : select(step.key, opt.value)
                    }
                    aria-pressed={isSelected}
                  >
                    <span className="estimator__option-label">{opt.label}</span>
                    {opt.desc && <span className="estimator__option-desc">{opt.desc}</span>}
                    {opt.value > 0 && (
                      <span className="estimator__option-price">+{formatRp(opt.value)}</span>
                    )}
                    {opt.value === 0 && step.key !== 'features' && (
                      <span className="estimator__option-price estimator__option-price--base">Termasuk</span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {total > 0 && (
        <div className="estimator__result-wrap">
          <div className="estimator__result neu-inset">
            <div className="estimator__result-label">Estimasi Harga</div>
            <div className="estimator__result-range">
              {isComplete ? (
                <span className="estimator__result-value gradient-text">
                  {formatRp(low)} &ndash; {formatRp(high)}
                </span>
              ) : (
                <span className="estimator__result-incomplete">
                  Pilih jenis website dan jumlah halaman
                </span>
              )}
            </div>
            <p className="estimator__result-note">
              Harga final ditentukan setelah konsultasi dan brief proyek.
            </p>
          </div>
          <NavLink to="/kontak" className="btn btn-primary estimator__result-cta">
            Konsultasi untuk Harga Final
          </NavLink>
        </div>
      )}
    </div>
  )
}
