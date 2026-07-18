import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WAButton from './components/WAButton'
import ScrollToTop from './components/ScrollToTop'
import ToastContainer from './components/Toast'
import ErrorBoundary from './components/ErrorBoundary'
import { useToast } from './hooks/useToast'

// React.lazy code splitting per route
const Home        = lazy(() => import('./pages/Home'))
const Layanan     = lazy(() => import('./pages/Layanan'))
const Portofolio  = lazy(() => import('./pages/Portofolio'))
const TentangKami = lazy(() => import('./pages/TentangKami'))
const Kontak      = lazy(() => import('./pages/Kontak'))
const NotFound    = lazy(() => import('./pages/NotFound'))

function PageLoader() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      role="status"
      aria-live="polite"
      aria-label="Memuat halaman..."
    >
      <div className="page-loader">
        <div className="page-loader__dot" />
        <div className="page-loader__dot" />
        <div className="page-loader__dot" />
      </div>
      <span className="sr-only">Memuat halaman...</span>
    </div>
  )
}

function ScrollRestorer() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])
  return null
}

function AnimatedRoutes({ addToast }: { addToast: (msg: string, type?: 'success' | 'error' | 'info') => void }) {
  const location = useLocation()

  return (
    <div key={location.pathname} className="page-enter">
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/"          element={<Home />} />
            <Route path="/layanan"   element={<Layanan />} />
            <Route path="/portofolio" element={<Portofolio />} />
            <Route path="/tentang"   element={<TentangKami />} />
            <Route path="/kontak"    element={<Kontak addToast={addToast} />} />
            <Route path="*"          element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

function App() {
  const { toasts, addToast, removeToast } = useToast()

  return (
    <BrowserRouter>
      <a href="#main-content" className="skip-link">
        Langsung ke konten
      </a>
      <ScrollRestorer />
      <Navbar />
      <main id="main-content">
        <AnimatedRoutes addToast={addToast} />
      </main>
      <Footer />
      <WAButton />
      <ScrollToTop />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </BrowserRouter>
  )
}

export default App
