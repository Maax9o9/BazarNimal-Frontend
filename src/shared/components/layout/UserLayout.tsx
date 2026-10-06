import type { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from '../footer/Footer'

/** Layout público/usuario: recibe la navbar ya configurada y pinta la página en el Outlet. */
export function UserLayout({ navbar }: { navbar: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {navbar}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
