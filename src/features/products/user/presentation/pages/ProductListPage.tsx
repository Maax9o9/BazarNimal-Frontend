import { AsyncView, EmptyState, SkeletonGrid } from '@shared/components/ui/AsyncView'
import { ChipGroup } from '@shared/components/ui/ChipGroup'
import { PageHeader } from '@shared/components/ui/PageHeader'
import { Pagination } from '@shared/components/ui/Pagination'
import { TextField } from '@shared/components/ui/TextField'
import type { ProductStatus } from '../../../common/domain/productTypes'
import { ProductCard } from '../components/ProductCard'
import { useProductList } from '../hooks/useProducts'

const GRID = 'grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5'
const STOCK: { value: ProductStatus | ''; label: string }[] = [
  { value: '', label: 'Todos' },
  { value: 'available', label: 'Disponibles' },
  { value: 'unavailable', label: 'Agotados' },
]

export function ProductListPage() {
  const { query, update, setPage, state } = useProductList()

  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-4 pb-20 pt-14 md:px-10 xl:px-20">
      <PageHeader title="Tienda" subtitle="Consulta la existencia y visítanos. No hay compras en línea." />
      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <TextField label="Buscar" type="search" placeholder="Buscar artículo…" maxLength={120} value={query.search} onChange={(e) => update({ search: e.target.value })} />
        <ChipGroup label="Existencia" options={STOCK} value={query.status} onChange={(status) => update({ status })} />
      </div>
      <AsyncView
        state={state}
        loading={<SkeletonGrid count={10} className={GRID} itemClass="h-[355px]" />}
        isEmpty={(page) => page.items.length === 0}
        empty={<EmptyState>No encontramos artículos con esos filtros.</EmptyState>}
      >
        {(page) => (
          <>
            <ul className={GRID}>
              {page.items.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
            <Pagination {...page} onChange={setPage} />
          </>
        )}
      </AsyncView>
    </div>
  )
}
