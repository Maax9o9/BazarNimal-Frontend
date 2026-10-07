import { useId, type ComponentProps } from 'react'
import chevron from '@assets/icons/chevron-abajo.svg'
import { Icon } from './Icon'

type Props = ComponentProps<'select'> & { label: string; options: { value: string; label: string }[] }

/** Select nativo (accesible) con estilo propio; la lista desplegable se estiliza en index.css (.campo-select). */
export function SelectField({ label, options, id, className = '', ...props }: Props) {
  const autoId = useId()
  const selectId = id ?? autoId
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={selectId} className="text-sm font-medium leading-[1.4]">
        {label}
      </label>
      <div className="relative">
        <select
          id={selectId}
          className="campo-select w-full cursor-pointer rounded-xl border-[1.5px] border-beige-300 bg-field py-3 pl-4 pr-11 leading-[1.6] outline-none transition-colors hover:border-beige-400 focus:border-rojo-500"
          {...props}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <Icon src={chevron} className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-cafe-700" />
      </div>
    </div>
  )
}
