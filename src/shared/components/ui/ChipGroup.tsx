type Option<V> = { value: V; label: string }

type Props<V extends string> = {
  label: string
  options: Option<V>[]
  value: V
  onChange: (value: V) => void
}

/** Selector de una opción en forma de chips (filtros, especie, estatus). */
export function ChipGroup<V extends string>({ label, options, value, onChange }: Props<V>) {
  return (
    <fieldset className="flex flex-col gap-1.5">
      <legend className="mb-1.5 text-sm font-medium leading-[1.4]">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = option.value === value
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium leading-[1.4] transition-colors focus-visible:outline-2 focus-visible:outline-rojo-500 ${
                active ? 'bg-cafe-900 text-beige-50' : 'border border-beige-300 bg-surface hover:bg-beige-100'
              }`}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
