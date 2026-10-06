import { useInject } from '@core/di/useInject'
import { useAsync } from '@shared/hooks/useAsync'
import { POSTS_USER_TOKENS } from '../../di/tokens'

export function useLatestPosts(limit = 3) {
  const getApprovedPosts = useInject(POSTS_USER_TOKENS.getApprovedPosts)
  return useAsync(() => getApprovedPosts.execute(limit))
}
