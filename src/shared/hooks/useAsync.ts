import { useEffect, useState } from 'react'

export type AsyncState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string }

/** Ejecuta una carga al montar y expone los estados de carga, éxito y error. */
export function useAsync<T>(load: () => Promise<T>): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ status: 'loading' })

  useEffect(() => {
    let active = true
    load()
      .then((data) => active && setState({ status: 'success', data }))
      .catch((error: unknown) => {
        const message = error instanceof Error ? error.message : 'No se pudo cargar la información.'
        if (active) setState({ status: 'error', message })
      })
    return () => {
      active = false
    }
    // La carga se ejecuta una sola vez al montar.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return state
}
