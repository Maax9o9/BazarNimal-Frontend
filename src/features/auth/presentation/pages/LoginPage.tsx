import { Link } from 'react-router-dom'
import { Alert } from '@shared/components/ui/Alert'
import { Button } from '@shared/components/ui/Button'
import { PasswordField } from '@shared/components/ui/PasswordField'
import { TextField } from '@shared/components/ui/TextField'
import { AuthLayout } from '../components/AuthLayout'
import { useLoginForm } from '../hooks/useLoginForm'

export function LoginPage() {
  const { form, onSubmit, serverError } = useLoginForm()
  const { register, formState } = form
  const { errors, isSubmitting } = formState

  return (
    <AuthLayout
      title="Inicia sesión"
      subtitle="Usa el correo y la contraseña con los que te registraste."
      alternative={
        <>
          ¿No tienes cuenta?
          <Link to="/registro" className="font-medium text-rojo-600 hover:underline">
            Regístrate
          </Link>
        </>
      }
    >
      <form noValidate onSubmit={onSubmit} className="flex flex-col gap-5">
        {serverError && <Alert>{serverError}</Alert>}
        <TextField
          label="Correo electrónico"
          type="email"
          autoComplete="email"
          placeholder="tu@correo.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <PasswordField
          label="Contraseña"
          autoComplete="current-password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password')}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Iniciando sesión…' : 'Iniciar sesión'}
        </Button>
      </form>
    </AuthLayout>
  )
}
