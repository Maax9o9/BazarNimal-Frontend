import { useId, type ComponentProps, type ReactNode } from 'react'

type TextFieldProps = ComponentProps<'input'> & {
  label: string
  /** Error de validación (del esquema o del backend). Tiene prioridad sobre `hint`. */
  error?: string
  hint?: string
  /** Marca el campo como inválido sin mostrar texto (p. ej. cuando una lista de requisitos ya lo explica). */
  invalid?: boolean
  /** Elemento al final de la caja, como el botón de mostrar contraseña. */
  trailing?: ReactNode
  /** Contenido bajo el campo, enlazado por aria-describedby (requiere `footerId`). */
  footer?: ReactNode
  footerId?: string
}

export function TextField({ label, error, hint, invalid, trailing, footer, footerId, id, ...props }: TextFieldProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const help = error ?? hint
  const helpId = `${inputId}-help`
  const hasError = Boolean(error) || Boolean(invalid)
  const describedBy = [help && helpId, footer && footerId].filter(Boolean).join(' ') || undefined

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium leading-[1.4]">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          aria-invalid={hasError}
          aria-describedby={describedBy}
          className={`w-full rounded-xl border-[1.5px] bg-field px-4 py-3 leading-[1.6] outline-none transition-colors placeholder:text-cafe-500 focus:border-rojo-500 ${
            hasError ? 'border-rojo-500' : 'border-beige-300'
          } ${trailing ? 'pr-12' : ''}`}
          {...props}
        />
        {trailing && <div className="absolute inset-y-0 right-2 flex items-center">{trailing}</div>}
      </div>
      {help && (
        <p id={helpId} className={`text-sm leading-[1.5] ${error ? 'text-rojo-700' : 'text-cafe-700'}`}>
          {help}
        </p>
      )}
      {footer}
    </div>
  )
}
