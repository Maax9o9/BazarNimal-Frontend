import { useState } from 'react'

/** Filtros + página de un listado: cambiar cualquier filtro regresa a la página 1. */
export function useListQuery<F extends object>(initial: F) {
  const [query, setQuery] = useState({ ...initial, page: 1 })
  return {
    query,
    update: (patch: Partial<F>) => setQuery((q) => ({ ...q, ...patch, page: 1 })),
    setPage: (page: number) => setQuery((q) => ({ ...q, page })),
  }
}
