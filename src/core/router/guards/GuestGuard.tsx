import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { homeFor } from '@core/navigation/adminNavigation'
import { useSession } from '@features/auth'

/**
 * Login y registro solo para visitantes. En cuanto hay sesión (incluido justo después de iniciarla)
 * redirige: a la ruta que el usuario pedía si corresponde a su rol, o a la pantalla de su rol.
 */
export function GuestGuard() {
  const { status, user } = useSession()
  const from = (useLocation().state as { from?: string } | null)?.from
  if (status === 'loading') return null
  if (!user) return <Outlet />
  const fitsRole = from !== undefined && from.startsWith('/admin') === (user.role === 'admin')
  return <Navigate to={fitsRole ? from : homeFor(user.role)} replace />
}
