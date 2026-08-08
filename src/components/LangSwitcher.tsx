import { useLanguage } from '../context/LanguageContext'
import './LangSwitcher.css'

/* Art Canvas Hand-Drawn UK Flag SVG */
function UKFlagArt() {
  return (
    <svg
      className="lang-switcher__flag"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <g clipPath="url(#uk-clip)">
        {/* Background Blue */}
        <rect width="32" height="32" rx="16" fill="#012169" />
        {/* White Saltire & Cross */}
        <path d="M0 0 L32 32 M32 0 L0 32" stroke="#ffffff" strokeWidth="5.5" />
        <path d="M0 0 L32 32 M32 0 L0 32" stroke="#C8102E" strokeWidth="2.2" />
        <path d="M16 0 V32 M0 16 H32" stroke="#ffffff" strokeWidth="7" />
        <path d="M16 0 V32 M0 16 H32" stroke="#C8102E" strokeWidth="4" />
      </g>
      {/* Hand-drawn scribble border circle */}
      <circle cx="16" cy="16" r="14.5" stroke="#1e1b4b" strokeWidth="2.2" fill="none" />
      <clipPath id="uk-clip">
        <circle cx="16" cy="16" r="14" />
      </clipPath>
    </svg>
  )
}

/* Art Canvas Hand-Drawn Indonesia Flag SVG */
function IDFlagArt() {
  return (
    <svg
      className="lang-switcher__flag"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <g clipPath="url(#id-clip)">
        {/* Red top */}
        <rect width="32" height="16" fill="#e11d48" />
        {/* White bottom */}
        <rect y="16" width="32" height="16" fill="#ffffff" />
        {/* Subtle separator */}
        <path d="M0 16 H32" stroke="rgba(30, 27, 75, 0.2)" strokeWidth="0.8" />
      </g>
      {/* Hand-drawn scribble border circle */}
      <circle cx="16" cy="16" r="14.5" stroke="#1e1b4b" strokeWidth="2.2" fill="none" />
      <clipPath id="id-clip">
        <circle cx="16" cy="16" r="14" />
      </clipPath>
    </svg>
  )
}

/* Scribble underline for active lang label */
function ActiveScribble() {
  return (
    <svg
      className="lang-switcher__scribble"
      viewBox="0 0 36 8"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M 2 5 C 8 2, 18 7, 28 3 C 32 2, 34 5, 34 5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

interface LangSwitcherProps {
  className?: string
  /** Compact mode: shows only flag + code */
  compact?: boolean
}

export default function LangSwitcher({ className = '', compact = false }: LangSwitcherProps) {
  const { lang, toggle } = useLanguage()

  const isEN = lang === 'en'

  return (
    <button
      type="button"
      className={`lang-switcher ${compact ? 'lang-switcher--compact' : ''} ${className}`.trim()}
      onClick={toggle}
      aria-label={isEN ? 'Switch to Indonesian' : 'Ganti ke Bahasa Inggris'}
      title={isEN ? 'Switch to Indonesian (ID)' : 'Switch to English (EN)'}
    >
      {/* Active Flag Icon */}
      {isEN ? <UKFlagArt /> : <IDFlagArt />}

      <span className="lang-switcher__pill">
        {/* EN label */}
        <span className={`lang-switcher__code ${isEN ? 'lang-switcher__code--active' : ''}`}>
          EN
          {isEN && <ActiveScribble />}
        </span>

        {/* Separator — hand-drawn slash */}
        <svg
          className="lang-switcher__sep"
          viewBox="0 0 10 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M 8 2 L 2 14" />
        </svg>

        {/* ID label */}
        <span className={`lang-switcher__code ${!isEN ? 'lang-switcher__code--active' : ''}`}>
          ID
          {!isEN && <ActiveScribble />}
        </span>
      </span>
    </button>
  )
}
