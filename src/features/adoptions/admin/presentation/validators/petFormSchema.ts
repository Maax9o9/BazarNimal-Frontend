import { z } from 'zod'
import { imageSchema, requiredText } from '@shared/validators'

const intIn = (min: number, max: number) =>
  z
    .number({ error: 'Ingresa un número' })
    .int('Debe ser un número entero')
    .min(min, `Mínimo ${min}`)
    .max(max, `Máximo ${max}`)

/** En edición la imagen es opcional (si no se elige, se conserva la actual). */
export const petFormSchema = (editing: boolean) =>
  z.object({
    name: requiredText(80, 'Ingresa el nombre'),
    species: z.enum(['dog', 'cat']),
    breed: requiredText(80, 'Ingresa la raza'),
    ageYears: intIn(0, 30),
    ageMonths: intIn(0, 11),
    status: z.enum(['in_adoption', 'adopted']),
    image: imageSchema.nullable().refine((file) => editing || file !== null, 'Selecciona una foto'),
  })

export type PetFormValues = z.input<ReturnType<typeof petFormSchema>>
