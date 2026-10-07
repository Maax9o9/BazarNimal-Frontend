/** Página de resultados ya mapeada a entidades del dominio. */
export interface Page<T> {
  items: T[]
  page: number
  limit: number
  total: number
}

export interface PageRequest {
  page: number
  limit: number
}
