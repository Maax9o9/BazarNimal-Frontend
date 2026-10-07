import type { ReactNode } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { SessionProvider, useSession } from '@features/auth'
import { ViewerContext } from '@shared/hooks/useViewer'
import { ApiEventsListener } from './ApiEventsListener'

/** Expone a las features quién está viendo la página sin que dependan de `auth`. */
function ViewerBridge({ children }: { children: ReactNode }) {
  const { status, user } = useSession()
  return <ViewerContext.Provider value={{ status, user }}>{children}</ViewerContext.Provider>
}

/** Raíz de todas las rutas: sesión, visor, eventos globales de la API y scroll al cambiar de vista. */
export function RootLayout() {
  return (
    <SessionProvider>
      <ViewerBridge>
        <ApiEventsListener />
        <Outlet />
        <ScrollRestoration />
      </ViewerBridge>
    </SessionProvider>
  )
}
