import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSession } from '@features/auth'

/** Exige sesión activa (consultada en /auth/me). Sin sesión, manda al login y recuerda la ruta. */
export function AuthGuard() {
  const { status } = useSession()
  const location = useLocation()
  if (status === 'loading') return <div aria-busy="true" className="min-h-[60vh]" />
  if (status === 'anonymous') return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return <Outlet />
}
