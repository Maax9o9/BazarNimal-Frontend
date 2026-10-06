import { isAxiosError, type AxiosInstance } from 'axios'
import { AUTH_ROUTES } from '@routes/auth.routes'
import { ApiError } from './apiError'
import { apiEvents } from './apiEvents'
import { sessionHint } from './sessionHint'

const CSRF_COOKIE = 'csrf_token'
const NO_REFRESH = new Set<string>([AUTH_ROUTES.login, AUTH_ROUTES.register, AUTH_ROUTES.refresh, AUTH_ROUTES.logout])

/** La cookie CSRF (no HttpOnly) solo existe si el backend usa SameSite=None. */
const readCsrfToken = () =>
  document.cookie
    .split('; ')
    .find((c) => c.startsWith(`${CSRF_COOKIE}=`))
    ?.split('=')[1]

export function registerInterceptors(client: AxiosInstance) {
  let refreshing: Promise<unknown> | null = null

  client.interceptors.request.use((config) => {
    const csrf = readCsrfToken()
    if (csrf) config.headers.set('X-CSRF-Token', decodeURIComponent(csrf))
    return config
  })

  client.interceptors.response.use(
    (response) => {
      if (response.config.url === AUTH_ROUTES.login) sessionHint.set(true)
      if (response.config.url === AUTH_ROUTES.logout) sessionHint.set(false)
      return response
    },
    async (error: unknown) => {
      const apiError = ApiError.from(error)
      const config = isAxiosError(error) ? error.config : undefined
      // Un visitante que nunca inició sesión no tiene refresh token: no se gasta el límite de peticiones.
      const canRefresh = config && !config._retried && !NO_REFRESH.has(config.url ?? '') && (!config.silentAuth || sessionHint.get())

      if (apiError.status === 401 && config && canRefresh) {
        // Un solo refresh compartido entre peticiones concurrentes; se reintenta una vez.
        refreshing ??= client.post(AUTH_ROUTES.refresh).finally(() => (refreshing = null))
        try {
          await refreshing
        } catch {
          sessionHint.set(false)
          if (!config.silentAuth) apiEvents.emit({ type: 'unauthorized' })
          throw apiError
        }
        sessionHint.set(true)
        return client.request({ ...config, _retried: true })
      }

      if (apiError.status === 403) apiEvents.emit({ type: 'forbidden' })
      if (apiError.status === 429) apiEvents.emit({ type: 'rate-limited', retryAfter: apiError.retryAfter })
      if (apiError.status >= 500) apiEvents.emit({ type: 'server-error' })
      throw apiError
    },
  )
}
