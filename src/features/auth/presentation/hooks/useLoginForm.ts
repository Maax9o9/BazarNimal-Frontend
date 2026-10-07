import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useInject } from '@core/di/useInject'
import { applyServerErrors } from '@shared/utils/serverErrors'
import { AUTH_TOKENS } from '../../di/tokens'
import { useSession } from '../state/SessionContext'
import { loginSchema } from '../validators/authSchemas'

/** Al iniciar sesión solo se actualiza la sesión; la redirección por rol la decide el router (GuestGuard). */
export function useLoginForm() {
  const login = useInject(AUTH_TOKENS.login)
  const { signIn } = useSession()
  const [serverError, setServerError] = useState<string | null>(null)
  const form = useForm({ resolver: zodResolver(loginSchema), defaultValues: { email: '', password: '' } })

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError(null)
    try {
      signIn(await login.execute(values))
    } catch (error) {
      setServerError(applyServerErrors(error, ['email', 'password'], form.setError))
    }
  })

  return { form, onSubmit, serverError }
}
