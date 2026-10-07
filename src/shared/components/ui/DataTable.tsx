import { Fragment, type ReactNode } from 'react'

export interface Column<T> {
  header: string
  cell: (row: T) => ReactNode
  className?: string
}

type Props<T> = { caption: string; columns: Column<T>[]; rows: T[]; rowKey: (row: T) => string }

/**
 * Tabla genérica: recibe columnas y filas por props, sin lógica de negocio.
 * Por debajo de xl (tablet y laptop con sidebar) cada fila se muestra como tarjeta (etiqueta · valor) para no forzar scroll horizontal.
 */
export function DataTable<T>({ caption, columns, rows, rowKey }: Props<T>) {
  return (
    <>
      <div className="hidden overflow-x-auto rounded-[20px] border border-beige-200 bg-surface xl:block">
        <table className="w-full text-left">
          <caption className="sr-only">{caption}</caption>
          <thead className="bg-beige-100 text-sm font-medium text-cafe-700">
            <tr>
              {columns.map((c) => (
                <th key={c.header} scope="col" className={`px-5 py-3.5 font-medium lg:px-6 ${c.className ?? ''}`}>
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={rowKey(row)} className="border-t border-beige-200">
                {columns.map((c) => (
                  <td key={c.header} className={`px-5 py-3 align-middle lg:px-6 ${c.className ?? ''}`}>
                    {c.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul aria-label={caption} className="grid gap-3 md:grid-cols-2 xl:hidden">
        {rows.map((row) => (
          <li key={rowKey(row)} className="rounded-[20px] border border-beige-200 bg-surface p-4">
            <dl className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-2.5">
              {columns.map((c) => (
                <Fragment key={c.header}>
                  <dt className="text-sm text-cafe-700">{c.header}</dt>
                  <dd className="min-w-0 break-words">{c.cell(row)}</dd>
                </Fragment>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </>
  )
}
