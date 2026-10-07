import { useParams } from 'react-router-dom'
import { Link } from '@shared/components/ui/Link'
import { AsyncView } from '@shared/components/ui/AsyncView'
import { ButtonLink } from '@shared/components/ui/Button'
import { ImageWithFallback } from '@shared/components/ui/ImageWithFallback'
import { formatDate } from '@shared/utils/format'
import { usePostDetail } from '../hooks/usePosts'

export function PostDetailPage() {
  const { id = '' } = useParams()
  const state = usePostDetail(id)

  return (
    <div className="mx-auto flex max-w-[760px] flex-col gap-6 px-4 pb-20 pt-10">
      <nav aria-label="Ruta" className="text-sm text-cafe-700">
        <Link to="/ofrenda" className="hover:underline">
          Ofrenda
        </Link>
        {state.status === 'success' && <span> / Recuerdo de {state.data.authorName}</span>}
      </nav>
      <AsyncView state={state}>
        {(post) => (
          <article className="flex flex-col gap-6">
            <ImageWithFallback src={post.imageUrl} alt={`Recuerdo compartido por ${post.authorName}`} className="h-72 w-full rounded-[32px] sm:h-[400px] md:h-[520px]" />
            <p className="whitespace-pre-line font-display text-[1.75rem] font-semibold leading-[1.3]">{post.content}</p>
            <p className="text-cafe-700">
              Por {post.authorName} · <time dateTime={post.createdAt.toISOString()}>{formatDate(post.createdAt)}</time>
            </p>
          </article>
        )}
      </AsyncView>
      <ButtonLink to="/ofrenda" variant="ghost" className="self-start">
        ← Volver a la ofrenda
      </ButtonLink>
    </div>
  )
}
