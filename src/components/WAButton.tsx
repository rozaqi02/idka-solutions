import { useState, useEffect } from 'react'
import { company } from '../data/content'
import './WAButton.css'

const WA_MESSAGE = 'Halo IDKA Solutions! Saya ingin konsultasi website untuk bisnis saya.'
const STORAGE_KEY = 'wa-tooltip-shown'

function safeSessionGet(key: string): string | null {
  try {
    return sessionStorage.getItem(key)
  } catch {
    return null
  }
}

function safeSessionSet(key: string, value: string): void {
  try {
    sessionStorage.setItem(key, value)
  } catch {
    // Private mode / restricted storage — ignore
  }
}

export default function WAButton() {
  const [showTooltip, setShowTooltip] = useState(false)

  // Tooltip hanya muncul sekali per session browser
  useEffect(() => {
    if (safeSessionGet(STORAGE_KEY)) return
    const timer = setTimeout(() => {
      setShowTooltip(true)
      safeSessionSet(STORAGE_KEY, '1')
      setTimeout(() => setShowTooltip(false), 4000)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const waUrl = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(WA_MESSAGE)}`

  return (
    <div className="wa-btn-wrap wa-btn-wrap--visible">
      {showTooltip && (
        <div className="wa-btn__tooltip" role="tooltip">
          Ada yang bisa kami bantu?
          <span className="wa-btn__tooltip-arrow" aria-hidden="true" />
        </div>
      )}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-btn"
        aria-label="Chat WhatsApp dengan IDKA Solutions"
        onClick={() => setShowTooltip(false)}
      >
        <svg
          className="wa-btn__icon"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.557 4.116 1.529 5.843L.057 23.143a.75.75 0 00.917.916l5.356-1.461A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-1.91 0-3.694-.523-5.22-1.432l-.374-.222-3.88 1.058 1.087-3.797-.243-.387A9.714 9.714 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
        </svg>
        <span className="wa-btn__pulse" aria-hidden="true" />
      </a>
    </div>
  )
}
