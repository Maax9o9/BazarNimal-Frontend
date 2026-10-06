import { Navigate, Outlet } from 'react-router-dom'
import { useSession } from '@features/auth'

/** Login y registro solo para visitantes: con sesión activa se regresa al inicio. */
export function GuestGuard() {
  const { status } = useSession()
  if (status === 'loading') return null
  return status === 'authenticated' ? <Navigate to="/" replace /> : <Outlet />
}
