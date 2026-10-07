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
import type { AdminProduct } from '../../domain/entities/AdminProduct'
import { useProductForm, useProductToEdit } from '../hooks/useAdminProducts'

const STATUS = [
  { value: 'available', label: 'Disponible' },
  { value: 'unavailable', label: 'No disponible' },
] as const

function ProductForm({ product }: { product?: AdminProduct }) {
  const { form, onSubmit, serverError } = useProductForm(product)
  const { register, control, formState } = form
  const { errors, isSubmitting } = formState

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-10 rounded-3xl border border-beige-200 bg-surface p-6 md:p-10 lg:flex-row">
      <div className="lg:w-80">
        <Controller
          control={control}
          name="image"
          render={({ field }) => (
            <ImageField label="Imagen" value={field.value} currentUrl={product?.imageUrl} onChange={field.onChange} error={errors.image?.message} className="h-80" />
          )}
        />
      </div>
      <div className="flex flex-1 flex-col gap-5">
        {serverError && <Alert>{serverError}</Alert>}
        <TextField label="Nombre" maxLength={120} error={errors.name?.message} {...register('name')} />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Peso (kg) · opcional" inputMode="decimal" placeholder="Ej. 2.5" error={errors.weightKg?.message} {...register('weightKg')} />
          <TextField label="Piezas · opcional" inputMode="numeric" placeholder="Ej. 12" error={errors.pieces?.message} {...register('pieces')} />
        </div>
        <Controller control={control} name="status" render={({ field }) => <ChipGroup label="Estatus" options={[...STATUS]} value={field.value} onChange={field.onChange} />} />
        <div className="flex justify-end gap-3">
          <ButtonLink to="/admin/productos" variant="ghost">
            Cancelar
          </ButtonLink>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Guardando…' : product ? 'Guardar cambios' : 'Guardar producto'}
          </Button>
        </div>
      </div>
    </form>
  )
}

function EditProduct({ id }: { id: string }) {
  const state = useProductToEdit(id)
  return <AsyncView state={state}>{(product) => <ProductForm product={product} />}</AsyncView>
}

export function ProductFormPage() {
  const { id } = useParams()
  return (
    <div className="flex flex-col gap-7">
      <PageHeader
        title={id ? 'Editar producto' : 'Nuevo producto'}
        subtitle={
          <>
            <Link to="/admin/productos" className="hover:underline">
              Productos
            </Link>{' '}
            / {id ? 'Editar' : 'Nuevo'}
          </>
        }
      />
      {id ? <EditProduct id={id} /> : <ProductForm />}
    </div>
  )
}
