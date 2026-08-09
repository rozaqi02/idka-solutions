interface TechLogoProps {
  name: string
  className?: string
  size?: number
}

export function TechLogo({ name, className = '', size = 18 }: TechLogoProps) {
  const normalized = name.toLowerCase().trim()

  const style = {
    width: size,
    height: size,
    display: 'inline-block',
    verticalAlign: 'middle',
    flexShrink: 0,
  }

  // React
  if (normalized.includes('react') && !normalized.includes('native')) {
    return (
      <svg style={style} className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none" aria-hidden="true">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    )
  }

  // React Native
  if (normalized.includes('react native')) {
    return (
      <svg style={style} className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none" aria-hidden="true">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
        <g stroke="#61DAFB" strokeWidth="1.3" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    )
  }

  // Flutter
  if (normalized.includes('flutter')) {
    return (
      <svg style={style} className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M14.314 0L2.3 12 7.157 16.857 23.957 0h-9.643zM14.314 11.571L9.457 16.429l4.857 4.857h9.643l-4.857-4.857 4.857-4.858h-9.643z" fill="#02569B"/>
        <path d="M14.314 21.286l4.857-4.857 4.857 4.857h-9.714z" fill="#0175C2"/>
      </svg>
    )
  }

  // TypeScript
  if (normalized.includes('typescript') || normalized === 'ts') {
    return (
      <svg style={style} className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect width="24" height="24" rx="4" fill="#3178C6"/>
        <path d="M11.953 19.539v-7.859H9.414V9.617h8.172v2.063h-2.539v7.859h-3.094zm9.36.14c-1.399 0-2.531-.382-3.399-1.148-.867-.766-1.383-1.89-1.547-3.375h2.82c.102.765.375 1.344.82 1.734.446.39 1.055.586 1.829.586.726 0 1.281-.153 1.664-.457.383-.305.574-.711.574-1.219 0-.437-.148-.773-.445-1.008-.297-.234-.875-.461-1.735-.68-.86-.218-1.554-.46-2.086-.726a4.02 4.02 0 0 1-1.476-1.164c-.391-.508-.586-1.172-.586-1.992 0-1.148.438-2.063 1.313-2.742.875-.68 2.063-1.02 3.563-1.02 1.328 0 2.437.348 3.328 1.043.89.695 1.375 1.715 1.453 3.059h-2.789c-.07-.649-.297-1.129-.68-1.442-.383-.312-.922-.468-1.617-.468-.656 0-1.156.14-1.5.422-.344.281-.516.64-.516 1.078 0 .39.148.695.445.914.297.219.867.43 1.711.633.844.203 1.531.434 2.063.691.531.258 1.008.641 1.43 1.149.422.508.633 1.172.633 1.992 0 1.211-.438 2.156-1.313 2.836-.875.68-2.094 1.02-3.656 1.02z" fill="#FFF"/>
      </svg>
    )
  }

  // Supabase
  if (normalized.includes('supabase')) {
    return (
      <svg style={style} className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M21.362 9.354H12V.301a.3.3 0 00-.517-.207L.256 11.785a.3.3 0 00.21.517H12v9.053a.3.3 0 00.517.207l11.227-11.691a.3.3 0 00-.21-.517z" fill="url(#supabase_grad_comp)"/>
        <defs>
          <linearGradient id="supabase_grad_comp" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3ECF8E"/>
            <stop offset="1" stopColor="#24B47E"/>
          </linearGradient>
        </defs>
      </svg>
    )
  }

  // Firebase
  if (normalized.includes('firebase')) {
    return (
      <svg style={style} className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3.89 15.672L6.155 1.55a.8.8 0 011.512-.224l2.457 4.673 4.22-8.06a.8.8 0 011.468.093l4.3 17.64-6.93 3.916a2 2 0 01-1.964 0L3.89 15.672z" fill="#FFCA28"/>
        <path d="M14.354 5.922L12 1.432a.8.8 0 00-1.468-.093L3.89 15.672l8.112 4.584a2 2 0 001.964 0l6.93-3.916-6.542-10.418z" fill="#FFA000"/>
        <path d="M12.982 20.256a2 2 0 01-1.964 0L2.906 15.61l.984-6.147 9.092 10.793z" fill="#F57C00"/>
      </svg>
    )
  }

  // Figma
  if (normalized.includes('figma')) {
    return (
      <svg style={style} className={className} viewBox="0 0 38 57" fill="none" aria-hidden="true">
        <path d="M19 28.5c0-5.247 4.253-9.5 9.5-9.5 5.247 0 9.5 4.253 9.5 9.5 0 5.247-4.253 9.5-9.5 9.5-5.247 0-9.5-4.253-9.5-9.5z" fill="#1ABCFE"/>
        <path d="M0 47.5c0-5.247 4.253-9.5 9.5-9.5H19v9.5c0 5.247-4.253 9.5-9.5 9.5C4.253 57 0 52.747 0 47.5z" fill="#0ACF83"/>
        <path d="M19 0v19h9.5c5.247 0 9.5-4.253 9.5-9.5C38 4.253 33.747 0 28.5 0H19z" fill="#FF7262"/>
        <path d="M0 9.5C0 14.747 4.253 19 9.5 19H19V0H9.5C4.253 0 0 4.253 0 9.5z" fill="#F24E1E"/>
        <path d="M0 28.5c0 5.247 4.253 9.5 9.5 9.5H19V19H9.5C4.253 19 0 23.253 0 28.5z" fill="#A259FF"/>
      </svg>
    )
  }

  // Netlify
  if (normalized.includes('netlify')) {
    return (
      <svg style={style} className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6.43 12L12 17.57 17.57 12 12 6.43 6.43 12z" fill="#00C7B7"/>
        <path d="M12 0L0 12l12 12 12-12L12 0zm0 21.6L2.4 12 12 2.4 21.6 12 12 21.6z" fill="#00C7B7"/>
      </svg>
    )
  }

  // Dart
  if (normalized.includes('dart')) {
    return (
      <svg style={style} className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4.1 4.1L.5 14.8l6.8 5.7 12.6-7.8L4.1 4.1z" fill="#01579B"/>
        <path d="M19.9 12.7L6.8 4.6 4.1 4.1l15.8 8.6z" fill="#40C4FF"/>
        <path d="M7.3 20.5l-6.8-5.7L4.1 4.1l3.2 16.4z" fill="#29B6F6"/>
      </svg>
    )
  }

  // Vite
  if (normalized.includes('vite')) {
    return (
      <svg style={style} className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M22.6 3.6L12.7 21.4c-.3.5-1.1.5-1.4 0L1.4 3.6c-.4-.7.2-1.6 1-1.5l8.9 1.1 8.9-1.1c.8-.1 1.4.8 1 1.5z" fill="#BD34FE"/>
        <path d="M16.6 2.3l-4.6 19.1c-.1.5-.8.5-.9 0L6.5 2.3" fill="#FFC920"/>
      </svg>
    )
  }

  // Tailwind
  if (normalized.includes('tailwind')) {
    return (
      <svg style={style} className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19 12.001 19c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" fill="#38BDF8"/>
      </svg>
    )
  }

  // Default doodle check / bullet icon
  return (
    <svg style={style} className={className} viewBox="0 0 24 24" fill="none" stroke="#5e17eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

export default TechLogo
