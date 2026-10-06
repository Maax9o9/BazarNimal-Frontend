export function Notice({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div
      role="status"
      className="fixed inset-x-4 bottom-6 z-50 mx-auto flex max-w-md items-center justify-between gap-4 rounded-xl bg-cafe-900 px-5 py-4 text-sm text-beige-50 shadow-lg"
    >
      <span>{message}</span>
      <button type="button" onClick={onClose} className="font-semibold text-beige-300 hover:text-beige-50">
        Cerrar
      </button>
    </div>
  )
}
