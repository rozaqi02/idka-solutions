import { useState } from 'react'
import type { FormEvent } from 'react'
import { company } from '../data/content'
import type { ToastType } from '../hooks/useToast'
import './Kontak.css'

type FormData = {
  nama: string
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
  'Di bawah Rp 1 juta',
  'Rp 1 - 3 juta',
  'Rp 3 - 5 juta',
  'Rp 5 - 10 juta',
  'Di atas Rp 10 juta',
  'Belum tahu / ingin konsultasi',
]

type KontakProps = {
  addToast?: (message: string, type?: ToastType) => void
}

export default function Kontak({ addToast }: KontakProps) {
  const [form, setForm] = useState<FormData>(initialForm)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Build WhatsApp message
    const msg = [
      `Halo IDKA Solutions! Saya ingin konsultasi website.`,
      ``,
      `*Data Brief:*`,
      `Nama: ${form.nama}`,
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
    window.open(waUrl, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
    addToast?.('Brief terkirim! WhatsApp sudah terbuka.', 'success')
  }

  return (
    <div className="kontak-page">
      {/* Header */}
      <section className="page-header section" aria-labelledby="kontak-heading">
        <div className="container">
          <div className="page-header__inner">
            <div className="section-tag">Let's Connect</div>
            <h1 id="kontak-heading" className="section-title">
              Ceritain Dulu, <span className="gradient-text">Kami yang Figureout</span>
            </h1>
            <p className="section-subtitle">
              Isi form di bawah—nggak perlu perfect, yang penting ceritain dulu. Kami balas dalam 1-3 jam kerja dan konsultasi pertama gratis!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section kontak-section">
        <div className="container">
          <div className="kontak-grid">
            {/* Form */}
            <div className="kontak-form-wrap">
              {submitted ? (
                <div className="kontak-success neu-raised" role="status" aria-live="polite">
                  <div className="kontak-success__icon" aria-hidden="true">&#10004;</div>
                  <h2 className="kontak-success__title">Siip, Udah Terkirim! 🙌</h2>
                  <p className="kontak-success__desc">
                    WhatsApp udah kebuka dengan detail brief kamu. Kami akan balas dalam jam kerja—stay tuned ya!
                  </p>
                  <button
                    className="btn btn-secondary"
                    onClick={() => { setForm(initialForm); setSubmitted(false) }}
                  >
                    Kirim Brief Lain
                  </button>
                </div>
              ) : (
                <form
                  className="kontak-form neu-raised"
                  onSubmit={handleSubmit}
                  aria-label="Form brief proyek"
                  noValidate
                >
                  <h2 className="kontak-form__title">Spill the Tea ☕</h2>
                  <p className="kontak-form__subtitle">Makin banyak info yang kamu kasih, makin akurat estimasi dan saran dari kami.</p>

                  <div className="form-grid">
                    {/* Nama */}
                    <div className="form-group">
                      <label htmlFor="nama" className="form-label">
                        Nama Kamu <span className="form-required" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="nama"
                        name="nama"
                        type="text"
                        className="form-input neu-inset"
                        placeholder="e.g. Rahmat, Sari, dll"
                        value={form.nama}
                        onChange={handleChange}
                        required
                        aria-required="true"
                      />
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
                        className="form-input neu-inset"
                        placeholder="e.g. Kedai Kopi Nusantara, Studio Foto dll"
                        value={form.bisnis}
                        onChange={handleChange}
                        required
                        aria-required="true"
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
                        placeholder="e.g. Kuliner, Fotografi, Konsultan, Kreator"
                        value={form.jenis_usaha}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Tujuan Website */}
                    <div className="form-group form-group--full">
                      <label htmlFor="tujuan_website" className="form-label">
                        Tujuan Website <span className="form-required" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="tujuan_website"
                        name="tujuan_website"
                        type="text"
                        className="form-input neu-inset"
                        placeholder="e.g. Narik pelanggan baru, kelihatan profesional, jualan online"
                        value={form.tujuan_website}
                        onChange={handleChange}
                        required
                        aria-required="true"
                      />
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
                        placeholder="Spill aja semua—referensi website yang kamu suka, fitur khusus, atau apapun yang ada di pikiran kamu..."
                        rows={4}
                        value={form.pesan}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary kontak-form__submit">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.557 4.116 1.529 5.843L.057 23.143a.75.75 0 00.917.916l5.356-1.461A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.91 0-3.694-.523-5.22-1.432l-.374-.222-3.88 1.058 1.087-3.797-.243-.387A9.714 9.714 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                    </svg>
                    Gas, Kirim via WhatsApp!
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <aside className="kontak-info" aria-label="Informasi kontak">
              <div className="kontak-info__card neu-raised">
                <h2 className="kontak-info__title">Mau Langsung Chat?</h2>
                <p className="kontak-info__desc">Pilih channel yang paling enak buat kamu.</p>

                <div className="kontak-channels">
                  <a
                    href={`https://wa.me/${company.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="kontak-channel neu-raised"
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
                      <div className="kontak-channel__value">Chat langsung</div>
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
                  <div className="kontak-response__title">Kami Balas Cepet ⚡</div>
                  <div className="kontak-response__desc">1-3 jam di jam kerja (Senin–Sabtu, 08.00–20.00 WIB)</div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="kontak-payment neu-raised">
                <h3 className="kontak-payment__title">Cara Bayar</h3>
                <div className="kontak-payment__items">
                  <div className="kontak-payment__item">
                    <span className="kontak-payment__bullet" aria-hidden="true">&#9654;</span>
                    <span>DP 50% dulu sebelum mulai ngerjain</span>
                  </div>
                  <div className="kontak-payment__item">
                    <span className="kontak-payment__bullet" aria-hidden="true">&#9654;</span>
                    <span>Pelunasan 50% sebelum website live</span>
                  </div>
                  <div className="kontak-payment__item">
                    <span className="kontak-payment__bullet" aria-hidden="true">&#9654;</span>
                    <span>Transfer Bank / QRIS / E-Wallet</span>
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
