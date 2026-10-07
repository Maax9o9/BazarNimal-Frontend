import type { ReactNode } from 'react'

const TONES = {
  success: 'bg-exito-bg text-exito',
  neutral: 'bg-beige-200 text-cafe-700',
  warning: 'bg-pendiente-bg text-pendiente',
  danger: 'bg-rojo-100 text-rojo-700',
} as const

export type BadgeTone = keyof typeof TONES

export function Badge({ tone, children }: { tone: BadgeTone; children: ReactNode }) {
  return (
    <span className={`inline-flex shrink-0 rounded-full px-3 py-1 text-sm font-medium leading-[1.4] ${TONES[tone]}`}>
      {children}
    </span>
  )
}
