import type { ReactNode } from 'react'

export interface HandDrawnBadgeProps {
  children: ReactNode
  shape?: 'oval' | 'tape' | 'cloud'
  className?: string
}

export function HandDrawnBadge({ children, shape = 'oval', className = '' }: HandDrawnBadgeProps) {
  return (
    <div className={`doodle-badge doodle-badge--${shape} ${className}`.trim()}>
      <svg className="doodle-badge__bg" viewBox="0 0 160 50" fill="none" preserveAspectRatio="none" aria-hidden="true">
        {shape === 'oval' && (
          <path
            d="M 8 25 C 8 8, 40 5, 80 5 C 120 5, 152 8, 152 25 C 152 42, 120 45, 80 45 C 40 45, 8 42, 8 25 Z M 5 23 C 5 10, 38 7, 78 7 C 118 7, 155 10, 155 27"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        )}
        {shape === 'tape' && (
          <path
            d="M 5 8 L 155 4 L 150 44 L 10 46 Z M 2 12 L 158 8 L 153 48 L 7 50 Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        )}
        {shape === 'cloud' && (
          <path
            d="M 20 35 C 10 35, 5 25, 15 15 C 20 5, 40 5, 50 15 C 60 5, 80 5, 90 15 C 100 5, 120 5, 130 15 C 145 15, 155 25, 145 35 C 155 45, 135 48, 125 42 C 110 48, 90 48, 85 40 C 70 48, 45 48, 35 42 C 25 48, 15 42, 20 35 Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        )}
      </svg>
      <span className="doodle-badge__text">{children}</span>
    </div>
  )
}

export default HandDrawnBadge
