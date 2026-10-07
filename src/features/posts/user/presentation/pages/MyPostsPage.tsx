import { useState } from 'react'
import { AsyncView, EmptyState, SkeletonGrid } from '@shared/components/ui/AsyncView'
import { Badge } from '@shared/components/ui/Badge'
import { Button, ButtonLink } from '@shared/components/ui/Button'
import { ConfirmDialog } from '@shared/components/ui/ConfirmDialog'
import { FlashNotice } from '@shared/components/ui/FlashNotice'
import { ImageWithFallback } from '@shared/components/ui/ImageWithFallback'
import { PageHeader } from '@shared/components/ui/PageHeader'
import { Pagination } from '@shared/components/ui/Pagination'
import { REVIEW_STATUS } from '@shared/constants/reviewStatus'
import { formatDate } from '@shared/utils/format'
import type { MyPost } from '../../domain/entities/Post'
import { useMyPosts } from '../hooks/usePosts'

export function MyPostsPage() {
  const { state, setPage, reload, remove } = useMyPosts()
  const [toDelete, setToDelete] = useState<MyPost | null>(null)

  const confirmDelete = async () => {
    if (toDelete && (await remove.run(toDelete.id))) {
      setToDelete(null)
      reload()
    }
  }

  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 pb-20 pt-14 md:px-10 xl:px-20">
      <PageHeader title="Mis publicaciones" action={<ButtonLink to="/ofrenda/nueva">Nueva publicación</ButtonLink>} />
      <FlashNotice />
      <AsyncView
        state={state}
        loading={<SkeletonGrid count={3} className="flex flex-col gap-4" itemClass="h-[120px]" />}
        isEmpty={(page) => page.items.length === 0}
        empty={<EmptyState action={<ButtonLink to="/ofrenda/nueva">Compartir un recuerdo</ButtonLink>}>Todavía no compartes ningún recuerdo.</EmptyState>}
      >
        {(page) => (
          <>
            <ul className="flex flex-col gap-4">
              {page.items.map((post) => {
                const status = REVIEW_STATUS[post.status]
                return (
                  <li key={post.id} className="flex flex-wrap items-center gap-5 rounded-[20px] border border-beige-200 bg-surface py-4 pl-4 pr-6">
                    <ImageWithFallback src={post.imageUrl} alt="Foto del recuerdo" className="size-22 rounded-2xl" />
                    <div className="flex min-w-48 flex-1 flex-col gap-1">
                      <p className="line-clamp-2 font-medium">{post.content}</p>
                      <p className="text-sm text-cafe-700">Publicada el {formatDate(post.createdAt)}</p>
                    </div>
                    <Badge tone={status.tone}>{status.label}</Badge>
                    <Button variant="ghost" size="sm" onClick={() => setToDelete(post)}>
                      Eliminar
                    </Button>
                  </li>
                )
              })}
            </ul>
            <Pagination {...page} onChange={setPage} />
          </>
        )}
      </AsyncView>

      <ConfirmDialog
        open={toDelete !== null}
        title="¿Eliminar este recuerdo?"
        confirmLabel="Sí, eliminar"
        busy={remove.busy}
        error={remove.error}
        onConfirm={confirmDelete}
        onCancel={() => {
          setToDelete(null)
          remove.clearError()
        }}
      >
        Se eliminará tu publicación y su foto. Esta acción no se puede deshacer.
      </ConfirmDialog>
    </div>
  )
}
