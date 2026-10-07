import { z } from 'zod'
import { imageSchema, requiredText } from '@shared/validators'

export const POST_MAX_LENGTH = 1000

export const postFormSchema = z.object({
  content: requiredText(POST_MAX_LENGTH, 'Escribe unas palabras para recordarla'),
  image: imageSchema.nullable().refine((file) => file !== null, 'Selecciona una foto de tu mascota'),
})
