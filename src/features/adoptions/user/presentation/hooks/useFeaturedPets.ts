import { useInject } from '@core/di/useInject'
import { useAsync } from '@shared/hooks/useAsync'
import { ADOPTIONS_USER_TOKENS } from '../../di/tokens'

export function useFeaturedPets(limit = 4) {
  const getPets = useInject(ADOPTIONS_USER_TOKENS.getPets)
  return useAsync(() => getPets.execute({ limit, status: 'in_adoption' }))
}
