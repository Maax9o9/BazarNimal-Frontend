import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useInject } from '@core/di/useInject'
import { applyServerErrors } from '@shared/utils/serverErrors'
import type { AdminPet } from '../../domain/entities/AdminPet'
import { ADOPTIONS_ADMIN_TOKENS } from '../../di/tokens'
import { petFormSchema } from '../validators/petFormSchema'

const SERVER_FIELDS = {
  name: 'name',
  species: 'species',
  breed: 'breed',
  age_years: 'ageYears',
  age_months: 'ageMonths',
  status: 'status',
  image: 'image',
} as const

/** Alta o edición de mascota (si llega `pet`, se edita). */
export function usePetForm(pet?: AdminPet) {
  const createPet = useInject(ADOPTIONS_ADMIN_TOKENS.createPet)
  const updatePet = useInject(ADOPTIONS_ADMIN_TOKENS.updatePet)
  const navigate = useNavigate()
  const [serverError, setServerError] = useState<string | null>(null)

  const form = useForm({
    resolver: zodResolver(petFormSchema(Boolean(pet))),
    defaultValues: {
      name: pet?.name ?? '',
      species: pet?.species ?? 'dog',
      breed: pet?.breed ?? '',
      ageYears: pet?.ageYears ?? 0,
      ageMonths: pet?.ageMonths ?? 0,
      status: pet?.status ?? 'in_adoption',
      image: null,
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError(null)
    try {
      if (pet) await updatePet.execute(pet.id, values)
      else await createPet.execute(values)
      navigate('/admin/mascotas', { viewTransition: true, state: { notice: `${values.name} se guardó correctamente.` } })
    } catch (error) {
      setServerError(applyServerErrors(error, SERVER_FIELDS, form.setError))
    }
  })

  return { form, onSubmit, serverError }
}
