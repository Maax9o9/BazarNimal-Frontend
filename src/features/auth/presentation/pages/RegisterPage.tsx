import { Link } from 'react-router-dom'
import { Alert } from '@shared/components/ui/Alert'
import { Button } from '@shared/components/ui/Button'
import { PasswordField } from '@shared/components/ui/PasswordField'
import { TextField } from '@shared/components/ui/TextField'
import { AuthLayout } from '../components/AuthLayout'
import { useRegisterForm } from '../hooks/useRegisterForm'

/** Los errores del esquema ya se ven en la lista de requisitos; solo los del backend se muestran como texto. */
const serverMessage = (error?: { type?: string; message?: string }) => (error?.type === 'server' ? error.message : undefined)

export function RegisterPage() {
  const { form, onSubmit, serverError, passwordRequirements, confirmRequirements } = useRegisterForm()
  const { register, formState } = form
  const { errors, isSubmitting, isSubmitted } = formState

  return (
    <AuthLayout
      title="Crea tu cuenta"
      subtitle="Solo te pediremos lo necesario para contactarte sobre tu adopción."
      alternative={
        <>
          ¿Ya tienes cuenta?
          <Link to="/login" className="font-medium text-rojo-600 hover:underline">
            Inicia sesión
          </Link>
        </>
      }
    >
      <form noValidate onSubmit={onSubmit} className="flex flex-col gap-5">
        {serverError && <Alert>{serverError}</Alert>}
        <TextField label="Nombre completo" autoComplete="name" placeholder="Ana López" error={errors.name?.message} {...register('name')} />
        <TextField
          label="Correo electrónico"
          type="email"
          autoComplete="email"
          placeholder="ana@correo.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <TextField
          label="Teléfono"
          type="tel"
          autoComplete="tel"
          placeholder="55 1234 5678"
          error={errors.phone?.message}
          {...register('phone')}
        />
        <PasswordField
          label="Contraseña"
          autoComplete="new-password"
          placeholder="••••••••"
          requirements={passwordRequirements}
          showRequirementErrors={isSubmitted}
          invalid={Boolean(errors.password)}
          error={serverMessage(errors.password)}
          {...register('password')}
        />
        <PasswordField
          label="Confirmar contraseña"
          autoComplete="new-password"
          placeholder="••••••••"
          requirements={confirmRequirements}
          showRequirementErrors={isSubmitted}
          invalid={Boolean(errors.confirmPassword)}
          {...register('confirmPassword')}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Creando cuenta…' : 'Crear cuenta'}
        </Button>
      </form>
    </AuthLayout>
  )
}
