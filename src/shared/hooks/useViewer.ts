import { createContext, useContext } from 'react'

/** Quién está viendo la página. Lo provee core desde la sesión, así las features no dependen de `auth`. */
export interface Viewer {
  status: 'loading' | 'authenticated' | 'anonymous'
  user: { id: string; name: string; role: 'user' | 'admin' } | null
}

export const ViewerContext = createContext<Viewer>({ status: 'loading', user: null })

export const useViewer = () => useContext(ViewerContext)
