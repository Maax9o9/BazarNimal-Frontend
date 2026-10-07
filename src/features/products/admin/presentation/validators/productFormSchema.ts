import { z } from 'zod'
import { imageSchema, requiredText } from '@shared/validators'

const optional = (re: RegExp, message: string, check: (n: number) => boolean, range: string) =>
  z
    .string()
    .trim()
    .refine((v) => v === '' || re.test(v), message)
    .refine((v) => v === '' || check(Number(v)), range)

export const productFormSchema = (editing: boolean) =>
  z.object({
    name: requiredText(120, 'Ingresa el nombre'),
    weightKg: optional(/^\d+(\.\d{1,3})?$/, 'Usa un número con máximo 3 decimales (ej. 2.5)', (n) => n > 0 && n <= 99999.999, 'Debe ser mayor a 0 y menor a 100,000'),
    pieces: optional(/^\d+$/, 'Debe ser un número entero', (n) => n >= 1 && n <= 1_000_000, 'Entre 1 y 1,000,000'),
    status: z.enum(['available', 'unavailable']),
    image: imageSchema.nullable().refine((file) => editing || file !== null, 'Selecciona una imagen'),
  })
