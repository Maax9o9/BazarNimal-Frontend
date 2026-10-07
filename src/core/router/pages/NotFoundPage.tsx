import { ButtonLink } from '@shared/components/ui/Button'
import { ErrorScreen } from '@shared/components/ui/ErrorScreen'

export function NotFoundPage() {
  return (
    <ErrorScreen
      code="404"
      title="Esta página se escapó"
      message="No encontramos lo que buscas. Puede que el enlace esté roto o la página ya no exista."
      actions={
        <>
          <ButtonLink to="/">Volver al inicio</ButtonLink>
          <ButtonLink to="/adopta" variant="secondary">
            Ver mascotas
          </ButtonLink>
        </>
      }
    />
  )
}
