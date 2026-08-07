export interface ContinuousLineArtProps {
  type: string
  className?: string
}

export function ContinuousLineArt({ type, className = '' }: ContinuousLineArtProps) {
  const baseClass = `continuous-line-svg ${className}`.trim()

  switch (type) {
    case 'building':
      return (
        <svg className={baseClass} viewBox="0 0 160 120" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path
            className="continuous-path"
            d="M 15,105 C 25,105 35,95 40,85 C 45,70 30,55 45,40 C 55,30 70,35 75,25 C 80,15 95,15 105,25 C 115,35 110,50 125,55 C 135,60 145,50 145,65 C 145,80 130,85 125,95 C 120,105 135,110 145,105 C 130,105 115,105 100,105 M 40,85 L 100,85 L 100,35 L 40,35 Z M 40,60 L 100,60 M 70,35 L 70,85"
          />
          <path className="scribble-loop-path" d="M 15,30 C 22,22 28,38 20,40 C 14,42 22,25 30,28" strokeWidth="1.8" opacity="0.6" />
        </svg>
      )
    case 'shopping-bag':
      return (
        <svg className={baseClass} viewBox="0 0 160 120" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path
            className="continuous-path"
            d="M 25,45 C 25,25 45,20 60,20 C 75,20 95,25 95,45 M 20,45 L 100,45 L 90,100 L 30,100 Z M 55,45 C 55,60 65,60 65,45 M 100,60 C 115,55 130,50 140,60 C 150,70 135,85 120,80 C 110,75 125,95 145,95"
          />
          <circle cx="45" cy="100" r="6" strokeWidth="2" />
          <circle cx="75" cy="100" r="6" strokeWidth="2" />
          <path className="scribble-accent-path" d="M 115,25 Q 125,15 135,25 Q 125,35 115,25 Z" strokeWidth="1.8" opacity="0.8" />
        </svg>
      )
    case 'cpu':
      return (
        <svg className={baseClass} viewBox="0 0 160 120" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path
            className="continuous-path"
            d="M 20,60 C 20,35 40,20 65,20 C 85,20 95,35 105,30 C 115,25 130,30 135,45 C 140,60 125,75 135,90 C 125,100 105,95 95,105 C 75,105 60,95 45,100 C 30,105 20,85 20,60 Z M 55,45 C 50,55 70,65 65,75 M 95,45 C 100,55 80,65 85,75 M 40,60 C 60,50 100,70 120,60"
          />
          <path className="scribble-accent-path" d="M 135,18 L 125,28 L 135,38 M 145,18 L 155,28 L 145,38" strokeWidth="2" opacity="0.85" />
          <circle cx="65" cy="60" r="4" fill="currentColor" />
        </svg>
      )
    case 'shield-check':
      return (
        <svg className={baseClass} viewBox="0 0 160 120" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path
            className="continuous-path"
            d="M 35,25 C 55,20 75,15 80,15 C 85,15 105,20 125,25 L 125,60 C 125,90 85,110 80,110 C 75,110 35,90 35,60 Z M 15,65 L 45,65 L 55,45 L 70,85 L 85,55 L 95,65 L 145,65"
          />
          <path className="scribble-accent-path" d="M 65,60 L 75,72 L 100,45" strokeWidth="3" opacity="0.9" />
          <path className="scribble-loop-path" d="M 125,18 C 135,10 145,20 135,30 C 125,40 140,45 145,35" strokeWidth="1.8" opacity="0.75" />
        </svg>
      )
    default:
      return null
  }
}

export default ContinuousLineArt
