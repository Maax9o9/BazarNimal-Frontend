import { useInject } from '@core/di/useInject'
import { useAsync } from '@shared/hooks/useAsync'
import { useDebouncedValue } from '@shared/hooks/useDebouncedValue'
import { useListQuery } from '@shared/hooks/useListQuery'
import type { PetSort, PetSpecies } from '../../../common/domain/petTypes'
import { ADOPTIONS_USER_TOKENS } from '../../di/tokens'

const LIMIT = 12

/** Listado público: solo mascotas en adopción, con búsqueda (debounce), especie, orden y paginación. */
export function usePetList() {
  const getPets = useInject(ADOPTIONS_USER_TOKENS.getPets)
  const list = useListQuery({ search: '', species: '' as PetSpecies | '', sort: '-created_at' as PetSort })
  const search = useDebouncedValue(list.query.search.trim())
  const request = { ...list.query, search, status: 'in_adoption' as const, limit: LIMIT }
  const { state } = useAsync(() => getPets.execute(request), [request])
  return { ...list, state }
}

export function useFeaturedPets(limit = 4) {
  const getPets = useInject(ADOPTIONS_USER_TOKENS.getPets)
  return useAsync(() => getPets.execute({ page: 1, limit, status: 'in_adoption' })).state
}
