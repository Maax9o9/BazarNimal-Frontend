import { z } from 'zod'

/** Reglas reutilizables (espejo de las del backend). Mejoran la UX; la validación real es del backend. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const NAME_RE = /^\p{L}+(?:[ '.-]\p{L}+)*\.?$/u
const PHONE_RE = /^\+?[0-9]{10,15}$/

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, 'Ingresa tu correo')
  .max(254, 'Máximo 254 caracteres')
  .regex(EMAIL_RE, 'El formato del correo no es válido')

/** Política de contraseña: la usan el esquema y la lista de requisitos que ve el usuario. */
export const PASSWORD_RULES = [
  { label: 'Al menos 8 caracteres', test: (v: string) => v.length >= 8 },
  { label: 'Una letra mayúscula', test: (v: string) => /[A-Z]/.test(v) },
  { label: 'Una letra minúscula', test: (v: string) => /[a-z]/.test(v) },
  { label: 'Un número', test: (v: string) => /[0-9]/.test(v) },
  { label: 'Un símbolo (por ejemplo # $ !)', test: (v: string) => /[^A-Za-z0-9]/.test(v) },
] as const

export const passwordSchema = PASSWORD_RULES.reduce(
  (schema, rule) => schema.refine(rule.test, `Falta: ${rule.label.toLowerCase()}`),
  z.string().max(128, 'Máximo 128 caracteres'),
)

export const personNameSchema = z
  .string()
  .trim()
  .overwrite((value) => value.replace(/\s+/g, ' '))
  .min(2, 'Debe tener al menos 2 caracteres')
  .max(100, 'Máximo 100 caracteres')
  .regex(NAME_RE, 'Solo letras, espacios, apóstrofos, puntos y guiones')

export const phoneSchema = z
  .string()
  .overwrite((value) => value.replace(/[\s\-()]/g, ''))
  .regex(PHONE_RE, 'El teléfono debe tener entre 10 y 15 dígitos')
