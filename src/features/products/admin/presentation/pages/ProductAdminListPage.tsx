import { useState } from 'react'
import { AsyncView, EmptyState } from '@shared/components/ui/AsyncView'
import { Badge } from '@shared/components/ui/Badge'
import { Button, ButtonLink } from '@shared/components/ui/Button'
import { ConfirmDialog } from '@shared/components/ui/ConfirmDialog'
import { DataTable, type Column } from '@shared/components/ui/DataTable'
import { FlashNotice } from '@shared/components/ui/FlashNotice'
import { ImageWithFallback } from '@shared/components/ui/ImageWithFallback'
import { PageHeader } from '@shared/components/ui/PageHeader'
import { Pagination } from '@shared/components/ui/Pagination'
import { SelectField } from '@shared/components/ui/SelectField'
import { TextField } from '@shared/components/ui/TextField'
import type { ProductStatus } from '../../../common/domain/productTypes'
import { PRODUCT_STATUS, piecesLabel, weightLabel } from '../../../common/presentation/productLabels'
import type { AdminProduct } from '../../domain/entities/AdminProduct'
import { useAdminProducts } from '../hooks/useAdminProducts'

const STATUS_OPTIONS = [
  { value: '', label: 'Todos' },
  { value: 'available', label: 'Disponibles' },
  { value: 'unavailable', label: 'Agotados' },
]

export function ProductAdminListPage() {
  const { query, update, setPage, state, reload, remove } = useAdminProducts()
  const [toDelete, setToDelete] = useState<AdminProduct | null>(null)

  const confirmDelete = async () => {
    if (toDelete && (await remove.run(toDelete.id))) {
      setToDelete(null)
      reload()
    }
  }

  const columns: Column<AdminProduct>[] = [
    { header: 'Imagen', cell: (p) => <ImageWithFallback src={p.imageUrl} alt={p.name} className="size-14 rounded-xl" /> },
    { header: 'Nombre', cell: (p) => <span className="font-medium">{p.name}</span> },
    { header: 'Peso', cell: (p) => weightLabel(p.weightKg) },
    { header: 'Piezas', cell: (p) => piecesLabel(p.pieces) },
    { header: 'Estatus', cell: (p) => <Badge tone={PRODUCT_STATUS[p.status].tone}>{PRODUCT_STATUS[p.status].label}</Badge> },
    {
      header: 'Acciones',
      cell: (p) => (
        <div className="flex gap-1">
          <ButtonLink to={`/admin/productos/${p.id}`} variant="ghost" size="sm">
            Editar
          </ButtonLink>
          <Button variant="ghost" size="sm" onClick={() => setToDelete(p)}>
            Eliminar
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-7">
      <PageHeader
        title="Productos"
        subtitle="Artículos del catálogo de la tienda (solo existencia)"
        action={<ButtonLink to="/admin/productos/nuevo">+ Nuevo producto</ButtonLink>}
      />
      <FlashNotice />
      <div className="grid gap-4 md:grid-cols-[1fr_200px]">
        <TextField label="Buscar" type="search" placeholder="Nombre del artículo…" maxLength={120} value={query.search} onChange={(e) => update({ search: e.target.value })} />
        <SelectField label="Estatus" options={STATUS_OPTIONS} value={query.status} onChange={(e) => update({ status: e.target.value as ProductStatus | '' })} />
      </div>
      <AsyncView
        state={state}
        isEmpty={(page) => page.items.length === 0}
        empty={<EmptyState action={<ButtonLink to="/admin/productos/nuevo">Agregar producto</ButtonLink>}>No hay productos con esos filtros.</EmptyState>}
      >
        {(page) => (
          <>
            <DataTable caption="Productos" columns={columns} rows={page.items} rowKey={(p) => p.id} />
            <Pagination {...page} onChange={setPage} />
          </>
        )}
      </AsyncView>

      <ConfirmDialog
        open={toDelete !== null}
        title="¿Eliminar este producto?"
        confirmLabel="Sí, eliminar"
        busy={remove.busy}
        error={remove.error}
        onConfirm={confirmDelete}
        onCancel={() => {
          setToDelete(null)
          remove.clearError()
        }}
      >
        “{toDelete?.name}” se eliminará del catálogo junto con su imagen. Esta acción no se puede deshacer.
      </ConfirmDialog>
    </div>
  )
}
