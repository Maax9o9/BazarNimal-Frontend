import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useInject } from '@core/di/useInject'
import type { User } from '../../domain/entities/User'
import { AUTH_TOKENS } from '../../di/tokens'
import { SessionContext, type SessionValue } from './SessionContext'

/** La sesión vive en cookies HttpOnly: aquí solo se guarda el usuario que devuelve /auth/me. */
export function SessionProvider({ children }: { children: ReactNode }) {
  const getCurrentUser = useInject(AUTH_TOKENS.getCurrentUser)
  const logout = useInject(AUTH_TOKENS.logout)
  const [user, setUser] = useState<User | null>(null)
  const [status, setStatus] = useState<SessionValue['status']>('loading')

  useEffect(() => {
    getCurrentUser
      .execute()
      .then((current) => {
        setUser(current)
        setStatus(current ? 'authenticated' : 'anonymous')
      })
      .catch(() => setStatus('anonymous'))
  }, [getCurrentUser])

  const signIn = useCallback((signedIn: User) => {
    setUser(signedIn)
    setStatus('authenticated')
  }, [])

  const clear = useCallback(() => {
    setUser(null)
    setStatus('anonymous')
  }, [])

  const signOut = useCallback(async () => {
    try {
      await logout.execute()
    } finally {
      clear()
    }
  }, [logout, clear])

  const value = useMemo(() => ({ status, user, signIn, signOut, clear }), [status, user, signIn, signOut, clear])
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}
