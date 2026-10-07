import type { ReactNode } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

/** Layout del panel: sidebar + contenido. En pantallas chicas el sidebar queda arriba. */
export function AdminLayout({ sidebar }: { sidebar: ReactNode }) {
  const { pathname } = useLocation()
  return (
    <div className="flex min-h-screen flex-col bg-beige-50 lg:flex-row">
      {sidebar}
      <main key={pathname} className="vista min-w-0 flex-1 px-4 py-8 md:px-8 md:py-10 xl:px-12">
        <Outlet />
      </main>
    </div>
  )
}
