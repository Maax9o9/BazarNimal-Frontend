import { useCallback, useEffect, useState } from 'react'
import { errorMessage } from '@shared/utils/errorMessage'

export type AsyncState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string }

type Settled<T> = Exclude<AsyncState<T>, { status: 'loading' }>

/** Carga datos y vuelve a cargar cuando cambian `deps` (valores serializables) o al llamar `reload`. */
export function useAsync<T>(load: () => Promise<T>, deps: unknown[] = []) {
  const [reloads, setReloads] = useState(0)
  const key = JSON.stringify([deps, reloads])
  const [result, setResult] = useState<{ key: string; state: Settled<T> } | null>(null)

  useEffect(() => {
    let active = true
    load().then(
      (data) => active && setResult({ key, state: { status: 'success', data } }),
      (error: unknown) => active && setResult({ key, state: { status: 'error', message: errorMessage(error) } }),
    )
    return () => {
      active = false
    }
    // `key` resume las dependencias de la carga.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const reload = useCallback(() => setReloads((n) => n + 1), [])
  const state: AsyncState<T> = result?.key === key ? result.state : { status: 'loading' }
  return { state, reload }
}
