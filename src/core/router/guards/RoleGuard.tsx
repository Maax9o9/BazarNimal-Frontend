import { Navigate, Outlet } from 'react-router-dom'
import { useSession } from '@features/auth'

/** Restringe por rol. Solo es UX: la autorización real la valida el backend. Va dentro de AuthGuard. */
export function RoleGuard({ role }: { role: 'user' | 'admin' }) {
  const { user } = useSession()
  return user?.role === role ? <Outlet /> : <Navigate to="/acceso-denegado" replace />
}
