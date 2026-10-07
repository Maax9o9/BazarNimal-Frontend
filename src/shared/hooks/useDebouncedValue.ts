import { useEffect, useState } from 'react'

/** Devuelve `value` tras `delay` ms sin cambios (buscadores: evita una petición por tecla). */
export function useDebouncedValue<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}
