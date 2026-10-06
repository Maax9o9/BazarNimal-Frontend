import type { FieldValues, Path, UseFormSetError } from 'react-hook-form'

interface ServerError {
  status: number
  message: string
  fieldErrors: Record<string, string>
}

const isServerError = (error: unknown): error is ServerError =>
  error instanceof Error && 'fieldErrors' in error && typeof error.fieldErrors === 'object'

/**
 * Coloca los errores de validación del backend junto a cada campo y devuelve
 * el mensaje general a mostrar arriba del formulario (o null si todo cayó en campos).
 */
export function applyServerErrors<T extends FieldValues>(
  error: unknown,
  fields: readonly Path<T>[],
  setError: UseFormSetError<T>,
): string | null {
  if (!isServerError(error)) return 'Ocurrió un error, intenta de nuevo más tarde.'
  // 429 y 5xx ya se avisan de forma global (con el tiempo de espera de Retry-After).
  if (error.status === 429 || error.status >= 500) return null

  const matched = fields.filter((field) => error.fieldErrors[field])
  matched.forEach((field) => setError(field, { type: 'server', message: error.fieldErrors[field] }))
  return matched.length > 0 ? null : error.message
}
