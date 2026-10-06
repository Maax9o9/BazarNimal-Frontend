import { ImageWithFallback } from '@shared/components/ui/ImageWithFallback'
import type { Post } from '../../domain/entities/Post'

const dateFormat = new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[20px] border border-beige-200 bg-beige-100">
      <ImageWithFallback src={post.imageUrl} alt={`Recuerdo compartido por ${post.authorName}`} className="h-70 w-full" />
      <div className="flex flex-col gap-2.5 px-5 pb-5 pt-4">
        <p className="leading-[1.6]">{post.content}</p>
        <p className="text-sm leading-[1.5] text-cafe-700">
          Por {post.authorName} · <time dateTime={post.createdAt.toISOString()}>{dateFormat.format(post.createdAt)}</time>
        </p>
      </div>
    </article>
  )
}
