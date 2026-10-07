import { useState } from 'react'
import { errorMessage } from '@shared/utils/errorMessage'

/** Ejecuta una acción (crear, borrar, aprobar…) exponiendo `busy` para deshabilitar botones y evitar dobles envíos. */
export function useAction<A extends unknown[]>(action: (...args: A) => Promise<unknown>) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const run = async (...args: A): Promise<boolean> => {
    setBusy(true)
    setError(null)
    try {
      await action(...args)
      return true
    } catch (e) {
      setError(errorMessage(e))
      return false
    } finally {
      setBusy(false)
    }
  }

  return { run, busy, error, clearError: () => setError(null) }
}
