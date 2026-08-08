export interface ScribbleUnderlineProps {
  variant?: 'wavy' | 'double' | 'zigzag' | 'arc' | 'loop'
  className?: string
}

export function ScribbleUnderline({ variant = 'wavy', className = '' }: ScribbleUnderlineProps) {
  const baseClass = `scribble-underline-svg scribble-underline-svg--${variant} ${className}`.trim()

  switch (variant) {
    case 'wavy':
      return (
        <svg className={baseClass} viewBox="0 0 240 24" fill="none" aria-hidden="true">
          <path
            className="scribble-path"
            d="M 4 14 C 45 4, 85 18, 125 9 C 165 2, 205 16, 230 8 C 238 5, 235 15, 225 14 C 180 18, 130 12, 85 15"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <circle cx="232" cy="7" r="2" fill="currentColor" opacity="0.8" />
        </svg>
      )
    case 'double':
      return (
        <svg className={baseClass} viewBox="0 0 240 24" fill="none" aria-hidden="true">
          <path
            className="scribble-path"
            d="M 5 10 C 60 4, 120 12, 180 5 C 205 2, 225 8, 235 10"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            className="scribble-path-sub"
            d="M 15 17 C 70 12, 130 18, 190 12 C 210 10, 225 15, 230 16"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.85"
          />
        </svg>
      )
    case 'zigzag':
      return (
        <svg className={baseClass} viewBox="0 0 240 24" fill="none" aria-hidden="true">
          <path
            className="scribble-path"
            d="M 4 15 Q 24 3, 44 15 T 84 15 T 124 15 T 164 15 T 204 15 T 236 10"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="scribble-accent-sparkle"
            d="M 228 3 L 236 3 M 232 -1 L 232 7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'arc':
      return (
        <svg className={baseClass} viewBox="0 0 240 24" fill="none" aria-hidden="true">
          <path
            className="scribble-path"
            d="M 5 18 Q 120 -2, 235 18"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            className="scribble-accent-star"
            d="M 215 6 L 225 6 M 220 1 L 220 11"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'loop':
      return (
        <svg className={baseClass} viewBox="0 0 240 24" fill="none" aria-hidden="true">
          <path
            className="scribble-path"
            d="M 4 16 Q 40 4, 70 12 C 90 18, 100 2, 115 10 C 130 18, 150 4, 180 12 C 210 20, 225 6, 236 12"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      )
    default:
      return null
  }
}

export default ScribbleUnderline
