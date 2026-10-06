import { z } from 'zod'
import { emailSchema, passwordSchema, personNameSchema, phoneSchema } from '@shared/validators'

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Ingresa tu contraseña').max(128, 'Máximo 128 caracteres'),
})

export const registerSchema = z
  .object({
    name: personNameSchema,
    email: emailSchema,
    phone: phoneSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Confirma tu contraseña'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Las contraseñas no coinciden',
  })

export type LoginValues = z.input<typeof loginSchema>
export type RegisterValues = z.input<typeof registerSchema>
