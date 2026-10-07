import { AsyncView, EmptyState, SkeletonGrid } from '@shared/components/ui/AsyncView'
import type { AsyncState } from '@shared/hooks/useAsync'
import type { Page } from '@shared/types/pagination'
import type { Pet } from '../../domain/entities/Pet'
import { PetCard } from './PetCard'

const GRID = 'grid gap-6 sm:grid-cols-2 lg:grid-cols-4'

export function PetGrid({ state, skeletons, empty }: { state: AsyncState<Page<Pet>>; skeletons: number; empty: string }) {
  return (
    <AsyncView
      state={state}
      loading={<SkeletonGrid count={skeletons} className={GRID} itemClass="h-[335px]" />}
      isEmpty={(page) => page.items.length === 0}
      empty={<EmptyState>{empty}</EmptyState>}
    >
      {(page) => (
        <ul className={GRID}>
          {page.items.map((pet) => (
            <li key={pet.id}>
              <PetCard pet={pet} />
            </li>
          ))}
        </ul>
      )}
    </AsyncView>
  )
}
