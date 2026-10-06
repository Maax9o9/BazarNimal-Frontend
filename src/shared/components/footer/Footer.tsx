import { Logo } from '../ui/Logo'

export function Footer() {
  return (
    <footer className="bg-cafe-900">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-6 px-4 py-12 text-center text-sm leading-[1.5] text-beige-300 md:flex-row md:justify-between md:px-20 md:text-left">
        <Logo variant="negative" size="sm" />
        <p>Adopción responsable de perros y gatos · Tienda · Día de Muertos</p>
        <p>Maximiliano Cundapi</p>
      </div>
    </footer>
  )
}
