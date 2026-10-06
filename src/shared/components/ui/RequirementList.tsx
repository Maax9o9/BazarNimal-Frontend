export interface Requirement {
  label: string
  met: boolean
}

type Props = {
  id: string
  items: Requirement[]
  /** Tras intentar enviar, los requisitos pendientes se marcan en rojo. */
  showErrors?: boolean
}

/** Lista de requisitos que se van marcando conforme el usuario escribe. */
export function RequirementList({ id, items, showErrors = false }: Props) {
  return (
    <ul id={id} className="flex flex-col gap-1 text-sm leading-[1.5]">
      {items.map(({ label, met }) => {
        const tone = met ? 'text-exito' : showErrors ? 'text-rojo-700' : 'text-cafe-700'
        return (
          <li key={label} className={`flex items-center gap-2 transition-colors ${tone}`}>
            <span
              aria-hidden="true"
              className={`flex size-4 shrink-0 items-center justify-center rounded-full border-[1.5px] transition-colors ${
                met ? 'border-exito bg-exito text-white' : 'border-current'
              }`}
            >
              {met && (
                <svg viewBox="0 0 12 12" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2.5 6.5 5 9l4.5-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            {label}
            <span className="sr-only">{met ? '(cumplido)' : '(pendiente)'}</span>
          </li>
        )
      })}
    </ul>
  )
}
