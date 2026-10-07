import { Link as RouterLink, NavLink as RouterNavLink, type LinkProps, type NavLinkProps } from 'react-router-dom'

/** Enlaces internos con transición suave entre vistas (View Transitions API) activada por defecto. */
export function Link(props: LinkProps) {
  return <RouterLink viewTransition {...props} />
}

export function NavLink(props: NavLinkProps) {
  return <RouterNavLink viewTransition {...props} />
}
