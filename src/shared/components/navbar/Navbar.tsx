import { Link } from 'react-router-dom'
import type { NavItem, SessionUser } from '@shared/types/navigation'
import { Button, ButtonLink } from '../ui/Button'
import { Logo, LogoIcon } from '../ui/Logo'

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

export function Navbar({ links, user, onLogout, loggingOut = false }: NavbarProps) {
  return (
    <header className="border-b border-beige-200 bg-beige-50">
      <nav aria-label="Principal" className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-6 px-4 md:px-20">
        <Link to="/" aria-label="BazarNimal, inicio">
          <LogoIcon size={40} className="sm:hidden" />
          <span className="hidden sm:block">
            <Logo />
          </span>
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

        {user ? (
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-full bg-rojo-100 text-sm font-medium text-rojo-700">
              {initials(user.name)}
            </span>
            <span className="hidden text-sm font-medium sm:inline">Hola, {user.name.split(' ')[0]}</span>
            <Button variant="ghost" onClick={onLogout} disabled={loggingOut}>
              Cerrar sesión
            </Button>
          </div>
        ) : (
          <div className="flex gap-3">
            <span className="hidden sm:block">
              <ButtonLink to="/login" variant="secondary">
                Iniciar sesión
              </ButtonLink>
            </span>
            <ButtonLink to="/registro">Crear cuenta</ButtonLink>
          </div>
        )}
      </nav>
    </header>
  )
}
