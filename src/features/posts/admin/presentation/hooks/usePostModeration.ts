import { useInject } from '@core/di/useInject'
import type { ReviewStatus } from '@shared/constants/reviewStatus'
import { useAction } from '@shared/hooks/useAction'
import { useAsync } from '@shared/hooks/useAsync'
import { useListQuery } from '@shared/hooks/useListQuery'
import { POSTS_ADMIN_TOKENS } from '../../di/tokens'

export type Moderation = 'approve' | 'reject' | 'delete'

const LIMIT = 12

export function usePostModeration() {
  const getPosts = useInject(POSTS_ADMIN_TOKENS.getPosts)
  const approve = useInject(POSTS_ADMIN_TOKENS.approvePost)
  const reject = useInject(POSTS_ADMIN_TOKENS.rejectPost)
  const remove = useInject(POSTS_ADMIN_TOKENS.deletePost)
  const list = useListQuery({ status: 'pending' as ReviewStatus | '' })
  const request = { ...list.query, limit: LIMIT }
  const { state, reload } = useAsync(() => getPosts.execute(request), [request])

  const moderate = useAction((id: string, action: Moderation) => {
    if (action === 'approve') return approve.execute(id)
    if (action === 'reject') return reject.execute(id)
    return remove.execute(id)
  })

  return { ...list, state, reload, moderate }
}
