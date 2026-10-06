import type { ReactNode } from 'react'

export function Alert({ children }: { children: ReactNode }) {
  return (
    <div role="alert" className="rounded-xl border border-rojo-300 bg-rojo-50 px-4 py-3 text-sm leading-[1.5] text-rojo-700">
      {children}
    </div>
  )
}
