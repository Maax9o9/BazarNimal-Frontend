import type { ReactNode } from 'react'
import { LogoIcon } from './Logo'

type Props = { code: string; title: string; message: string; actions: ReactNode }

export function ErrorScreen({ code, title, message, actions }: Props) {
  return (
    <section className="flex flex-col items-center gap-5 px-4 py-24 text-center">
      <LogoIcon size={80} />
      <p className="font-display text-display font-semibold text-rojo-500">{code}</p>
      <h1 className="font-display text-h1 font-semibold">{title}</h1>
      <p className="max-w-xl text-body-l text-cafe-700">{message}</p>
      <div className="flex flex-wrap justify-center gap-3">{actions}</div>
    </section>
  )
}
