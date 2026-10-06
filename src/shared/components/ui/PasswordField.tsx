import { useId, useState, type ComponentProps } from 'react'
import { RequirementList, type Requirement } from './RequirementList'
import { TextField } from './TextField'

type PasswordFieldProps = Omit<ComponentProps<typeof TextField>, 'type' | 'trailing' | 'footer' | 'footerId'> & {
  /** Requisitos que se marcan en vivo bajo el campo. */
  requirements?: Requirement[]
  showRequirementErrors?: boolean
}

const EYE = 'M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z'

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
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d={EYE} strokeLinejoin="round" />
            <circle cx="12" cy="12" r="3" />
            {visible && <path d="M4 4l16 16" strokeLinecap="round" />}
          </svg>
        </button>
      }
      footerId={listId}
      footer={requirements && <RequirementList id={listId} items={requirements} showErrors={showRequirementErrors} />}
    />
  )
}
