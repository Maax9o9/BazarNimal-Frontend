import { useLocation } from 'react-router-dom'

/** Muestra el aviso que otra vista dejó al navegar: navigate(to, { state: { notice } }). */
export function FlashNotice() {
  const notice = (useLocation().state as { notice?: string } | null)?.notice
  if (!notice) return null
  return (
    <p role="status" className="rounded-2xl bg-exito-bg px-5 py-3 text-sm font-medium text-exito">
      {notice}
    </p>
  )
}
