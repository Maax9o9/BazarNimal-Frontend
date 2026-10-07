/** Estatus de revisión que comparten solicitudes de adopción y publicaciones. */
export type ReviewStatus = 'pending' | 'approved' | 'rejected'

export const REVIEW_STATUS = {
  pending: { label: 'Pendiente', tone: 'warning' },
  approved: { label: 'Aprobada', tone: 'success' },
  rejected: { label: 'Rechazada', tone: 'danger' },
} as const

export const REVIEW_TABS: { value: ReviewStatus | ''; label: string }[] = [
  { value: 'pending', label: 'Pendientes' },
  { value: 'approved', label: 'Aprobadas' },
  { value: 'rejected', label: 'Rechazadas' },
  { value: '', label: 'Todas' },
]
