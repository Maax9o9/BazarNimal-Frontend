import palomita from '@assets/icons/palomita.svg'
import { Icon } from './Icon'

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
              {met && <Icon src={palomita} className="size-2.5" />}
            </span>
            {label}
            <span className="sr-only">{met ? '(cumplido)' : '(pendiente)'}</span>
          </li>
        )
      })}
    </ul>
  )
}
