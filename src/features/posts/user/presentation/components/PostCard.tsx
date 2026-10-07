import { Link } from '@shared/components/ui/Link'
import { ImageWithFallback } from '@shared/components/ui/ImageWithFallback'
import { formatDate } from '@shared/utils/format'
import type { Post } from '../../domain/entities/Post'

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      to={`/ofrenda/${post.id}`}
      className="flex h-full flex-col overflow-hidden rounded-[20px] border border-beige-200 bg-beige-100 transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-cempasuchil"
    >
      <ImageWithFallback src={post.imageUrl} alt={`Recuerdo compartido por ${post.authorName}`} className="h-70 w-full" />
      <div className="flex flex-col gap-2.5 px-5 pb-5 pt-4">
        <p className="line-clamp-3 leading-[1.6]">{post.content}</p>
        <p className="text-sm leading-[1.5] text-cafe-700">
          Por {post.authorName} · <time dateTime={post.createdAt.toISOString()}>{formatDate(post.createdAt)}</time>
        </p>
      </div>
    </Link>
  )
}
