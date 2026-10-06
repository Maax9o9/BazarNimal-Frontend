import { isAxiosError } from 'axios'

interface ErrorBody {
  message?: string
  errors?: { field: string; message: string }[]
}

const GENERIC_MESSAGE = 'Ocurrió un error, intenta de nuevo más tarde.'

/** Error único de la app: nunca expone detalles técnicos al usuario. */
export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly fieldErrors: Record<string, string> = {},
    readonly retryAfter?: number,
  ) {
    super(message)
    this.name = 'ApiError'
  }

  static from(error: unknown): ApiError {
    if (error instanceof ApiError) return error
    if (!isAxiosError<ErrorBody>(error)) return new ApiError(0, GENERIC_MESSAGE)
    if (!error.response) {
      const message =
        error.code === 'ECONNABORTED' ? 'El servidor tardó demasiado en responder.' : 'No se pudo conectar con el servidor.'
      return new ApiError(0, message)
    }

    const { status, data, headers } = error.response
    if (status >= 500) return new ApiError(status, GENERIC_MESSAGE)

    const fieldErrors = Object.fromEntries((data?.errors ?? []).map((e) => [e.field, e.message]))
    const retryAfter = Number(headers['retry-after']) || undefined
    return new ApiError(status, data?.message ?? GENERIC_MESSAGE, fieldErrors, retryAfter)
  }
}
