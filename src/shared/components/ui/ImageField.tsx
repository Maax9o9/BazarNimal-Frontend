import { useId, type DragEvent } from 'react'
import { useObjectUrl } from '@shared/hooks/useObjectUrl'
import { IMAGE_TYPES, MAX_IMAGE_MB } from '@shared/validators'

type Props = {
  label: string
  value: File | null
  /** Imagen actual (URL del backend) cuando se edita. */
  currentUrl?: string | null
  onChange: (file: File | null) => void
  error?: string
  className?: string
}

/** Selector de imagen con vista previa local antes de subirla (multipart). */
export function ImageField({ label, value, currentUrl, onChange, error, className = 'h-64' }: Props) {
  const id = useId()
  const preview = useObjectUrl(value) ?? currentUrl ?? null

  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    onChange(event.dataTransfer.files[0] ?? null)
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium leading-[1.4]">{label}</span>
      <label
        htmlFor={id}
        onDragOver={(event) => event.preventDefault()}
        onDrop={onDrop}
        className={`relative flex cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border-[1.5px] border-dashed bg-beige-50 px-4 text-center transition-colors hover:bg-beige-100 ${
          error ? 'border-rojo-500' : 'border-beige-400'
        } ${className}`}
      >
        {preview ? (
          <img src={preview} alt="Vista previa" className="absolute inset-0 size-full object-cover" />
        ) : (
          <>
            <span className="text-sm font-medium">Arrastra una imagen o haz clic para elegirla</span>
            <span className="text-sm text-cafe-700">JPG, PNG o WEBP · máx. {MAX_IMAGE_MB} MB</span>
          </>
        )}
      </label>
      <input
        id={id}
        type="file"
        accept={IMAGE_TYPES.join(',')}
        className="sr-only"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.files?.[0] ?? null)}
      />
      {preview && <span className="text-sm text-cafe-700">Haz clic en la imagen para cambiarla.</span>}
      {error && (
        <p id={`${id}-error`} className="text-sm text-rojo-700">
          {error}
        </p>
      )}
    </div>
  )
}
