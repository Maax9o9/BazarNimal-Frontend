import { Controller } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { Link } from '@shared/components/ui/Link'
import { Alert } from '@shared/components/ui/Alert'
import { AsyncView } from '@shared/components/ui/AsyncView'
import { Button, ButtonLink } from '@shared/components/ui/Button'
import { ChipGroup } from '@shared/components/ui/ChipGroup'
import { ImageField } from '@shared/components/ui/ImageField'
import { PageHeader } from '@shared/components/ui/PageHeader'
import { TextField } from '@shared/components/ui/TextField'
import type { AdminPet } from '../../domain/entities/AdminPet'
import { usePetToEdit } from '../hooks/useAdminPets'
import { usePetForm } from '../hooks/usePetForm'

const SPECIES = [
  { value: 'dog', label: 'Perro' },
  { value: 'cat', label: 'Gato' },
] as const
const STATUS = [
  { value: 'in_adoption', label: 'En adopción' },
  { value: 'adopted', label: 'Adoptada' },
] as const

function PetForm({ pet }: { pet?: AdminPet }) {
  const { form, onSubmit, serverError } = usePetForm(pet)
  const { register, control, formState } = form
  const { errors, isSubmitting } = formState

  return (
    // Campos en dos columnas para que el formulario quepa en pantallas de laptop sin hacer scroll.
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-8 rounded-3xl border border-beige-200 bg-surface p-6 md:flex-row md:p-8">
      <div className="md:w-56 md:shrink-0 lg:w-60 xl:w-72">
        <Controller
          control={control}
          name="image"
          render={({ field }) => (
            <ImageField label="Foto" value={field.value} currentUrl={pet?.imageUrl} onChange={field.onChange} error={errors.image?.message} className="h-64" />
          )}
        />
      </div>
      <div className="grid flex-1 content-start gap-5 sm:grid-cols-2">
        {serverError && (
          <div className="sm:col-span-2">
            <Alert>{serverError}</Alert>
          </div>
        )}
        <TextField label="Nombre" maxLength={80} error={errors.name?.message} {...register('name')} />
        <TextField label="Raza" maxLength={80} error={errors.breed?.message} {...register('breed')} />
        <Controller control={control} name="species" render={({ field }) => <ChipGroup label="Especie" options={[...SPECIES]} value={field.value} onChange={field.onChange} />} />
        <Controller control={control} name="status" render={({ field }) => <ChipGroup label="Estatus" options={[...STATUS]} value={field.value} onChange={field.onChange} />} />
        <TextField label="Edad (años)" type="number" min={0} max={30} placeholder="0 a 30" error={errors.ageYears?.message} {...register('ageYears', { valueAsNumber: true })} />
        <TextField label="Edad (meses)" type="number" min={0} max={11} placeholder="0 a 11" error={errors.ageMonths?.message} {...register('ageMonths', { valueAsNumber: true })} />
        <div className="flex justify-end gap-3 sm:col-span-2">
          <ButtonLink to="/admin/mascotas" variant="ghost">
            Cancelar
          </ButtonLink>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Guardando…' : 'Guardar mascota'}
          </Button>
        </div>
      </div>
    </form>
  )
}

function EditPet({ id }: { id: string }) {
  const state = usePetToEdit(id)
  return <AsyncView state={state}>{(pet) => <PetForm pet={pet} />}</AsyncView>
}

export function PetFormPage() {
  const { id } = useParams()
  return (
    <div className="flex flex-col gap-7">
      <PageHeader
        title={id ? 'Editar mascota' : 'Nueva mascota'}
        subtitle={
          <>
            <Link to="/admin/mascotas" className="hover:underline">
              Mascotas
            </Link>{' '}
            / {id ? 'Editar' : 'Nueva'}
          </>
        }
      />
      {id ? <EditPet id={id} /> : <PetForm />}
    </div>
  )
}
