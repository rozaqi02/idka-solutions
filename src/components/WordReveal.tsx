import type { CSSProperties, ReactNode } from 'react'

type WordRevealProps = {
  children: ReactNode
  className?: string
}

/** Splits a short editorial line into ink-like, per-word entrances. */
export default function WordReveal({ children, className = '' }: WordRevealProps) {
  if (typeof children !== 'string') return <span className={className}>{children}</span>

  return (
    <span className={`word-reveal ${className}`} aria-label={children}>
      {children.split(' ').map((word, index) => (
        <span
          className="word-reveal__word"
          style={{ '--word-index': index } as CSSProperties}
          key={`${word}-${index}`}
          aria-hidden="true"
        >
          {word}
        </span>
      ))}
    </span>
  )
}
