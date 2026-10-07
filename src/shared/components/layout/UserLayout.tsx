import type { ReactNode } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from '../footer/Footer'

type Props = { navbar: ReactNode; theme?: 'muertos' }

/** Layout público/usuario. Con `theme="muertos"` la navbar y el contenido usan la paleta invertida. */
export function UserLayout({ navbar, theme }: Props) {
  const { pathname } = useLocation()
  return (
    <div data-page-theme={theme} className="flex min-h-screen flex-col">
      <div data-theme={theme} className="flex flex-1 flex-col bg-beige-50 text-cafe-900">
        {navbar}
        {/* `vista` anima la entrada en navegadores sin View Transitions */}
        <main key={pathname} className="vista flex-1">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}
