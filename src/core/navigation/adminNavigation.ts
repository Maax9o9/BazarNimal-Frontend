import type { NavItem } from '@shared/types/navigation'

export const adminNavigation: NavItem[] = [
  { label: 'Mascotas', to: '/admin/mascotas' },
  { label: 'Solicitudes de adopción', to: '/admin/solicitudes' },
  { label: 'Productos', to: '/admin/productos' },
  { label: 'Publicaciones', to: '/admin/publicaciones' },
]

/** Pantalla inicial según el rol (después del login). */
export const homeFor = (role: 'user' | 'admin') => (role === 'admin' ? '/admin/mascotas' : '/')
