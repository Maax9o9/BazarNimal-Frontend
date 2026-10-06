import type { NavItem } from '@shared/types/navigation'

/** Menú del usuario. Mientras no existan sus vistas, apunta a las secciones del inicio. */
export const userNavigation: NavItem[] = [
  { label: 'Adopta', to: '/#adopta' },
  { label: 'Tienda', to: '/#tienda' },
  { label: 'Día de Muertos', to: '/#ofrenda' },
]
