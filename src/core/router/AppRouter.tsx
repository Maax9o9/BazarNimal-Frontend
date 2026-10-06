import { Suspense, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { userNavigation } from '@core/navigation/userNavigation'
import { useSession } from '@features/auth'
import { UserLayout } from '@shared/components/layout/UserLayout'
import { Navbar } from '@shared/components/navbar/Navbar'
import { GuestGuard } from './guards/GuestGuard'
import { HomePage, LoginPage, RegisterPage } from './lazyRoutes'

function SessionNavbar() {
  const { user, signOut } = useSession()
  const [loggingOut, setLoggingOut] = useState(false)

  const logout = () => {
    setLoggingOut(true)
    signOut().finally(() => setLoggingOut(false))
  }
  return <Navbar links={userNavigation} user={user} onLogout={logout} loggingOut={loggingOut} />
}

export function AppRouter() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-beige-50" aria-busy="true" />}>
      <Routes>
        <Route element={<UserLayout navbar={<SessionNavbar />} />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route element={<GuestGuard />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
