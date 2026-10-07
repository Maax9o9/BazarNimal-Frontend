import { ButtonLink } from '@shared/components/ui/Button'
import { useViewer } from '@shared/hooks/useViewer'

/** "Compartir recuerdo": sin sesión lleva al login y regresa al formulario; los admin no publican. */
export function ShareButton() {
  const { user } = useViewer()
  if (user?.role === 'admin') return null
  return (
    <ButtonLink to={user ? '/ofrenda/nueva' : '/login'} state={user ? undefined : { from: '/ofrenda/nueva' }} variant="secondary">
      Compartir recuerdo
    </ButtonLink>
  )
}
