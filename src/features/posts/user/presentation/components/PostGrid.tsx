import { AsyncView, EmptyState, SkeletonGrid } from '@shared/components/ui/AsyncView'
import type { AsyncState } from '@shared/hooks/useAsync'
import type { Page } from '@shared/types/pagination'
import type { Post } from '../../domain/entities/Post'
import { PostCard } from './PostCard'

const GRID = 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'

export function PostGrid({ state, skeletons }: { state: AsyncState<Page<Post>>; skeletons: number }) {
  return (
    <AsyncView
      state={state}
      loading={<SkeletonGrid count={skeletons} className={GRID} itemClass="h-[401px]" />}
      isEmpty={(page) => page.items.length === 0}
      empty={<EmptyState>Aún no hay recuerdos en la ofrenda. Pronto encenderemos las primeras veladoras.</EmptyState>}
    >
      {(page) => (
        <ul className={GRID}>
          {page.items.map((post) => (
            <li key={post.id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </AsyncView>
  )
}
