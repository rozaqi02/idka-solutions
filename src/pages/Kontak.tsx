import { useState } from 'react'
import type { FormEvent } from 'react'
import { company } from '../data/content'
import type { ToastType } from '../hooks/useToast'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useHeroEnter } from '../hooks/useHeroEnter'
import { usePageTitle } from '../hooks/usePageTitle'
import './Kontak.css'

type FormData = {
  nama: string
  email: string
  whatsapp: string
  bisnis: string
  jenis_usaha: string
  tujuan_website: string
  jenis_website: string
  halaman: string
  fitur: string
  punya_domain: string
  deadline: string
  budget: string
  pesan: string
}

const initialForm: FormData = {
  nama: '',
  email: '',
  whatsapp: '',
  bisnis: '',
  jenis_usaha: '',
  tujuan_website: '',
  jenis_website: '',
  halaman: '',
  fitur: '',
  punya_domain: '',
  deadline: '',
  budget: '',
  pesan: '',
}

const jenisWebsiteOptions = [
  'Landing Page',
  'Company Profile',
  'Website Toko Sederhana',
  'Website Portofolio',
  'Website Jasa Profesional',
  'Website Katalog Produk',
  'Website Personal Brand',
  'Website Event',
  'Lainnya',
]

const budgetOptions = [
  'Di bawah Rp 500 ribu',
  'Rp 500 ribu - 1 juta',
  'Rp 1 - 2 juta',
  'Rp 2 - 5 juta',
  'Di atas Rp 5 juta',
  'Belum tahu / ingin konsultasi',
]

type KontakProps = {
  addToast?: (message: string, type?: ToastType) => void
}

const FORM_STEPS = [
  { id: 1, label: 'Data diri' },
  { id: 2, label: 'Detail web' },
  { id: 3, label: 'Timeline' },
] as const

function getFormProgress(form: FormData) {
  const step1Done = Boolean(form.nama.trim() && form.bisnis.trim())
  const step2Done = Boolean(form.tujuan_website.trim())
  const step3Done = Boolean(
    form.budget || form.deadline.trim() || form.pesan.trim() || form.punya_domain,
  )
  const doneCount = [step1Done, step2Done, step3Done].filter(Boolean).length
  const current = !step1Done ? 1 : !step2Done ? 2 : 3
  return { step1Done, step2Done, step3Done, doneCount, current }
}

export default function Kontak({ addToast }: KontakProps) {
  const [form, setForm] = useState<FormData>(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [waFallbackUrl, setWaFallbackUrl] = useState<string | null>(null)
  useScrollReveal()
  useHeroEnter()
  usePageTitle({
    title: 'Kontak',
    description:
      'Konsultasi gratis dengan IDKA Solutions. Sampaikan kebutuhan website bisnis Anda — kami balas dalam 1–3 jam kerja.',
    path: '/kontak',
  })

  const progress = getFormProgress(form)
  const waSkipUrl = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
    'Halo IDKA Solutions, saya ingin konsultasi website terlebih dahulu (chat langsung, formulir kemudian).',
  )}`

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Hapus error saat user mulai mengisi
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validate = (): Partial<Record<keyof FormData, string>> => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}
    if (!form.nama.trim()) newErrors.nama = 'Nama wajib diisi'
    if (!form.bisnis.trim()) newErrors.bisnis = 'Nama bisnis wajib diisi'
    if (!form.tujuan_website.trim()) newErrors.tujuan_website = 'Tujuan website wajib diisi'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Format email tidak valid'
    }
    setErrors(newErrors)
    return newErrors
  }

  const scrollToFirstError = (errs: Partial<Record<keyof FormData, string>>) => {
    const order: (keyof FormData)[] = ['nama', 'bisnis', 'email', 'tujuan_website']
    const first = order.find((key) => errs[key])
    if (!first) return
    window.requestAnimationFrame(() => {
      const el = document.getElementById(first)
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el?.focus({ preventScroll: true })
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      addToast?.('Lengkapi field wajib terlebih dahulu.', 'error')
      scrollToFirstError(errs)
      return
    }

    setLoading(true)

    // Submit ke Netlify Forms via fetch (background, no redirect)
    const formEl = e.target as HTMLFormElement
    try {
      const formData = new FormData(formEl)
      const params = new URLSearchParams()
      params.set('form-name', 'brief-klien')
      formData.forEach((value, key) => {
        if (typeof value === 'string') params.append(key, value)
      })

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      })
      if (!response.ok) {
        console.warn('[Kontak] Netlify Forms response:', response.status)
      }
    } catch (err) {
      console.warn('[Kontak] Netlify Forms submit gagal, lanjut via WhatsApp', err)
    }

    // Build WhatsApp message (primary conversion path)
    const msg = [
      `Halo IDKA Solutions, saya ingin konsultasi website.`,
      ``,
      `*Data Brief:*`,
      `Nama: ${form.nama}`,
      form.email ? `Email: ${form.email}` : '',
      form.whatsapp ? `WhatsApp: ${form.whatsapp}` : '',
      `Bisnis: ${form.bisnis}`,
      `Jenis Usaha: ${form.jenis_usaha}`,
      `Tujuan Website: ${form.tujuan_website}`,
      `Jenis Website: ${form.jenis_website}`,
      `Jumlah Halaman: ${form.halaman}`,
      `Fitur Dibutuhkan: ${form.fitur}`,
      `Sudah Punya Domain/Hosting: ${form.punya_domain}`,
      `Deadline: ${form.deadline}`,
      `Estimasi Budget: ${form.budget}`,
      form.pesan ? `\nPesan Tambahan: ${form.pesan}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    const waUrl = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(msg)}`
    const popup = window.open(waUrl, '_blank', 'noopener,noreferrer')

    setLoading(false)
    setSubmitted(true)

    if (popup) {
      setWaFallbackUrl(null)
      addToast?.('Brief siap. WhatsApp telah dibuka.', 'success')
    } else {
      // Popup blocked — keep user on page with a direct WA link
      setWaFallbackUrl(waUrl)
      addToast?.('Popup diblokir. Gunakan tombol WhatsApp di bawah untuk melanjutkan.', 'info')
    }
  }

  return (
    <div className="kontak-page">
      {/* Header */}
      <section className="page-header section" aria-labelledby="kontak-heading" data-hero-enter="kontak">
        <div className="container">
          <div className="page-header__inner">
            <div className="section-tag hero-in__item hero-in__item--tag">Kontak</div>
            <h1 id="kontak-heading" className="section-title hero-in__item hero-in__item--title">
              Sampaikan Kebutuhan, <span className="gradient-text">Kami Siapkan Solusinya</span>
            </h1>
            <p className="section-subtitle hero-in__item hero-in__item--sub">
              Isi formulir di bawah. Informasi tidak harus lengkap—kami bantu melengkapinya.
            </p>
            <div className="kontak-response-badges hero-in__item hero-in__item--extra">
              <span className="kontak-badge">⚡ Balas dalam 1–3 jam kerja</span>
              <span className="kontak-badge">🎁 Konsultasi pertama gratis</span>
              <span className="kontak-badge">📋 Tanpa komitmen</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section kontak-section">
        <div className="container">
          <div className="kontak-grid">
            {/* Form */}
            <div className="kontak-form-wrap reveal reveal--left">
              {submitted ? (
                <div className="kontak-success neu-raised" role="status" aria-live="polite">
                  <div className="kontak-success__icon" aria-hidden="true">&#10004;</div>
                  <h2 className="kontak-success__title">Brief Siap Dikirim</h2>
                  <p className="kontak-success__desc">
                    {waFallbackUrl
                      ? 'Popup diblokir browser. Klik tombol di bawah untuk membuka WhatsApp dengan detail brief Anda.'
                      : 'WhatsApp telah dibuka dengan detail brief Anda. Kami akan membalas pada jam kerja.'}
                  </p>
                  {waFallbackUrl && (
                    <a
                      href={waFallbackUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-wa"
                      style={{ marginBottom: '0.75rem', width: '100%', maxWidth: 280 }}
                    >
                      Buka WhatsApp
                    </a>
                  )}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ width: '100%', maxWidth: 280 }}
                    onClick={() => {
                      setForm(initialForm)
                      setSubmitted(false)
                      setWaFallbackUrl(null)
                    }}
                  >
                    Kirim Brief Lain
                  </button>
                </div>
              ) : (
                <form
                  className="kontak-form neu-raised"
                  onSubmit={handleSubmit}
                  aria-label="Form brief proyek"
                  name="brief-klien"
                  method="POST"
                  data-netlify="true"
                  noValidate
                >
                  <input type="hidden" name="form-name" value="brief-klien" />
                  {/* Honeypot — must stay empty; bots that fill it are ignored by Netlify */}
                  <p className="sr-only" aria-hidden="true">
                    <label>
                      Jangan isi field ini
                      <input name="bot-field" tabIndex={-1} autoComplete="off" />
                    </label>
                  </p>
                  <div className="kontak-form__head">
                    <div>
                      <h2 className="kontak-form__title">Detail Kebutuhan Proyek</h2>
                      <p className="kontak-form__subtitle">
                        Semakin lengkap informasinya, semakin akurat estimasi dan rekomendasi kami.
                      </p>
                    </div>
                    <a
                      href={waSkipUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="kontak-form__skip"
                    >
                      Chat WhatsApp
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14" />
                        <path d="M13 6l6 6-6 6" />
                      </svg>
                    </a>
                  </div>

                  {/* Progress 1 / 3 */}
                  <div
                    className="kontak-progress"
                    role="group"
                    aria-label={`Progres form: langkah ${progress.current} dari 3`}
                  >
                    <div className="kontak-progress__bar" aria-hidden="true">
                      <span
                        className="kontak-progress__fill"
                        style={{ width: `${(progress.doneCount / 3) * 100}%` }}
                      />
                    </div>
                    <ol className="kontak-progress__steps">
                      {FORM_STEPS.map((step) => {
                        const done =
                          step.id === 1
                            ? progress.step1Done
                            : step.id === 2
                              ? progress.step2Done
                              : progress.step3Done
                        const active = progress.current === step.id
                        return (
                          <li
                            key={step.id}
                            className={`kontak-progress__step${done ? ' kontak-progress__step--done' : ''}${
                              active ? ' kontak-progress__step--active' : ''
                            }`}
                          >
                            <span className="kontak-progress__num" aria-hidden="true">
                              {done ? '✓' : step.id}
                            </span>
                            <span className="kontak-progress__label">{step.label}</span>
                          </li>
                        )
                      })}
                    </ol>
                    <p className="kontak-progress__hint">
                      Langkah {progress.current} dari 3
                      {progress.doneCount > 0 ? ` · ${progress.doneCount} selesai` : ''}
                    </p>
                  </div>

                  <div className="form-section">
                    <div className="form-section__title">1 · Data diri &amp; bisnis</div>
                  <div className="form-grid">
                    {/* Nama */}
                    <div className="form-group">
                      <label htmlFor="nama" className="form-label">
                        Nama <span className="form-required" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="nama"
                        name="nama"
                        type="text"
                        className={`form-input neu-inset${errors.nama ? ' form-input--error' : ''}`}
                        placeholder="Contoh: Rahmat, Sari"
                        value={form.nama}
                        onChange={handleChange}
                        autoComplete="name"
                        enterKeyHint="next"
                        aria-required="true"
                        aria-describedby={errors.nama ? 'nama-error' : undefined}
                      />
                      {errors.nama && <span id="nama-error" className="form-error" role="alert">{errors.nama}</span>}
                    </div>

                    {/* Nama Bisnis */}
                    <div className="form-group">
                      <label htmlFor="bisnis" className="form-label">
                        Nama Bisnis / Brand <span className="form-required" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="bisnis"
                        name="bisnis"
                        type="text"
                        className={`form-input neu-inset${errors.bisnis ? ' form-input--error' : ''}`}
                        placeholder="Contoh: Kedai Kopi Nusantara, Studio Foto"
                        value={form.bisnis}
                        onChange={handleChange}
                        aria-required="true"
                        aria-describedby={errors.bisnis ? 'bisnis-error' : undefined}
                      />
                      {errors.bisnis && <span id="bisnis-error" className="form-error" role="alert">{errors.bisnis}</span>}
                    </div>

                    {/* Email */}
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className={`form-input neu-inset${errors.email ? ' form-input--error' : ''}`}
                        placeholder="Contoh: nama@email.com"
                        value={form.email}
                        onChange={handleChange}
                        autoComplete="email"
                        inputMode="email"
                        enterKeyHint="next"
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && <span id="email-error" className="form-error" role="alert">{errors.email}</span>}
                    </div>

                    {/* WhatsApp */}
                    <div className="form-group">
                      <label htmlFor="whatsapp" className="form-label">
                        Nomor WhatsApp
                      </label>
                      <input
                        id="whatsapp"
                        name="whatsapp"
                        type="tel"
                        className="form-input neu-inset"
                        placeholder="Contoh: 08123456789"
                        value={form.whatsapp}
                        onChange={handleChange}
                        autoComplete="tel"
                        inputMode="tel"
                        enterKeyHint="next"
                      />
                    </div>

                    {/* Jenis Usaha */}
                    <div className="form-group form-group--full">
                      <label htmlFor="jenis_usaha" className="form-label">
                        Jenis Usaha
                      </label>
                      <input
                        id="jenis_usaha"
                        name="jenis_usaha"
                        type="text"
                        className="form-input neu-inset"
                        placeholder="Contoh: Kuliner, Fotografi, Konsultan, Kreator"
                        value={form.jenis_usaha}
                        onChange={handleChange}
                      />
                    </div>

                  </div>
                  </div>

                  <div className="form-section">
                    <div className="form-section__title">2 · Detail website</div>
                  <div className="form-grid">
                    {/* Tujuan Website */}
                    <div className="form-group form-group--full">
                      <label htmlFor="tujuan_website" className="form-label">
                        Tujuan Website <span className="form-required" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="tujuan_website"
                        name="tujuan_website"
                        type="text"
                        className={`form-input neu-inset${errors.tujuan_website ? ' form-input--error' : ''}`}
                        placeholder="Contoh: Menarik pelanggan baru, meningkatkan kredibilitas, penjualan online"
                        value={form.tujuan_website}
                        onChange={handleChange}
                        aria-required="true"
                        aria-describedby={errors.tujuan_website ? 'tujuan-error' : undefined}
                      />
                      {errors.tujuan_website && <span id="tujuan-error" className="form-error" role="alert">{errors.tujuan_website}</span>}
                    </div>

                    {/* Jenis Website */}
                    <div className="form-group">
                      <label htmlFor="jenis_website" className="form-label">Jenis Website</label>
                      <select
                        id="jenis_website"
                        name="jenis_website"
                        className="form-select neu-inset"
                        value={form.jenis_website}
                        onChange={handleChange}
                      >
                        <option value="">Pilih jenis website...</option>
                        {jenisWebsiteOptions.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </div>

                    {/* Jumlah Halaman */}
                    <div className="form-group">
                      <label htmlFor="halaman" className="form-label">Jumlah Halaman</label>
                      <input
                        id="halaman"
                        name="halaman"
                        type="text"
                        className="form-input neu-inset"
                        placeholder="Contoh: 1 halaman, 3-5 halaman"
                        value={form.halaman}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Fitur */}
                    <div className="form-group form-group--full">
                      <label htmlFor="fitur" className="form-label">Fitur yang Dibutuhkan</label>
                      <input
                        id="fitur"
                        name="fitur"
                        type="text"
                        className="form-input neu-inset"
                        placeholder="Contoh: Galeri foto, tombol WA, form kontak, katalog produk"
                        value={form.fitur}
                        onChange={handleChange}
                      />
                    </div>

                  </div>
                  </div>

                  <div className="form-section">
                    <div className="form-section__title">3 · Timeline &amp; budget</div>
                  <div className="form-grid">
                    {/* Domain Hosting */}
                    <div className="form-group">
                      <label htmlFor="punya_domain" className="form-label">Sudah Punya Domain/Hosting?</label>
                      <select
                        id="punya_domain"
                        name="punya_domain"
                        className="form-select neu-inset"
                        value={form.punya_domain}
                        onChange={handleChange}
                      >
                        <option value="">Pilih...</option>
                        <option value="Sudah">Sudah punya keduanya</option>
                        <option value="Domain saja">Sudah punya domain saja</option>
                        <option value="Belum">Belum punya</option>
                        <option value="Tidak tahu">Tidak tahu</option>
                      </select>
                    </div>

                    {/* Deadline */}
                    <div className="form-group">
                      <label htmlFor="deadline" className="form-label">Deadline / Target Selesai</label>
                      <input
                        id="deadline"
                        name="deadline"
                        type="text"
                        className="form-input neu-inset"
                        placeholder="Contoh: 2 minggu, akhir bulan ini"
                        value={form.deadline}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Budget */}
                    <div className="form-group form-group--full">
                      <label htmlFor="budget" className="form-label">Estimasi Budget</label>
                      <select
                        id="budget"
                        name="budget"
                        className="form-select neu-inset"
                        value={form.budget}
                        onChange={handleChange}
                      >
                        <option value="">Pilih rentang budget...</option>
                        {budgetOptions.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </div>

                    {/* Pesan Tambahan */}
                    <div className="form-group form-group--full">
                      <label htmlFor="pesan" className="form-label">Pesan Tambahan</label>
                      <textarea
                        id="pesan"
                        name="pesan"
                        className="form-textarea neu-inset"
                        placeholder="Referensi website, fitur khusus, atau catatan lain yang perlu kami ketahui..."
                        rows={4}
                        value={form.pesan}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  </div>

                  <div className="kontak-form__footer">
                    <button
                      type="submit"
                      className="btn btn-wa kontak-form__submit"
                      disabled={loading}
                      aria-busy={loading}
                    >
                      {loading ? (
                        <>
                          <span className="kontak-form__spinner" aria-hidden="true" />
                          Menyiapkan WhatsApp...
                        </>
                      ) : (
                        <>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.557 4.116 1.529 5.843L.057 23.143a.75.75 0 00.917.916l5.356-1.461A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.91 0-3.694-.523-5.22-1.432l-.374-.222-3.88 1.058 1.087-3.797-.243-.387A9.714 9.714 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                          </svg>
                          Kirim via WhatsApp
                        </>
                      )}
                    </button>
                    <p className="kontak-form__footnote">
                      Brief juga tersimpan secara aman. Field bertanda * wajib diisi; sisanya dapat dikosongkan.
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <aside className="kontak-info" aria-label="Informasi kontak">
              <div className="kontak-info__card neu-raised">
                <h2 className="kontak-info__title">Hubungi Langsung</h2>
                <p className="kontak-info__desc">Pilih saluran komunikasi yang paling sesuai.</p>

                <div className="kontak-channels">
                  <a
                    href={
                      'https://wa.me/' +
                      company.whatsapp +
                      '?text=' +
                      encodeURIComponent(
                        'Halo IDKA Solutions, saya ingin konsultasi website.',
                      )
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="kontak-channel kontak-channel--wa neu-raised"
                    aria-label="Chat via WhatsApp"
                  >
                    <div className="kontak-channel__icon" style={{ background: '#25d366', color: 'white' }} aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.557 4.116 1.529 5.843L.057 23.143a.75.75 0 00.917.916l5.356-1.461A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.91 0-3.694-.523-5.22-1.432l-.374-.222-3.88 1.058 1.087-3.797-.243-.387A9.714 9.714 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="kontak-channel__label">WhatsApp</div>
                      <div className="kontak-channel__value">Konsultasi langsung</div>
                    </div>
                    <svg className="kontak-channel__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </a>

                  <a
                    href="https://instagram.com/idkasolutions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="kontak-channel neu-raised"
                    aria-label="Instagram IDKA Solutions"
                  >
                    <div className="kontak-channel__icon" style={{ background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', color: 'white' }} aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                        <circle cx="12" cy="12" r="4"/>
                        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                      </svg>
                    </div>
                    <div>
                      <div className="kontak-channel__label">Instagram</div>
                      <div className="kontak-channel__value">{company.instagram}</div>
                    </div>
                    <svg className="kontak-channel__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </a>

                  <a
                    href={`mailto:${company.email}`}
                    className="kontak-channel neu-raised"
                    aria-label={`Email ${company.email}`}
                  >
                    <div className="kontak-channel__icon" style={{ background: 'var(--primary)', color: 'white' }} aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </div>
                    <div>
                      <div className="kontak-channel__label">Email</div>
                      <div className="kontak-channel__value">{company.email}</div>
                    </div>
                    <svg className="kontak-channel__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Response Time */}
              <div className="kontak-response neu-raised">
                <div className="kontak-response__icon" aria-hidden="true">&#9201;</div>
                <div>
                  <div className="kontak-response__title">Waktu Respons</div>
                  <div className="kontak-response__desc">1–3 jam pada jam kerja (Senin–Sabtu, 08.00–20.00 WIB)</div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="kontak-payment neu-raised">
                <h3 className="kontak-payment__title">Sistem Pembayaran</h3>
                <div className="kontak-payment__items">
                  <div className="kontak-payment__item">
                    <span className="kontak-payment__bullet" aria-hidden="true">&#9654;</span>
                    <span>DP 50% sebelum pengerjaan dimulai</span>
                  </div>
                  <div className="kontak-payment__item">
                    <span className="kontak-payment__bullet" aria-hidden="true">&#9654;</span>
                    <span>Pelunasan 50% sebelum go-live</span>
                  </div>
                  <div className="kontak-payment__item">
                    <span className="kontak-payment__bullet" aria-hidden="true">&#9654;</span>
                    <span>Transfer bank / QRIS / e-wallet</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
