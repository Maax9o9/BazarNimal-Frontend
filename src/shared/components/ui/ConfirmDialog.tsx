import { useEffect, useRef, type ReactNode } from 'react'
import { Alert } from './Alert'
import { Button } from './Button'

type Props = {
  open: boolean
  title: string
  children: ReactNode
  confirmLabel: string
  busy?: boolean
  error?: string | null
  onConfirm: () => void
  onCancel: () => void
}

/** Diálogo modal nativo (<dialog>): atrapa el foco y se cierra con Esc. */
export function ConfirmDialog({ open, title, children, confirmLabel, busy, error, onConfirm, onCancel }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (open && !dialog?.open) dialog?.showModal()
    if (!open && dialog?.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      onCancel={(event) => {
        event.preventDefault()
        if (!busy) onCancel()
      }}
      aria-labelledby="dialog-title"
      className="m-auto w-[min(480px,calc(100%-2rem))] rounded-3xl bg-surface p-8 text-cafe-900 backdrop:bg-cafe-900/55"
    >
      <div className="flex flex-col gap-4">
        <h2 id="dialog-title" className="font-display text-[1.75rem] font-semibold leading-[1.2]">
          {title}
        </h2>
        <div className="leading-[1.6] text-cafe-700">{children}</div>
        {error && <Alert>{error}</Alert>}
        <div className="flex flex-wrap justify-end gap-3">
          <Button variant="ghost" onClick={onCancel} disabled={busy}>
            Cancelar
          </Button>
          <Button onClick={onConfirm} disabled={busy}>
            {busy ? 'Procesando…' : confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  )
}
