export const errorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : 'Ocurrió un error, intenta de nuevo más tarde.'
