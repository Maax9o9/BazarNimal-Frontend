import axios from 'axios'
import { env } from '@core/config/env'
import { registerInterceptors } from './interceptors'

declare module 'axios' {
  interface AxiosRequestConfig {
    /** Petición de sondeo (p. ej. /auth/me): un 401 no redirige al login. */
    silentAuth?: boolean
    _retried?: boolean
  }
}

/** Cliente HTTP único de la app. Las cookies HttpOnly viajan con withCredentials. */
export const httpClient = axios.create({
  baseURL: env.apiBaseUrl,
  withCredentials: true,
  timeout: env.apiTimeoutMs,
  headers: { 'Content-Type': 'application/json' },
})

registerInterceptors(httpClient)
