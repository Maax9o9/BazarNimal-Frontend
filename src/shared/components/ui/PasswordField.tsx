import { useId, useState, type ComponentProps } from 'react'
import ojoTachado from '@assets/icons/ojo-tachado.svg'
import ojo from '@assets/icons/ojo.svg'
import { Icon } from './Icon'
import { RequirementList, type Requirement } from './RequirementList'
import { TextField } from './TextField'

type PasswordFieldProps = Omit<ComponentProps<typeof TextField>, 'type' | 'trailing' | 'footer' | 'footerId'> & {
  /** Requisitos que se marcan en vivo bajo el campo. */
  requirements?: Requirement[]
  showRequirementErrors?: boolean
}


/** Campo de contraseña con botón de mostrar/ocultar siempre visible. */
export function PasswordField({ requirements, showRequirementErrors, ...props }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)
  const listId = useId()

  return (
    <TextField
      {...props}
      type={visible ? 'text' : 'password'}
      trailing={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          aria-pressed={visible}
          className="flex size-9 items-center justify-center rounded-lg text-cafe-700 hover:bg-beige-100 hover:text-cafe-900 focus-visible:outline-2 focus-visible:outline-rojo-500"
        >
          <Icon src={visible ? ojoTachado : ojo} />
        </button>
      }
      footerId={listId}
      footer={requirements && <RequirementList id={listId} items={requirements} showErrors={showRequirementErrors} />}
    />
  )
}
