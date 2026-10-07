import type { NavItem } from '@shared/types/navigation'

/** Menú público y extras según el rol de la sesión. */
export const userNavigation = {
  public: [
    { label: 'Adopta', to: '/adopta' },
    { label: 'Tienda', to: '/tienda' },
    { label: 'Día de Muertos', to: '/ofrenda' },
  ],
  user: [
    { label: 'Mis solicitudes', to: '/mis-solicitudes' },
    { label: 'Mis publicaciones', to: '/mis-publicaciones' },
  ],
  admin: [{ label: 'Panel admin', to: '/admin' }],
} satisfies Record<string, NavItem[]>
