import type { PaginatedResponse } from '@shared/types/api'
import type { Page } from '@shared/types/pagination'

/** Convierte la respuesta paginada del backend en una Page de entidades. */
export const toPage = <D, E>(response: PaginatedResponse<D>, map: (dto: D) => E): Page<E> => ({
  items: response.data.map(map),
  ...response.meta,
})

/** Quita filtros vacíos para no mandarlos como query params. */
export const cleanParams = <T extends object>(params: T): Partial<T> =>
  Object.fromEntries(Object.entries(params).filter(([, v]) => v !== '' && v !== undefined && v !== null)) as Partial<T>

/** Cuerpo multipart/form-data para formularios con imagen. */
export const toFormData = (fields: Record<string, string | number | File | null | undefined>) => {
  const form = new FormData()
  for (const [key, value] of Object.entries(fields)) {
    if (value === null || value === undefined) continue
    form.append(key, value instanceof File ? value : String(value))
  }
  return form
}

export const MULTIPART = { headers: { 'Content-Type': 'multipart/form-data' } } as const
