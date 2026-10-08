export const env = {
  /**
   * Por defecto la API se pide al mismo origen (`/api/v1`): en desarrollo la reenvía el proxy de Vite
   * y en Vercel el rewrite de `vercel.json`. Así viajan las cookies HttpOnly con SameSite=Strict.
   */
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  apiTimeoutMs: 10_000,
} as const
