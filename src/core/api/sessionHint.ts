/**
 * Pista booleana de "hubo sesión en este navegador". NO es un token ni da acceso a nada:
 * solo evita intentar /auth/refresh en cada visita anónima (el backend lo limita junto con el login).
 */
const KEY = 'bn_had_session'

export const sessionHint = {
  get: (): boolean => {
    try {
      return localStorage.getItem(KEY) === '1'
    } catch {
      return true // sin almacenamiento disponible, se intenta el refresh como antes
    }
  },
  set: (value: boolean) => {
    try {
      if (value) localStorage.setItem(KEY, '1')
      else localStorage.removeItem(KEY)
    } catch {
      /* almacenamiento bloqueado: se ignora */
    }
  },
}
