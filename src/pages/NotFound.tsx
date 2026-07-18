import { NavLink } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'
import './NotFound.css'

export default function NotFound() {
  usePageTitle({
    title: 'Halaman Tidak Ditemukan',
    description: 'Halaman yang kamu cari tidak ditemukan. Kembali ke beranda IDKA Solutions atau jelajahi layanan kami.',
    robots: 'noindex, follow',
  })

  return (
    <div className="notfound-page">
      <div className="notfound__card neu-raised-lg">
        <div className="notfound__code" aria-hidden="true">404</div>
        <h1 className="notfound__title">Halaman Tidak Ditemukan</h1>
        <p className="notfound__desc">
          Kayaknya halaman yang kamu cari udah pindah atau emang nggak ada.
          Tenang, masih banyak hal keren yang bisa kamu explore di sini.
        </p>
        <div className="notfound__actions">
          <NavLink to="/" className="btn btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Balik ke Beranda
          </NavLink>
          <NavLink to="/kontak" className="btn btn-secondary">
            Chat Kami
          </NavLink>
        </div>
        <div className="notfound__links">
          <span className="notfound__links-label">Mau ke mana?</span>
          <NavLink to="/layanan" className="notfound__link">Layanan</NavLink>
          <NavLink to="/portofolio" className="notfound__link">Portofolio</NavLink>
          <NavLink to="/tentang" className="notfound__link">Tentang Kami</NavLink>
        </div>
      </div>
    </div>
  )
}
