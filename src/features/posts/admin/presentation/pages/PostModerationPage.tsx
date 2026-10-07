import { useState } from 'react'
import { AsyncView, EmptyState, SkeletonGrid } from '@shared/components/ui/AsyncView'
import { Badge } from '@shared/components/ui/Badge'
import { Button } from '@shared/components/ui/Button'
import { ChipGroup } from '@shared/components/ui/ChipGroup'
import { ConfirmDialog } from '@shared/components/ui/ConfirmDialog'
import { ImageWithFallback } from '@shared/components/ui/ImageWithFallback'
import { PageHeader } from '@shared/components/ui/PageHeader'
import { Pagination } from '@shared/components/ui/Pagination'
import { REVIEW_STATUS, REVIEW_TABS } from '@shared/constants/reviewStatus'
import { formatDate } from '@shared/utils/format'
import type { AdminPost } from '../../domain/entities/AdminPost'
import { usePostModeration, type Moderation } from '../hooks/usePostModeration'

const GRID = 'grid gap-5 sm:grid-cols-2 xl:grid-cols-3'

const DIALOG: Record<Moderation, { title: string; confirm: string; text: string }> = {
  approve: { title: '¿Aprobar la publicación?', confirm: 'Sí, aprobar', text: 'Se mostrará públicamente en la ofrenda.' },
  reject: { title: '¿Rechazar la publicación?', confirm: 'Sí, rechazar', text: 'Dejará de mostrarse al público. Podrás aprobarla después.' },
  delete: { title: '¿Eliminar la publicación?', confirm: 'Sí, eliminar', text: 'Se borrará junto con su imagen. Esta acción no se puede deshacer.' },
}

export function PostModerationPage() {
  const { query, update, setPage, state, reload, moderate } = usePostModeration()
  const [pending, setPending] = useState<{ post: AdminPost; action: Moderation } | null>(null)
  const dialog = pending ? DIALOG[pending.action] : DIALOG.approve

  const confirm = async () => {
    if (pending && (await moderate.run(pending.post.id, pending.action))) {
      setPending(null)
      reload()
    }
  }

  return (
    <div className="flex flex-col gap-7">
      <PageHeader title="Publicaciones" subtitle="Valida las publicaciones de Día de Muertos antes de mostrarlas al público." />
      <ChipGroup label="Filtrar por estatus" options={REVIEW_TABS} value={query.status} onChange={(status) => update({ status })} />
      <AsyncView
        state={state}
        loading={<SkeletonGrid count={6} className={GRID} itemClass="h-[420px]" />}
        isEmpty={(page) => page.items.length === 0}
        empty={<EmptyState>No hay publicaciones en esta pestaña.</EmptyState>}
      >
        {(page) => (
          <>
            <ul className={GRID}>
              {page.items.map((post) => {
                const status = REVIEW_STATUS[post.status]
                const ask = (action: Moderation) => () => setPending({ post, action })
                return (
                  <li key={post.id} className="flex flex-col overflow-hidden rounded-[20px] border border-beige-200 bg-surface">
                    <ImageWithFallback src={post.imageUrl} alt={`Recuerdo de ${post.authorName}`} className="h-50 w-full" />
                    <div className="flex flex-1 flex-col items-start gap-2.5 px-4 pb-4 pt-3.5">
                      <Badge tone={status.tone}>{status.label}</Badge>
                      <p className="leading-[1.6]">{post.content}</p>
                      <p className="text-sm text-cafe-700">
                        Por {post.authorName} · {formatDate(post.createdAt)}
                      </p>
                      <div className="mt-auto flex flex-wrap gap-2 pt-1">
                        {post.status !== 'approved' && (
                          <Button size="sm" onClick={ask('approve')}>
                            Aprobar
                          </Button>
                        )}
                        {post.status !== 'rejected' && (
                          <Button size="sm" variant="secondary" onClick={ask('reject')}>
                            Rechazar
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" onClick={ask('delete')}>
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
            <Pagination {...page} onChange={setPage} />
          </>
        )}
      </AsyncView>

      <ConfirmDialog
        open={pending !== null}
        title={dialog.title}
        confirmLabel={dialog.confirm}
        busy={moderate.busy}
        error={moderate.error}
        onConfirm={confirm}
        onCancel={() => {
          setPending(null)
          moderate.clearError()
        }}
      >
        {dialog.text}
      </ConfirmDialog>
    </div>
  )
}
