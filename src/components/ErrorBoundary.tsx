import { Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'

type Props = { children: ReactNode }
type State = { hasError: boolean; error: Error | null }

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          padding: '2rem',
          textAlign: 'center',
          fontFamily: 'var(--font-sans)',
          color: 'var(--text-secondary)',
        }}>
          <div style={{ fontSize: '3rem' }}>&#9888;</div>
          <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)', fontWeight: 800 }}>
            Terjadi Kesalahan
          </h2>
          <p style={{ maxWidth: 400, lineHeight: 1.7 }}>
            Halaman ini mengalami kendala teknis. Coba refresh halaman atau kembali ke beranda.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Refresh Halaman
            </button>
            <a href="/" className="btn btn-secondary">Kembali ke Beranda</a>
          </div>
          {import.meta.env.DEV && this.state.error && (
            <pre style={{
              fontSize: '0.75rem',
              color: 'var(--danger)',
              background: 'rgba(239,68,68,0.08)',
              padding: '1rem',
              borderRadius: '8px',
              maxWidth: '600px',
              overflow: 'auto',
              textAlign: 'left',
            }}>
              {this.state.error.toString()}
            </pre>
          )}
        </div>
      )
    }
    return this.props.children
  }
}
