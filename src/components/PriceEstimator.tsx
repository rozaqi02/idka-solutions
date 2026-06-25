import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './PriceEstimator.css'

type Step = {
  key: string
  label: string
  options: { label: string; value: number; desc?: string }[]
}

const steps: Step[] = [
  {
    key: 'type',
    label: 'Jenis Website',
    options: [
      { label: 'Landing Page', value: 800000, desc: '1 halaman fokus konversi' },
      { label: 'Company Profile', value: 1500000, desc: '3-5 halaman profil bisnis' },
      { label: 'Toko Online Sederhana', value: 2000000, desc: 'Katalog + tombol order' },
      { label: 'Website Portofolio', value: 1200000, desc: 'Galeri karya profesional' },
      { label: 'Website Jasa', value: 1800000, desc: 'Layanan + form booking' },
      { label: 'Full Custom', value: 3500000, desc: 'Sesuai kebutuhan spesifik' },
    ],
  },
  {
    key: 'pages',
    label: 'Jumlah Halaman',
    options: [
      { label: '1 halaman', value: 0 },
      { label: '2-3 halaman', value: 300000 },
      { label: '4-5 halaman', value: 600000 },
      { label: '6-8 halaman', value: 1000000 },
      { label: '8+ halaman', value: 1800000 },
    ],
  },
  {
    key: 'features',
    label: 'Fitur Tambahan',
    options: [
      { label: 'Tombol WhatsApp', value: 0, desc: 'Sudah termasuk default' },
      { label: 'Form Kontak', value: 100000 },
      { label: 'Galeri / Slider', value: 150000 },
      { label: 'Blog / Artikel', value: 300000 },
      { label: 'CMS (bisa edit sendiri)', value: 500000 },
      { label: 'Integrasi Maps', value: 150000 },
      { label: 'Animasi Interaktif', value: 400000 },
    ],
  },
  {
    key: 'deadline',
    label: 'Deadline Pengerjaan',
    options: [
      { label: 'Santai (2-3 minggu)', value: 0 },
      { label: 'Normal (1-2 minggu)', value: 200000 },
      { label: 'Cepat (3-7 hari)', value: 500000 },
      { label: 'Urgent (1-2 hari)', value: 1000000 },
    ],
  },
]

function formatRp(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID')
}

export default function PriceEstimator() {
  const [selections, setSelections] = useState<Record<string, number>>({})
  const [multiFeatures, setMultiFeatures] = useState<number[]>([])

  const reset = () => {
    setSelections({})
    setMultiFeatures([])
  }

  const select = (key: string, value: number) => {
    if (key === 'features') return
    setSelections((prev) => ({ ...prev, [key]: value }))
  }

  const toggleFeature = (value: number) => {
    setMultiFeatures((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  const base = selections['type'] ?? 0
  const pages = selections['pages'] ?? 0
  const deadline = selections['deadline'] ?? 0
  const features = multiFeatures.reduce((a, b) => a + b, 0)

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
          <p className="estimator__subtitle">Dapatkan perkiraan harga instan. Harga final ditentukan saat konsultasi.</p>
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
              {step.options.map((opt) => {
                const isSelected =
                  step.key === 'features'
                    ? multiFeatures.includes(opt.value)
                    : selections[step.key] === opt.value

                return (
                  <button
                    key={opt.label}
                    type="button"
                    className={`estimator__option${isSelected ? ' estimator__option--selected' : ''}`}
                    onClick={() =>
                      step.key === 'features' ? toggleFeature(opt.value) : select(step.key, opt.value)
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
                  Pilih jenis &amp; jumlah halaman dulu
                </span>
              )}
            </div>
            <p className="estimator__result-note">
              Harga final ditentukan setelah konsultasi &amp; brief proyek lengkap.
            </p>
          </div>
          <NavLink to="/kontak" className="btn btn-primary estimator__result-cta">
            Konsultasi &amp; Dapatkan Harga Pasti
          </NavLink>
        </div>
      )}
    </div>
  )
}
