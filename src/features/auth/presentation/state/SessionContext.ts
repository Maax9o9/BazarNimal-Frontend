import { createContext, useContext } from 'react'
import type { User } from '../../domain/entities/User'

export interface SessionValue {
  status: 'loading' | 'authenticated' | 'anonymous'
  user: User | null
  signIn: (user: User) => void
  signOut: () => Promise<void>
  /** Limpia la sesión local sin llamar al backend (p. ej. cuando el refresh falla). */
  clear: () => void
}

export const SessionContext = createContext<SessionValue | null>(null)

export function useSession(): SessionValue {
  const session = useContext(SessionContext)
  if (!session) throw new Error('useSession debe usarse dentro de <SessionProvider>')
  return session
}
