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
 * `fields` es la lista de campos o un mapa { campoBackend: campoFormulario } si los nombres difieren.
 */
export function applyServerErrors<T extends FieldValues>(
  error: unknown,
  fields: readonly Path<T>[] | Partial<Record<string, Path<T>>>,
  setError: UseFormSetError<T>,
): string | null {
  if (!isServerError(error)) return 'Ocurrió un error, intenta de nuevo más tarde.'
  // 429 y 5xx ya se avisan de forma global (con el tiempo de espera de Retry-After).
  if (error.status === 429 || error.status >= 500) return null

  const map: Partial<Record<string, Path<T>>> = Array.isArray(fields)
    ? Object.fromEntries(fields.map((f) => [f, f]))
    : (fields as Partial<Record<string, Path<T>>>)
  let matched = 0
  for (const [backendField, message] of Object.entries(error.fieldErrors)) {
    const formField = map[backendField]
    if (!formField) continue
    setError(formField, { type: 'server', message })
    matched++
  }
  return matched > 0 ? null : error.message
}
