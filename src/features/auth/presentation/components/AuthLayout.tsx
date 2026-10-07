import type { ReactNode } from 'react'
import { Link } from '@shared/components/ui/Link'
import { Logo } from '@shared/components/ui/Logo'

type AuthLayoutProps = {
  title: string
  subtitle: string
  alternative: ReactNode
  children: ReactNode
}

export function AuthLayout({ title, subtitle, alternative, children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Rejilla 1fr · auto · 1fr: el mensaje queda centrado en la altura del panel sin importar el logo. */}
      <aside className="sticky top-0 hidden h-screen w-[600px] shrink-0 grid-rows-[1fr_auto_1fr] bg-rojo-500 px-16 py-14 lg:grid">
        <Link to="/" aria-label="BazarNimal, inicio" className="self-start justify-self-start">
          <Logo variant="negative" size="lg" />
        </Link>
        <div className="flex flex-col gap-4">
          <p className="font-display text-display font-semibold text-beige-50">Cada adopción cambia dos vidas.</p>
          <p className="text-body-l text-rojo-100">
            Crea tu cuenta para solicitar una adopción o compartir un recuerdo en la ofrenda.
          </p>
        </div>
      </aside>

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="flex w-full max-w-[420px] flex-col gap-5">
          <Link to="/" aria-label="BazarNimal, inicio" className="lg:hidden">
            <Logo />
          </Link>
          <h1 className="font-display text-h1 font-semibold">{title}</h1>
          <p className="leading-[1.6] text-cafe-700">{subtitle}</p>
          {children}
          <p className="flex justify-center gap-1.5 text-sm leading-[1.5] text-cafe-700">{alternative}</p>
        </div>
      </main>
    </div>
  )
}
