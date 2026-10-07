import { useInject } from '@core/di/useInject'
import { useAction } from '@shared/hooks/useAction'
import { useAsync } from '@shared/hooks/useAsync'
import { useDebouncedValue } from '@shared/hooks/useDebouncedValue'
import { useListQuery } from '@shared/hooks/useListQuery'
import type { PetSpecies, PetStatus } from '../../../common/domain/petTypes'
import { ADOPTIONS_ADMIN_TOKENS } from '../../di/tokens'

const LIMIT = 10

export function useAdminPets() {
  const getPets = useInject(ADOPTIONS_ADMIN_TOKENS.getPets)
  const deletePet = useInject(ADOPTIONS_ADMIN_TOKENS.deletePet)
  const list = useListQuery({ search: '', species: '' as PetSpecies | '', status: '' as PetStatus | '' })
  const search = useDebouncedValue(list.query.search.trim())
  const request = { ...list.query, search, limit: LIMIT }
  const { state, reload } = useAsync(() => getPets.execute(request), [request])
  const remove = useAction((id: string) => deletePet.execute(id))

  return { ...list, state, reload, remove }
}

export function usePetToEdit(id: string) {
  const getPet = useInject(ADOPTIONS_ADMIN_TOKENS.getPetById)
  return useAsync(() => getPet.execute(id), [id]).state
}
