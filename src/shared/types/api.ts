/** Formato estándar de respuesta del backend. */
export interface ApiResponse<T> {
  success: true
  data: T
  message: string | null
}

export interface PaginatedResponse<T> {
  success: true
  data: T[]
  meta: { page: number; limit: number; total: number }
}
