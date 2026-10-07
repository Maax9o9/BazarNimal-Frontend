import { useState } from 'react'
import { useInject } from '@core/di/useInject'
import { useAsync } from '@shared/hooks/useAsync'
import { ADOPTIONS_USER_TOKENS } from '../../di/tokens'

const LIMIT = 10

export function useMyRequests() {
  const getMine = useInject(ADOPTIONS_USER_TOKENS.getMyRequests)
  const [page, setPage] = useState(1)
  const { state } = useAsync(() => getMine.execute({ page, limit: LIMIT }), [page])
  return { state, page, setPage }
}
