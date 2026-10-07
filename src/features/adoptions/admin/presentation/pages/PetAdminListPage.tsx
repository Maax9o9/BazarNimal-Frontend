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
import type { PetSpecies, PetStatus } from '../../../common/domain/petTypes'
import { PET_STATUS, petAge, SPECIES_FILTER, SPECIES_LABEL, STATUS_FILTER } from '../../../common/presentation/petLabels'
import type { AdminPet } from '../../domain/entities/AdminPet'
import { useAdminPets } from '../hooks/useAdminPets'

export function PetAdminListPage() {
  const { query, update, setPage, state, reload, remove } = useAdminPets()
  const [toDelete, setToDelete] = useState<AdminPet | null>(null)

  const confirmDelete = async () => {
    if (toDelete && (await remove.run(toDelete.id))) {
      setToDelete(null)
      reload()
    }
  }

  const columns: Column<AdminPet>[] = [
    { header: 'Foto', cell: (p) => <ImageWithFallback src={p.imageUrl} alt={`Foto de ${p.name}`} className="size-14 rounded-xl" /> },
    { header: 'Nombre', cell: (p) => <span className="font-medium">{p.name}</span> },
    { header: 'Especie', cell: (p) => SPECIES_LABEL[p.species] },
    { header: 'Raza', cell: (p) => p.breed },
    { header: 'Edad', cell: (p) => petAge(p.ageYears, p.ageMonths) },
    { header: 'Estatus', cell: (p) => <Badge tone={PET_STATUS[p.status].tone}>{PET_STATUS[p.status].label}</Badge> },
    {
      header: 'Acciones',
      cell: (p) => (
        <div className="flex gap-1">
          <ButtonLink to={`/admin/mascotas/${p.id}`} variant="ghost" size="sm">
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
      <PageHeader title="Mascotas" subtitle="Mascotas publicadas para adopción" action={<ButtonLink to="/admin/mascotas/nueva">+ Nueva mascota</ButtonLink>} />
      <FlashNotice />
      <div className="grid gap-4 md:grid-cols-[1fr_200px_200px]">
        <TextField label="Buscar" type="search" placeholder="Nombre o raza…" maxLength={80} value={query.search} onChange={(e) => update({ search: e.target.value })} />
        <SelectField label="Especie" options={SPECIES_FILTER} value={query.species} onChange={(e) => update({ species: e.target.value as PetSpecies | '' })} />
        <SelectField
          label="Estatus"
          options={[{ value: '', label: 'Todos' }, ...STATUS_FILTER.filter((o) => o.value)]}
          value={query.status}
          onChange={(e) => update({ status: e.target.value as PetStatus | '' })}
        />
      </div>
      <AsyncView
        state={state}
        isEmpty={(page) => page.items.length === 0}
        empty={<EmptyState action={<ButtonLink to="/admin/mascotas/nueva">Registrar mascota</ButtonLink>}>No hay mascotas con esos filtros.</EmptyState>}
      >
        {(page) => (
          <>
            <DataTable caption="Mascotas" columns={columns} rows={page.items} rowKey={(p) => p.id} />
            <Pagination {...page} onChange={setPage} />
          </>
        )}
      </AsyncView>

      <ConfirmDialog
        open={toDelete !== null}
        title="¿Eliminar esta mascota?"
        confirmLabel="Sí, eliminar"
        busy={remove.busy}
        error={remove.error}
        onConfirm={confirmDelete}
        onCancel={() => {
          setToDelete(null)
          remove.clearError()
        }}
      >
        “{toDelete?.name}” se eliminará junto con su foto. Esta acción no se puede deshacer.
      </ConfirmDialog>
    </div>
  )
}
