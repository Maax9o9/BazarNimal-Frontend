import { useId, useState, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import type { NavItem, SessionUser } from '@shared/types/navigation'
import { Button, ButtonLink } from '../ui/Button'
import { Logo } from '../ui/Logo'

type NavbarProps = {
  links: NavItem[]
  user: SessionUser | null
  onLogout: () => void
  loggingOut?: boolean
}

const initials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')

/** Acciones de sesión; en móvil se apilan a lo ancho dentro del menú. */
function SessionActions({ user, onLogout, loggingOut, stacked }: Omit<NavbarProps, 'links'> & { stacked?: boolean }) {
  const full = stacked ? 'w-full' : ''

  if (user) {
    return (
      <div className={`flex items-center gap-3 ${stacked ? 'flex-wrap' : ''}`}>
        <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-full bg-rojo-100 text-sm font-medium text-rojo-700">
          {initials(user.name)}
        </span>
        <span className="text-sm font-medium">Hola, {user.name.split(' ')[0]}</span>
        <Button variant="ghost" onClick={onLogout} disabled={loggingOut} className={full}>
          Cerrar sesión
        </Button>
      </div>
    )
  }
  return (
    <div className={`flex gap-3 ${stacked ? 'flex-col' : ''}`}>
      <ButtonLink to="/login" variant="secondary" className={full}>
        Iniciar sesión
      </ButtonLink>
      <ButtonLink to="/registro" className={full}>
        Crear cuenta
      </ButtonLink>
    </div>
  )
}

export function Navbar({ links, ...session }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const menuId = useId()

  // Cualquier enlace o botón del menú móvil lo cierra al usarse.
  const closeOnAction = (event: MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('a, button')) setOpen(false)
  }

  return (
    <header className="border-b border-beige-200 bg-beige-50">
      <nav aria-label="Principal" className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-6 px-4 md:px-20">
        <Link to="/" aria-label="BazarNimal, inicio">
          <Logo />
        </Link>

        <ul className="hidden gap-9 text-sm font-medium leading-[1.4] md:flex">
          {links.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className="hover:text-rojo-600">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <SessionActions {...session} />
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          className="flex size-11 items-center justify-center rounded-xl text-cafe-900 hover:bg-beige-100 focus-visible:outline-2 focus-visible:outline-rojo-500 md:hidden"
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d={open ? 'M6 6l12 12M18 6 6 18' : 'M4 7h16M4 12h16M4 17h16'} />
          </svg>
        </button>
      </nav>

      {open && (
        <div id={menuId} onClick={closeOnAction} className="flex flex-col gap-6 border-t border-beige-200 px-4 pb-6 pt-4 md:hidden">
          <ul className="flex flex-col font-medium">
            {links.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="block rounded-xl px-3 py-3 hover:bg-beige-100">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <SessionActions {...session} stacked />
        </div>
      )}
    </header>
  )
}
