import { Controller } from 'react-hook-form'
import { Alert } from '@shared/components/ui/Alert'
import { Button, ButtonLink } from '@shared/components/ui/Button'
import { ImageField } from '@shared/components/ui/ImageField'
import { TextAreaField } from '@shared/components/ui/TextAreaField'
import { useCreatePostForm } from '../hooks/usePosts'
import { POST_MAX_LENGTH } from '../validators/postFormSchema'

export function CreatePostPage() {
  const { form, onSubmit, serverError, contentLength } = useCreatePostForm()
  const { register, control, formState } = form
  const { errors, isSubmitting } = formState

  return (
    <div className="flex justify-center px-4 pb-20 pt-12">
      <form noValidate onSubmit={onSubmit} className="flex w-full max-w-[680px] flex-col gap-5 rounded-3xl border border-beige-200 bg-surface p-6 md:p-10">
        <h1 className="font-display text-h1 font-semibold">Comparte un recuerdo</h1>
        <p className="leading-[1.6] text-cafe-700">Tu publicación quedará pendiente hasta que el equipo la apruebe.</p>
        {serverError && <Alert>{serverError}</Alert>}
        <Controller
          control={control}
          name="image"
          render={({ field }) => <ImageField label="Foto de tu mascota" value={field.value} onChange={field.onChange} error={errors.image?.message} className="h-72" />}
        />
        <TextAreaField
          label="Mensaje"
          placeholder="Escribe unas palabras para recordarla…"
          maxLength={POST_MAX_LENGTH}
          length={contentLength}
          error={errors.content?.message}
          {...register('content')}
        />
        <div className="flex justify-end gap-3">
          <ButtonLink to="/ofrenda" variant="ghost">
            Cancelar
          </ButtonLink>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando…' : 'Enviar a revisión'}
          </Button>
        </div>
      </form>
    </div>
  )
}
