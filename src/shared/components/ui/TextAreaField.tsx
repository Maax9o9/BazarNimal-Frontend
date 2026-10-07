import { useId, type ComponentProps } from 'react'

type Props = ComponentProps<'textarea'> & { label: string; error?: string; length: number; maxLength: number }

export function TextAreaField({ label, error, length, maxLength, id, ...props }: Props) {
  const autoId = useId()
  const fieldId = id ?? autoId
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium leading-[1.4]">
        {label}
      </label>
      <textarea
        id={fieldId}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={`${fieldId}-help`}
        className={`min-h-36 resize-y rounded-xl border-[1.5px] bg-field px-4 py-3 leading-[1.6] outline-none placeholder:text-cafe-500 focus:border-rojo-500 ${
          error ? 'border-rojo-500' : 'border-beige-300'
        }`}
        {...props}
      />
      <p id={`${fieldId}-help`} className={`flex justify-between gap-4 text-sm ${error ? 'text-rojo-700' : 'text-cafe-700'}`}>
        <span>{error}</span>
        <span className="text-cafe-700">
          {length} / {maxLength}
        </span>
      </p>
    </div>
  )
}
