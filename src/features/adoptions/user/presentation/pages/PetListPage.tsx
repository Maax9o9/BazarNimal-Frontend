import { ChipGroup } from '@shared/components/ui/ChipGroup'
import { PageHeader } from '@shared/components/ui/PageHeader'
import { Pagination } from '@shared/components/ui/Pagination'
import { SelectField } from '@shared/components/ui/SelectField'
import { TextField } from '@shared/components/ui/TextField'
import type { PetSort } from '../../../common/domain/petTypes'
import { SORT_OPTIONS, SPECIES_FILTER } from '../../../common/presentation/petLabels'
import { PetGrid } from '../components/PetGrid'
import { usePetList } from '../hooks/usePets'

export function PetListPage() {
  const { query, update, setPage, state } = usePetList()

  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-4 pb-20 pt-10 sm:pt-14 md:px-10 xl:px-20">
      <PageHeader title="Adopta" subtitle="Conoce a los perros y gatos que buscan familia." />

      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end lg:grid-cols-[1fr_auto_220px]">
        <TextField
          label="Buscar"
          type="search"
          placeholder="Nombre o raza…"
          maxLength={80}
          value={query.search}
          onChange={(e) => update({ search: e.target.value })}
        />
        <ChipGroup label="Especie" options={SPECIES_FILTER} value={query.species} onChange={(species) => update({ species })} />
        <SelectField
          label="Ordenar"
          className="md:col-span-2 lg:col-span-1"
          options={SORT_OPTIONS}
          value={query.sort}
          onChange={(e) => update({ sort: e.target.value as PetSort })}
        />
      </div>

      <PetGrid state={state} skeletons={8} empty="No encontramos mascotas en adopción con esos filtros." />
      {state.status === 'success' && <Pagination {...state.data} onChange={setPage} />}
    </div>
  )
}
