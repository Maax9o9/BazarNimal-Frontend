import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useInject } from '@core/di/useInject'
import { applyServerErrors } from '@shared/utils/serverErrors'
import { PASSWORD_RULES } from '@shared/validators'
import { AUTH_TOKENS } from '../../di/tokens'
import { useSession } from '../state/SessionContext'
import { registerSchema } from '../validators/authSchemas'

export function useRegisterForm() {
  const register = useInject(AUTH_TOKENS.register)
  const login = useInject(AUTH_TOKENS.login)
  const { signIn } = useSession()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState<string | null>(null)
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', phone: '', password: '', confirmPassword: '' },
  })

  const onSubmit = form.handleSubmit(async ({ name, email, phone, password }) => {
    const newUser = { name, email, phone, password }
    setServerError(null)
    try {
      await register.execute(newUser)
      // El registro no abre sesión: se inicia con las mismas credenciales.
      signIn(await login.execute({ email: newUser.email, password: newUser.password }))
      navigate('/', { replace: true })
    } catch (error) {
      setServerError(applyServerErrors(error, ['name', 'email', 'phone', 'password'], form.setError))
    }
  })

  // Requisitos en vivo bajo los campos de contraseña.
  const [password, confirmPassword] = useWatch({ control: form.control, name: ['password', 'confirmPassword'] })
  const passwordRequirements = PASSWORD_RULES.map((rule) => ({ label: rule.label, met: rule.test(password) }))
  const confirmRequirements = [{ label: 'Las contraseñas coinciden', met: confirmPassword !== '' && confirmPassword === password }]

  return { form, onSubmit, serverError, passwordRequirements, confirmRequirements }
}
