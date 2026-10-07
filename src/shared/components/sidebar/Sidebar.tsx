import { Link, NavLink } from '@shared/components/ui/Link'
import type { NavItem, SessionUser } from '@shared/types/navigation'
import { initials } from '@shared/utils/format'
import { Logo } from '../ui/Logo'

type Props = { items: NavItem[]; user: SessionUser | null; onLogout: () => void; loggingOut?: boolean }

export function Sidebar({ items, user, onLogout, loggingOut = false }: Props) {
  return (
    <aside className="flex shrink-0 [view-transition-name:admin-sidebar] flex-col gap-6 bg-cafe-900 px-5 py-6 lg:sticky lg:top-0 lg:h-screen lg:w-[272px] lg:gap-8 lg:py-7">
      <Link to="/" aria-label="BazarNimal, ir al sitio" className="self-start">
        <Logo variant="negative" size="sm" />
      </Link>

      <nav aria-label="Administración" className="flex flex-col gap-1">
        <p className="mb-1 hidden text-sm font-medium tracking-wide text-cafe-500 lg:block">ADMINISTRACIÓN</p>
        <ul className="flex flex-wrap gap-1 lg:flex-col">
          {items.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-xl px-3.5 py-3 text-sm font-medium transition-colors ${
                    isActive ? 'bg-rojo-500 text-beige-50' : 'text-beige-100 hover:bg-white/10'
                  }`
                }
              >
                <span aria-hidden="true" className="size-2 rounded-full bg-current opacity-70" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-2.5 lg:mt-auto">
        <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-full bg-rojo-100 text-sm font-medium text-rojo-700">
          {user ? initials(user.name) : ''}
        </span>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-beige-50">{user?.name ?? 'Administrador'}</span>
          <button
            type="button"
            onClick={onLogout}
            disabled={loggingOut}
            className="self-start text-sm text-beige-300 hover:text-beige-50 hover:underline disabled:opacity-60"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </aside>
  )
}
