import { Button } from './Button'

type Props = { page: number; limit: number; total: number; onChange: (page: number) => void }

export function Pagination({ page, limit, total, onChange }: Props) {
  const pages = Math.max(1, Math.ceil(total / limit))
  if (pages <= 1) return null

  return (
    <nav aria-label="Paginación" className="flex items-center justify-center gap-2 sm:gap-3">
      <Button variant="secondary" disabled={page <= 1} onClick={() => onChange(page - 1)} aria-label="Página anterior">
        ← <span className="hidden sm:inline">Anterior</span>
      </Button>
      <span className="whitespace-nowrap text-sm font-medium text-cafe-700">
        {page} de {pages}
      </span>
      <Button variant="secondary" disabled={page >= pages} onClick={() => onChange(page + 1)} aria-label="Página siguiente">
        <span className="hidden sm:inline">Siguiente</span> →
      </Button>
    </nav>
  )
}
