import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import './InstagramPosts.css'

/* Geometric Overlay Grid Background Component */
function GeometricBgOverlay() {
  return (
    <div className="ref-bg-overlay" aria-hidden="true">
      {/* Top Left Geometric Cubes */}
      <svg className="geo-cubes geo-cubes--top" viewBox="0 0 300 300" fill="none" stroke="currentColor">
        <path d="M 50 20 L 150 70 L 150 170 L 50 120 Z" strokeWidth="2.5" opacity="0.25" />
        <path d="M 150 70 L 250 20 L 250 120 L 150 170 Z" strokeWidth="2.5" opacity="0.25" />
        <path d="M 50 20 L 150 -30 L 250 20" strokeWidth="2.5" opacity="0.25" />
        <path d="M 100 150 L 200 200 L 200 300 L 100 250 Z" strokeWidth="2.5" opacity="0.18" />
      </svg>

      {/* Bottom Right Geometric Cubes */}
      <svg className="geo-cubes geo-cubes--bot" viewBox="0 0 300 300" fill="none" stroke="currentColor">
        <path d="M 50 20 L 150 70 L 150 170 L 50 120 Z" strokeWidth="2.5" opacity="0.25" />
        <path d="M 150 70 L 250 20 L 250 120 L 150 170 Z" strokeWidth="2.5" opacity="0.25" />
        <path d="M 50 20 L 150 -30 L 250 20" strokeWidth="2.5" opacity="0.25" />
      </svg>

      {/* Bottom Left Doodle Watermark (Laptop + Chat Bubbles + Person) */}
      <svg className="doodle-watermark" viewBox="0 0 260 260" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.22">
        {/* Laptop */}
        <rect x="20" y="140" width="160" height="90" rx="12" />
        <path d="M 10,230 L 190,230 L 175,245 L 25,245 Z" fill="none" />
        <line x1="50" y1="165" x2="150" y2="165" />
        <line x1="50" y1="185" x2="130" y2="185" />
        <line x1="50" y1="205" x2="110" y2="205" />

        {/* Chat Bubbles */}
        <rect x="70" y="50" width="120" height="70" rx="16" />
        <line x1="95" y1="75" x2="165" y2="75" />
        <line x1="95" y1="95" x2="145" y2="95" />

        {/* Girl Doodle */}
        <circle cx="215" cy="210" r="20" />
        <path d="M 200 245 C 200 230, 230 230, 230 245" />
      </svg>
    </div>
  )
}

/* 3D WhatsApp Green CTA Button Component */
function WhatsAppCtaButton({ text = "CHAT WHATSAPP >>", subText = "Gratis • Langsung jawab dalam 5 menit" }: { text?: string; subText?: string }) {
  return (
    <a href="https://wa.me/6282245964007" target="_blank" rel="noopener noreferrer" className="ref-wa-btn-3d">
      <div className="ref-wa-icon-circle">
        <svg viewBox="0 0 32 32" fill="#ffffff" width="48" height="48">
          <path d="M 16 3 C 8.8 3 3 8.8 3 16 C 3 18.7 3.8 21.2 5.2 23.4 L 3.5 28.5 L 8.8 26.9 C 10.9 28.1 13.4 28.8 16 28.8 C 23.2 28.8 29 23 29 15.8 C 29 8.6 23.2 3 16 3 Z M 16 26.5 C 13.8 26.5 11.6 25.9 9.8 24.8 L 9.4 24.6 L 5.5 25.8 L 6.7 22 L 6.4 21.5 C 5.1 19.6 4.4 17.5 4.4 15.3 C 4.4 9.2 9.4 4.2 15.5 4.2 C 21.6 4.2 26.6 9.2 26.6 15.3 C 26.6 21.4 21.6 26.5 16 26.5 Z M 21.5 18.8 C 21.2 18.7 19.7 17.9 19.4 17.8 C 19.1 17.7 18.9 17.7 18.7 18 C 18.5 18.3 17.9 19 17.7 19.2 C 17.5 19.4 17.3 19.4 17 19.2 C 16.7 19.1 15.7 18.7 14.5 17.7 C 13.6 16.9 13 15.9 12.8 15.6 C 12.6 15.3 12.8 15.1 12.9 15 C 13 14.9 13.2 14.7 13.3 14.5 C 13.4 14.3 13.5 14.2 13.6 14 C 13.7 13.8 13.6 13.6 13.5 13.5 C 13.4 13.4 12.8 11.9 12.5 11.3 C 12.3 10.7 12 10.8 11.8 10.8 C 11.6 10.8 11.4 10.8 11.2 10.8 C 11 10.8 10.6 10.9 10.3 11.2 C 10 11.5 9.2 12.3 9.2 13.9 C 9.2 15.5 10.4 17 10.5 17.2 C 10.7 17.4 12.8 20.6 16.1 22 C 16.9 22.3 17.5 22.5 18 22.7 C 18.8 22.9 19.6 22.9 20.2 22.8 C 20.9 22.7 22.3 21.9 22.6 21 C 22.9 20.1 22.9 19.3 22.8 19.1 C 22.7 18.9 22.5 18.9 21.5 18.8 Z" />
        </svg>
      </div>

      <div className="ref-wa-text-wrap">
        <span className="ref-wa-title">{text}</span>
        <span className="ref-wa-sub">{subText}</span>
      </div>
    </a>
  )
}

/* POST 1: Konsultasi Website GRATIS (Exact Reference Image Replica) */
export function ReactIgPost1() {
  return (
    <div id="ig-post-1" className="ref-ig-canvas">
      <GeometricBgOverlay />

      {/* Top Right IDKA Logo Header */}
      <div className="ref-header">
        <img src="/logo-idka-solutions.png" alt="IDKA Solutions" className="ref-logo-img" />
      </div>

      {/* Main Center Content */}
      <div className="ref-center-content">
        {/* Giant White 3D Text Title */}
        <div className="ref-title-3d">
          <div className="title-line">Konsultasi</div>
          <div className="title-line">Website</div>
          <div className="title-line title-line--highlight">GRATIS</div>
        </div>

        {/* Subtitle Magenta Pink with Doodle Lines */}
        <div className="ref-subtitle-wrap">
          <p className="ref-subtitle">
            Ceritain bisnis kamu,<br />
            kami bantu figure out
          </p>

          {/* Hand drawn scribble accent lines next to text */}
          <svg className="ref-pink-doodle" viewBox="0 0 120 40" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round">
            <line x1="10" y1="30" x2="110" y2="30" stroke="#2e1065" strokeWidth="5" />
            <path d="M 85 10 L 95 18 M 95 8 L 102 18 M 105 12 L 112 22" />
          </svg>
        </div>

        {/* 3D Green WhatsApp Pill Button */}
        <WhatsAppCtaButton
          text="CHAT WHATSAPP >>"
          subText="Gratis • Langsung jawab dalam 5 menit"
        />
      </div>
    </div>
  )
}

/* POST 2: Website Profil & Branding */
export function ReactIgPost2() {
  return (
    <div id="ig-post-2" className="ref-ig-canvas">
      <GeometricBgOverlay />

      {/* Top Right IDKA Logo Header */}
      <div className="ref-header">
        <img src="/logo-idka-solutions.png" alt="IDKA Solutions" className="ref-logo-img" />
      </div>

      {/* Main Center Content */}
      <div className="ref-center-content">
        {/* Giant White 3D Text Title */}
        <div className="ref-title-3d">
          <div className="title-line">Website</div>
          <div className="title-line">Profil &amp;</div>
          <div className="title-line title-line--highlight">Branding</div>
        </div>

        {/* Subtitle Magenta Pink */}
        <div className="ref-subtitle-wrap">
          <p className="ref-subtitle">
            Bikin bisnis kamu makin<br />
            tepercaya di mata klien
          </p>
          <svg className="ref-pink-doodle" viewBox="0 0 120 40" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round">
            <line x1="10" y1="30" x2="110" y2="30" stroke="#2e1065" strokeWidth="5" />
            <path d="M 85 10 L 95 18 M 95 8 L 102 18 M 105 12 L 112 22" />
          </svg>
        </div>

        {/* Feature Spec Cards */}
        <div className="ref-specs-grid">
          <div className="spec-pill">Speed 95+</div>
          <div className="spec-pill">Mobile Ready</div>
          <div className="spec-pill">Direct WA Form</div>
        </div>

        {/* 3D Green CTA Button */}
        <WhatsAppCtaButton
          text="JELAJAHI PAKET PROFIL >>"
          subText="Desain Kustom • Bebas Biaya Komisi"
        />
      </div>
    </div>
  )
}

/* POST 3: Website Katalog & Toko Online */
export function ReactIgPost3() {
  return (
    <div id="ig-post-3" className="ref-ig-canvas">
      <GeometricBgOverlay />

      {/* Top Right IDKA Logo Header */}
      <div className="ref-header">
        <img src="/logo-idka-solutions.png" alt="IDKA Solutions" className="ref-logo-img" />
      </div>

      {/* Main Center Content */}
      <div className="ref-center-content">
        {/* Giant White 3D Text Title */}
        <div className="ref-title-3d">
          <div className="title-line">Website</div>
          <div className="title-line">Katalog &amp;</div>
          <div className="title-line title-line--highlight">Toko Online</div>
        </div>

        {/* Subtitle Magenta Pink */}
        <div className="ref-subtitle-wrap">
          <p className="ref-subtitle">
            Order langsung ke WhatsApp<br />
            tanpa potong komisi 🔥
          </p>
          <svg className="ref-pink-doodle" viewBox="0 0 120 40" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round">
            <line x1="10" y1="30" x2="110" y2="30" stroke="#2e1065" strokeWidth="5" />
            <path d="M 85 10 L 95 18 M 95 8 L 102 18 M 105 12 L 112 22" />
          </svg>
        </div>

        {/* Feature Spec Cards */}
        <div className="ref-specs-grid">
          <div className="spec-pill">Katalog Rapi</div>
          <div className="spec-pill">Payment Link</div>
          <div className="spec-pill">Bebas Komisi</div>
        </div>

        {/* 3D Green CTA Button */}
        <WhatsAppCtaButton
          text="PESAN KATALOG DIGITAL >>"
          subText="Mulai Rp 900.000 • Siap Jualan"
        />
      </div>
    </div>
  )
}

/* POST 4: 3 Langkah Punya Website LIVE */
export function ReactIgPost4() {
  return (
    <div id="ig-post-4" className="ref-ig-canvas">
      <GeometricBgOverlay />

      {/* Top Right IDKA Logo Header */}
      <div className="ref-header">
        <img src="/logo-idka-solutions.png" alt="IDKA Solutions" className="ref-logo-img" />
      </div>

      {/* Main Center Content */}
      <div className="ref-center-content">
        {/* Giant White 3D Text Title */}
        <div className="ref-title-3d">
          <div className="title-line">3 Langkah</div>
          <div className="title-line">Punya Website</div>
          <div className="title-line title-line--highlight">LIVE!</div>
        </div>

        {/* Subtitle Magenta Pink */}
        <div className="ref-subtitle-wrap">
          <p className="ref-subtitle">
            Proses cepat &amp; transparan<br />
            dari brief sampai online 🚀
          </p>
          <svg className="ref-pink-doodle" viewBox="0 0 120 40" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round">
            <line x1="10" y1="30" x2="110" y2="30" stroke="#2e1065" strokeWidth="5" />
            <path d="M 85 10 L 95 18 M 95 8 L 102 18 M 105 12 L 112 22" />
          </svg>
        </div>

        {/* 3 Steps Pills */}
        <div className="ref-steps-stack">
          <div className="step-pill-3d">01. Brief Kebutuhan</div>
          <div className="step-pill-3d">02. Desain &amp; Dev Staging</div>
          <div className="step-pill-3d">03. Website Online &amp; SSL Active</div>
        </div>

        {/* 3D Green CTA Button */}
        <WhatsAppCtaButton
          text="MULAI KONSULTASI >>"
          subText="Respon Cepat • Garansi Puas"
        />
      </div>
    </div>
  )
}

/* MAIN PAGE WRAPPER */
export default function InstagramPosts() {
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<number>(1)
  const isExportMode = searchParams.get('export') === 'true'

  if (isExportMode) {
    return (
      <div className="export-canvas-container">
        <ReactIgPost1 />
        <ReactIgPost2 />
        <ReactIgPost3 />
        <ReactIgPost4 />
      </div>
    )
  }

  return (
    <div className="react-ig-preview-page">
      <div className="container">
        <div className="preview-page-header">
          <div className="doodle-tag">Style Presisi Referensi Visual IDKA</div>
          <h1 className="preview-title">4 Postingan Instagram 3D Sticker Purple</h1>
          <p className="preview-sub">
            Desain persis dengan contoh foto referensi: Ungu Vibrant Gradient, Tipografi Teks 3D Stiker, Magenta Pink Subheadline, &amp; Tombol WhatsApp 3D Hijau Timbul.
          </p>

          <div className="tab-buttons">
            <button className={`tab-btn ${activeTab === 1 ? 'tab-btn--active' : ''}`} onClick={() => setActiveTab(1)}>Post 01: Konsultasi Gratis</button>
            <button className={`tab-btn ${activeTab === 2 ? 'tab-btn--active' : ''}`} onClick={() => setActiveTab(2)}>Post 02: Website Profil</button>
            <button className={`tab-btn ${activeTab === 3 ? 'tab-btn--active' : ''}`} onClick={() => setActiveTab(3)}>Post 03: Toko Online</button>
            <button className={`tab-btn ${activeTab === 4 ? 'tab-btn--active' : ''}`} onClick={() => setActiveTab(4)}>Post 04: 3 Langkah Live</button>
          </div>
        </div>

        <div className="preview-stage">
          <div className="ig-frame-wrapper">
            {activeTab === 1 && <ReactIgPost1 />}
            {activeTab === 2 && <ReactIgPost2 />}
            {activeTab === 3 && <ReactIgPost3 />}
            {activeTab === 4 && <ReactIgPost4 />}
          </div>
        </div>
      </div>
    </div>
  )
}
