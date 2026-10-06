import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiEvents, type ApiEvent } from '@core/api/apiEvents'
import { useSession } from '@features/auth'
import { Notice } from '@shared/components/ui/Notice'

const noticeFor = (event: ApiEvent): string | null => {
  if (event.type === 'rate-limited') {
    const wait = event.retryAfter ? ` Intenta de nuevo en ${event.retryAfter} s.` : ' Intenta más tarde.'
    return `Demasiadas peticiones.${wait}`
  }
  if (event.type === 'server-error') return 'Ocurrió un error en el servidor. Intenta de nuevo más tarde.'
  if (event.type === 'unauthorized') return 'Tu sesión expiró. Inicia sesión de nuevo.'
  return null
}

/** Traduce los eventos globales del cliente HTTP (401, 403, 429, 5xx) en navegación y avisos. */
export function ApiEventsListener() {
  const navigate = useNavigate()
  const { clear } = useSession()
  const [notice, setNotice] = useState<string | null>(null)

  useEffect(
    () =>
      apiEvents.subscribe((event) => {
        if (event.type === 'unauthorized') {
          clear()
          navigate('/login', { replace: true })
        }
        // Mientras no exista la vista de "acceso denegado", se regresa al inicio.
        if (event.type === 'forbidden') navigate('/', { replace: true })
        setNotice(noticeFor(event))
      }),
    [clear, navigate],
  )

  useEffect(() => {
    if (!notice) return
    const timer = setTimeout(() => setNotice(null), 6000)
    return () => clearTimeout(timer)
  }, [notice])

  return notice ? <Notice message={notice} onClose={() => setNotice(null)} /> : null
}
