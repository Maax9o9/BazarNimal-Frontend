import type { ReactNode } from 'react'

type Props = { title: string; subtitle?: ReactNode; action?: ReactNode; kicker?: ReactNode }

export function PageHeader({ title, subtitle, action, kicker }: Props) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-col gap-2">
        {kicker}
        <h1 className="font-display text-h1 font-semibold">{title}</h1>
        {subtitle && <p className="text-body-l text-cafe-700">{subtitle}</p>}
      </div>
      {action}
    </header>
  )
}
