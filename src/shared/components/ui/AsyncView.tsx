import type { ReactNode } from 'react'
import type { AsyncState } from '@shared/hooks/useAsync'

export function EmptyState({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-[20px] bg-beige-100 px-6 py-10 text-center text-cafe-700">
      <p>{children}</p>
      {action}
    </div>
  )
}

type AsyncViewProps<T> = {
  state: AsyncState<T>
  children: (data: T) => ReactNode
  /** Si devuelve true se muestra `empty` en lugar del contenido. */
  isEmpty?: (data: T) => boolean
  empty?: ReactNode
  loading?: ReactNode
}

/** Pinta los estados de carga, error, vacío y éxito de una consulta. */
export function AsyncView<T>({ state, children, isEmpty, empty, loading }: AsyncViewProps<T>) {
  if (state.status === 'loading')
    return loading ?? <div aria-busy="true" className="h-64 animate-pulse rounded-[20px] bg-beige-100" />
  if (state.status === 'error')
    return (
      <p role="alert" className="rounded-[20px] bg-rojo-50 px-6 py-6 text-center text-rojo-700">
        {state.message}
      </p>
    )
  if (isEmpty?.(state.data)) return <>{empty}</>
  return <>{children(state.data)}</>
}

/** Rejilla de tarjetas "esqueleto" mientras carga un listado. */
export function SkeletonGrid({ count, className, itemClass }: { count: number; className: string; itemClass: string }) {
  return (
    <div aria-busy="true" className={className}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={`animate-pulse rounded-[20px] bg-beige-100 ${itemClass}`} />
      ))}
    </div>
  )
}
