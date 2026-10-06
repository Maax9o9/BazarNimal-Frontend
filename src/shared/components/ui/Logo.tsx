import gato from '@shared/assets/logo/gato.svg'
import perro from '@shared/assets/logo/perro.svg'

/** Isotipo: perro y gato en pixel art sobre el cuadro rojo (proporciones del componente de Figma). */
export function LogoIcon({ size = 48, className = '' }: { size?: number; className?: string }) {
  const art = size * 0.573
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center bg-rojo-500 ${className}`}
      style={{ width: size, height: size, borderRadius: size * 0.21 }}
    >
      <span className="flex" style={{ marginTop: size * 0.05 }}>
        <img src={perro} alt="" style={{ height: art }} />
        <img src={gato} alt="" style={{ height: art }} />
      </span>
    </span>
  )
}

const SIZES = {
  sm: { icon: 40, text: 'text-2xl', pill: 'gap-2.5 px-4 py-3' },
  md: { icon: 46, text: 'text-[1.7rem]', pill: 'gap-3 px-4 py-3' },
  lg: { icon: 58, text: 'text-[2.125rem]', pill: 'gap-3.5 py-4 pr-6' },
} as const

type LogoProps = { variant?: 'default' | 'negative'; size?: keyof typeof SIZES }

/** Logotipo: isotipo + "BazarNimal". La versión negativa va sobre fondo rojo. */
export function Logo({ variant = 'default', size = 'md' }: LogoProps) {
  const s = SIZES[size]
  const word = `font-display font-bold tracking-[-0.015em] ${s.text}`

  if (variant === 'negative') {
    return (
      <span className={`inline-flex items-center rounded-2xl bg-rojo-500 ${s.pill}`}>
        <LogoIcon size={s.icon} />
        <span className={`${word} text-beige-50`}>BazarNimal</span>
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-3">
      <LogoIcon size={s.icon} />
      <span className={word}>
        <span className="text-cafe-900">Bazar</span>
        <span className="text-rojo-500">Nimal</span>
      </span>
    </span>
  )
}
