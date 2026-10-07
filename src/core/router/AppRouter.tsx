import { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider, useNavigate } from 'react-router-dom'
import { adminNavigation } from '@core/navigation/adminNavigation'
import { userNavigation } from '@core/navigation/userNavigation'
import { useSession } from '@features/auth'
import { AdminLayout } from '@shared/components/layout/AdminLayout'
import { UserLayout } from '@shared/components/layout/UserLayout'
import { Navbar } from '@shared/components/navbar/Navbar'
import { Sidebar } from '@shared/components/sidebar/Sidebar'
import { AuthGuard } from './guards/AuthGuard'
import { GuestGuard } from './guards/GuestGuard'
import { RoleGuard } from './guards/RoleGuard'
import * as P from './lazyRoutes'
import { ForbiddenPage } from './pages/ForbiddenPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { RootLayout } from './RootLayout'

function useLogout() {
  const { signOut } = useSession()
  const navigate = useNavigate()
  const [loggingOut, setLoggingOut] = useState(false)
  // Primero se sale de la vista protegida; si se limpiara antes la sesión, AuthGuard mandaría al login.
  const logout = async () => {
    setLoggingOut(true)
    navigate('/', { replace: true, viewTransition: true })
    await signOut()
    setLoggingOut(false)
  }
  return { logout, loggingOut }
}

function SessionNavbar() {
  const { user } = useSession()
  const { logout, loggingOut } = useLogout()
  const links = [...userNavigation.public, ...(user ? userNavigation[user.role] : [])]
  return <Navbar links={links} user={user} onLogout={logout} loggingOut={loggingOut} />
}

function AdminSidebar() {
  const { user } = useSession()
  const { logout, loggingOut } = useLogout()
  return <Sidebar items={adminNavigation} user={user} onLogout={logout} loggingOut={loggingOut} />
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />} hydrateFallbackElement={<div className="min-h-screen bg-beige-50" aria-busy="true" />}>
      <Route element={<UserLayout navbar={<SessionNavbar />} />}>
        <Route index lazy={P.HomePage} />
        <Route path="adopta" lazy={P.PetListPage} />
        <Route path="adopta/:id" lazy={P.PetDetailPage} />
        <Route path="tienda" lazy={P.ProductListPage} />
        <Route path="tienda/:id" lazy={P.ProductDetailPage} />
        <Route path="acceso-denegado" element={<ForbiddenPage />} />
        <Route element={<AuthGuard />}>
          <Route element={<RoleGuard role="user" />}>
            <Route path="mis-solicitudes" lazy={P.MyRequestsPage} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Día de Muertos: misma estructura con la paleta invertida */}
      <Route element={<UserLayout navbar={<SessionNavbar />} theme="muertos" />}>
        <Route path="ofrenda" lazy={P.OfrendaPage} />
        <Route path="ofrenda/:id" lazy={P.PostDetailPage} />
        <Route element={<AuthGuard />}>
          <Route element={<RoleGuard role="user" />}>
            <Route path="ofrenda/nueva" lazy={P.CreatePostPage} />
            <Route path="mis-publicaciones" lazy={P.MyPostsPage} />
          </Route>
        </Route>
      </Route>

      <Route element={<GuestGuard />}>
        <Route path="login" lazy={P.LoginPage} />
        <Route path="registro" lazy={P.RegisterPage} />
      </Route>

      <Route path="admin" element={<AuthGuard />}>
        <Route element={<RoleGuard role="admin" />}>
          <Route element={<AdminLayout sidebar={<AdminSidebar />} />}>
            <Route index element={<Navigate to="mascotas" replace />} />
            <Route path="mascotas" lazy={P.PetAdminListPage} />
            <Route path="mascotas/nueva" lazy={P.PetFormPage} />
            <Route path="mascotas/:id" lazy={P.PetFormPage} />
            <Route path="solicitudes" lazy={P.AdoptionRequestsPage} />
            <Route path="productos" lazy={P.ProductAdminListPage} />
            <Route path="productos/nuevo" lazy={P.ProductFormPage} />
            <Route path="productos/:id" lazy={P.ProductFormPage} />
            <Route path="publicaciones" lazy={P.PostModerationPage} />
          </Route>
        </Route>
      </Route>
    </Route>,
  ),
)

export function AppRouter() {
  return <RouterProvider router={router} />
}
