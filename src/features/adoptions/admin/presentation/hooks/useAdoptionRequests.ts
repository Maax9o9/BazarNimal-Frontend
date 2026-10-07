import { useInject } from '@core/di/useInject'
import type { ReviewStatus } from '@shared/constants/reviewStatus'
import { useAction } from '@shared/hooks/useAction'
import { useAsync } from '@shared/hooks/useAsync'
import { useListQuery } from '@shared/hooks/useListQuery'
import { ADOPTIONS_ADMIN_TOKENS } from '../../di/tokens'

const LIMIT = 10

export function useAdoptionRequests() {
  const getRequests = useInject(ADOPTIONS_ADMIN_TOKENS.getRequests)
  const approve = useInject(ADOPTIONS_ADMIN_TOKENS.approveRequest)
  const reject = useInject(ADOPTIONS_ADMIN_TOKENS.rejectRequest)
  const list = useListQuery({ status: 'pending' as ReviewStatus | '' })
  const request = { ...list.query, limit: LIMIT }
  const { state, reload } = useAsync(() => getRequests.execute(request), [request])
  const review = useAction((id: string, decision: 'approve' | 'reject') =>
    decision === 'approve' ? approve.execute(id) : reject.execute(id),
  )

  return { ...list, state, reload, review }
}
