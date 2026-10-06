import { useState } from 'react'
import { LogoIcon } from './Logo'

type Props = { src: string | null; alt: string; className?: string }

/** Muestra la URL que devuelve el backend; si no hay o falla, usa el placeholder del diseño. */
export function ImageWithFallback({ src, alt, className = '' }: Props) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div role="img" aria-label={alt} className={`flex items-center justify-center bg-beige-200 ${className}`}>
        <LogoIcon size={58} className="opacity-25" />
      </div>
    )
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />
}
