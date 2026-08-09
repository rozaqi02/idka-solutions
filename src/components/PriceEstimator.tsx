import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { company } from '../data/content'
import ContinuousLineArt from './ContinuousLineArt'
import ScribbleUnderline from './ScribbleUnderline'
import HandDrawnBadge from './HandDrawnBadge'
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
  const [activeTab, setActiveTab] = useState<'web' | 'mobile'>('web')
  const [selections, setSelections] = useState<Record<string, number>>({})
  const [selectedFeatures, setSelectedFeatures] = useState<number[]>([])
  const { lang } = useLanguage()

  const isEn = lang === 'en'

  // Reset selections when tab switches
  const handleTabChange = (tab: 'web' | 'mobile') => {
    setActiveTab(tab)
    setSelections({})
    setSelectedFeatures([])
    try {
      localStorage.removeItem('idka_estimator_summary')
    } catch {
      // ignore
    }
  }

  // Web steps
  const webSteps: Step[] = [
    {
      key: 'type',
      label: isEn ? '1 · Website Type' : '1 · Jenis Website',
      options: [
        { label: 'Landing Page', value: 300000, desc: isEn ? '1 high-conversion page' : '1 halaman fokus konversi' },
        { label: 'Company Profile', value: 900000, desc: isEn ? '3-5 business profile pages' : '3-5 halaman profil bisnis' },
        { label: isEn ? 'Simple Online Store' : 'Toko Online Sederhana', value: 1200000, desc: isEn ? 'Catalog & WhatsApp order' : 'Katalog & tombol order' },
        { label: isEn ? 'Full Custom Web System' : 'Full Custom Web', value: 1700000, desc: isEn ? 'Custom web app & features' : 'Sistem & fitur web kustom' },
      ],
    },
    {
      key: 'pages',
      label: isEn ? '2 · Page Count' : '2 · Jumlah Halaman',
      options: [
        { label: isEn ? '1 Page' : '1 Halaman', value: 0 },
        { label: isEn ? '2–4 Pages' : '2–4 Halaman', value: 100000 },
        { label: isEn ? '5–8 Pages' : '5–8 Halaman', value: 250000 },
        { label: isEn ? '8+ Pages' : '8+ Halaman', value: 450000 },
      ],
    },
    {
      key: 'features',
      label: isEn ? '3 · Additional Features' : '3 · Fitur Tambahan (Bisa Pilih Lebih dari 1)',
      options: [
        { label: isEn ? 'Direct WhatsApp Button' : 'Tombol WhatsApp Direct', value: 0, desc: isEn ? 'Included' : 'Sudah termasuk' },
        { label: isEn ? 'Contact & Email Form' : 'Form Kontak & Email', value: 50000 },
        { label: isEn ? 'Photo Gallery / Slider' : 'Galeri / Slider Foto', value: 75000 },
        { label: isEn ? 'Blog / Articles' : 'Blog / Artikel', value: 150000 },
        { label: isEn ? 'CMS (Self Editable)' : 'CMS (Kelola Konten Mandiri)', value: 250000 },
        { label: isEn ? 'Google Maps Integration' : 'Integrasi Google Maps', value: 75000 },
      ],
    },
  ]

  // Mobile App steps
  const mobileSteps: Step[] = [
    {
      key: 'type',
      label: isEn ? '1 · Mobile App Type' : '1 · Jenis Aplikasi Mobile',
      options: [
        { label: isEn ? 'Catalog / Business App' : 'App Katalog / Profil Bisnis', value: 1599000, desc: isEn ? 'Cross-platform Android & iOS' : 'Android & iOS Flutter' },
        { label: isEn ? 'POS / Cashier Mobile App' : 'App Kasir / POS Mobile', value: 2499000, desc: isEn ? 'Sales, inventory & reports' : 'Transaksi, stok & laporan' },
        { label: isEn ? 'Custom Startup / MVP' : 'Custom Startup / MVP App', value: 3999000, desc: isEn ? 'Complex workflow & API' : 'Sistem & API backend kustom' },
      ],
    },
    {
      key: 'features',
      label: isEn ? '2 · Mobile Features' : '2 · Fitur Utama Aplikasi',
      options: [
        { label: isEn ? 'Android & iOS Support' : 'Support Android & iOS', value: 0, desc: isEn ? 'Included' : 'Sudah termasuk' },
        { label: isEn ? 'Push Notifications' : 'Push Notification System', value: 200000 },
        { label: isEn ? 'Web Admin Dashboard' : 'Web Admin Dashboard', value: 500000 },
        { label: isEn ? 'Payment Link / Gateway' : 'Payment Link / Gateway', value: 350000 },
        { label: isEn ? 'Camera & Scanner/OCR' : 'Kamera / Barcode Scanner', value: 300000 },
      ],
    },
    {
      key: 'timeline',
      label: isEn ? '3 · Target Timeline' : '3 · Target Timeline',
      options: [
        { label: isEn ? 'Standard (3–4 weeks)' : 'Standar (3–4 minggu)', value: 0 },
        { label: isEn ? 'Express (2 weeks)' : 'Express (2 minggu)', value: 300000 },
      ],
    },
  ]

  const currentSteps = activeTab === 'web' ? webSteps : mobileSteps

  const reset = () => {
    setSelections({})
    setSelectedFeatures([])
    try {
      localStorage.removeItem('idka_estimator_summary')
    } catch {
      // ignore
    }
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
  const step2Val = selections[activeTab === 'web' ? 'pages' : 'timeline'] ?? 0
  const featureSum = selectedFeatures.reduce(
    (acc, idx) => acc + (currentSteps[activeTab === 'web' ? 2 : 1].options[idx]?.value || 0),
    0
  )

  const total = base + step2Val + featureSum
  const low = Math.floor(total * 0.95)
  const high = Math.ceil(total * 1.15)

  const hasSelections = Object.keys(selections).length > 0 || selectedFeatures.length > 0
  const isComplete = selections['type'] !== undefined

  // Derive selection labels
  const selectedTypeObj = currentSteps[0].options.find((o) => o.value === selections['type'])
  const selectedStep2Obj = currentSteps[activeTab === 'web' ? 1 : 2].options.find((o) => o.value === step2Val)
  const selectedFeatureNames = selectedFeatures.map((i) => currentSteps[activeTab === 'web' ? 2 : 1].options[i]?.label).filter(Boolean)

  const typeLabel = selectedTypeObj?.label || ''
  const subLabel = selectedStep2Obj?.label || (activeTab === 'web' ? '1 Halaman' : 'Standar')
  const priceRangeStr = `${formatPrice(low, lang)} – ${formatPrice(high, lang)}`

  // Auto save summary to localStorage when isComplete
  useEffect(() => {
    if (isComplete) {
      try {
        const payload = {
          mode: activeTab,
          type: typeLabel,
          pages: activeTab === 'web' ? subLabel : undefined,
          deadline: activeTab === 'mobile' ? subLabel : undefined,
          features: selectedFeatureNames,
          priceRange: priceRangeStr,
          low,
          high,
          timestamp: Date.now(),
        }
        localStorage.setItem('idka_estimator_summary', JSON.stringify(payload))
      } catch {
        // ignore
      }
    }
  }, [isComplete, activeTab, typeLabel, subLabel, selectedFeatureNames.length, low, high, lang])

  const waText = encodeURIComponent(
    isEn
      ? `Hello IDKA Solutions! I used the ${activeTab === 'web' ? 'Website' : 'Mobile App'} Estimator on your site:\n\n• Service: ${typeLabel}\n• Scope: ${subLabel}\n• Features: ${selectedFeatureNames.join(', ') || 'Standard'}\n• Estimated Cost: ${priceRangeStr}\n\nI would like to consult further on final pricing.`
      : `Halo IDKA Solutions! Saya sudah mencoba Estimator ${activeTab === 'web' ? 'Website' : 'Aplikasi Mobile'} di website:\n\n• Layanan: ${typeLabel}\n• Skala: ${subLabel}\n• Fitur: ${selectedFeatureNames.join(', ') || 'Standar'}\n• Perkiraan Biaya: ${priceRangeStr}\n\nSaya ingin konsultasi lebih lanjut mengenai detail proyek ini.`
  )
  const waUrl = `https://wa.me/${company.whatsapp}?text=${waText}`

  return (
    <div className="estimator-container">
      <div className="estimator-card">
        {/* Header */}
        <div className="estimator-header">
          <div className="estimator-header__text">
            <HandDrawnBadge
              text={isEn ? 'Instant Calculator' : 'Kalkulator Instan'}
              popular
              shape="cloud"
            />
            <h3 className="estimator-title artistic-title" style={{ marginTop: '0.6rem' }}>
              {isEn ? 'Calculate Estimated Project Cost' : 'Hitung Perkiraan Biaya Proyek'}
              <ScribbleUnderline variant="zigzag" />
            </h3>
          </div>
          <div className="estimator-header__illustration" aria-hidden="true">
            <ContinuousLineArt type={activeTab === 'web' ? 'cpu' : 'smartphone'} />
          </div>
          {hasSelections && (
            <button type="button" className="estimator-reset-btn art-card__tag-doodle" onClick={reset}>
              {isEn ? 'Reset Options' : 'Reset Pilihan'}
            </button>
          )}
        </div>

        {/* Tab Selector */}
        <div className="estimator-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'web'}
            className={`estimator-tab ${activeTab === 'web' ? 'estimator-tab--active' : ''}`}
            onClick={() => handleTabChange('web')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            {isEn ? 'Website Project' : 'Estimasi Website'}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'mobile'}
            className={`estimator-tab ${activeTab === 'mobile' ? 'estimator-tab--active' : ''}`}
            onClick={() => handleTabChange('mobile')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="5" y="2" width="14" height="20" rx="3" ry="3" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
            {isEn ? 'Mobile App Project' : 'Estimasi Aplikasi Mobile'}
          </button>
        </div>

        {/* Steps */}
        <div className="estimator-steps">
          {currentSteps.map((step, sIdx) => {
            const isFeatureStep = (activeTab === 'web' && sIdx === 2) || (activeTab === 'mobile' && sIdx === 1)

            return (
              <div key={step.key} className="estimator-step">
                <div className="estimator-step-label">{step.label}</div>
                <div className="estimator-options-grid">
                  {step.options.map((opt, optIdx) => {
                    const isSelected = isFeatureStep
                      ? selectedFeatures.includes(optIdx)
                      : selections[step.key] === opt.value

                    return (
                      <button
                        key={opt.label}
                        type="button"
                        className={`estimator-opt-btn${isSelected ? ' estimator-opt-btn--selected' : ''}`}
                        onClick={() =>
                          isFeatureStep
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
            )
          })}
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
                  ? 'Select service type above to calculate estimate'
                  : 'Pilih jenis layanan di atas untuk melihat estimasi'}
              </div>
            )}
            <span className="estimator-result-note">
              {isEn
                ? '✓ Includes Security & Launch Setup. *Final price confirmed during consultation.'
                : '✓ Sudah termasuk Keamanan & Setup Peluncuran. *Harga final dikonfirmasi saat konsultasi.'}
            </span>
          </div>

          <div className="estimator-cta-group">
            {isComplete ? (
              <>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apple-pill-btn apple-pill-btn--primary estimator-cta-btn estimator-cta-btn--wa"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  <span>{isEn ? 'Chat WA with Summary' : 'Chat WA Hasil Estimasi'}</span>
                </a>
                <NavLink to="/kontak" className="apple-pill-btn apple-pill-btn--secondary estimator-cta-btn">
                  {isEn ? 'Fill Brief Form →' : 'Isi Form Brief →'}
                </NavLink>
              </>
            ) : (
              <NavLink to="/kontak" className="apple-pill-btn apple-pill-btn--primary estimator-cta-btn">
                {isEn ? 'Consult Final Pricing →' : 'Konsultasi Harga Final →'}
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
