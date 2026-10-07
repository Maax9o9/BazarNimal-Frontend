import { ButtonLink } from '@shared/components/ui/Button'
import { ErrorScreen } from '@shared/components/ui/ErrorScreen'

export function ForbiddenPage() {
  return (
    <ErrorScreen
      code="403"
      title="No tienes acceso a esta sección"
      message="Tu cuenta no tiene permisos para ver esta página. Si crees que es un error, contacta al refugio."
      actions={<ButtonLink to="/">Volver al inicio</ButtonLink>}
    />
  )
}
