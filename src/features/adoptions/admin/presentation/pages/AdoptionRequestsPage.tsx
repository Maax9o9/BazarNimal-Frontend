import { useState } from 'react'
import { AsyncView, EmptyState } from '@shared/components/ui/AsyncView'
import { Badge } from '@shared/components/ui/Badge'
import { Button } from '@shared/components/ui/Button'
import { ChipGroup } from '@shared/components/ui/ChipGroup'
import { ConfirmDialog } from '@shared/components/ui/ConfirmDialog'
import { DataTable, type Column } from '@shared/components/ui/DataTable'
import { PageHeader } from '@shared/components/ui/PageHeader'
import { Pagination } from '@shared/components/ui/Pagination'
import { REVIEW_STATUS, REVIEW_TABS } from '@shared/constants/reviewStatus'
import { formatDate } from '@shared/utils/format'
import type { AdoptionRequest } from '../../domain/entities/AdoptionRequest'
import { useAdoptionRequests } from '../hooks/useAdoptionRequests'

type Decision = { request: AdoptionRequest; decision: 'approve' | 'reject' }

export function AdoptionRequestsPage() {
  const { query, update, setPage, state, reload, review } = useAdoptionRequests()
  const [pending, setPending] = useState<Decision | null>(null)

  const confirm = async () => {
    if (pending && (await review.run(pending.request.id, pending.decision))) {
      setPending(null)
      reload()
    }
  }

  const columns: Column<AdoptionRequest>[] = [
    { header: 'Mascota', cell: (r) => <span className="font-medium">{r.pet.name}</span> },
    {
      header: 'Solicitante',
      cell: (r) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium">{r.applicant.name}</span>
          <a href={`mailto:${r.applicant.email}`} className="break-all text-sm text-cafe-700 hover:underline">
            {r.applicant.email}
          </a>
        </div>
      ),
    },
    { header: 'Teléfono', cell: (r) => (r.applicant.phone ? <a href={`tel:${r.applicant.phone}`}>{r.applicant.phone}</a> : '—') },
    { header: 'Fecha', cell: (r) => formatDate(r.createdAt) },
    { header: 'Estatus', cell: (r) => <Badge tone={REVIEW_STATUS[r.status].tone}>{REVIEW_STATUS[r.status].label}</Badge> },
    {
      header: 'Acciones',
      className: 'text-right',
      cell: (r) =>
        r.status === 'pending' && (
          <div className="flex justify-end gap-1">
            <Button variant="ghost" size="sm" onClick={() => setPending({ request: r, decision: 'reject' })}>
              Rechazar
            </Button>
            <Button size="sm" onClick={() => setPending({ request: r, decision: 'approve' })}>
              Aprobar
            </Button>
          </div>
        ),
    },
  ]

  const approving = pending?.decision === 'approve'

  return (
    <div className="flex flex-col gap-7">
      <PageHeader
        title="Solicitudes de adopción"
        subtitle="Llama al solicitante antes de aprobar. Al aprobar, las demás solicitudes de esa mascota se rechazan."
      />
      <ChipGroup label="Filtrar por estatus" options={REVIEW_TABS} value={query.status} onChange={(status) => update({ status })} />
      <AsyncView state={state} isEmpty={(page) => page.items.length === 0} empty={<EmptyState>No hay solicitudes en esta pestaña.</EmptyState>}>
        {(page) => (
          <>
            <DataTable caption="Solicitudes de adopción" columns={columns} rows={page.items} rowKey={(r) => r.id} />
            <Pagination {...page} onChange={setPage} />
          </>
        )}
      </AsyncView>

      <ConfirmDialog
        open={pending !== null}
        title={approving ? '¿Aprobar la solicitud?' : '¿Rechazar la solicitud?'}
        confirmLabel={approving ? 'Sí, aprobar' : 'Sí, rechazar'}
        busy={review.busy}
        error={review.error}
        onConfirm={confirm}
        onCancel={() => {
          setPending(null)
          review.clearError()
        }}
      >
        {approving
          ? `${pending?.request.pet.name} pasará a "Adoptado" y las demás solicitudes pendientes de esta mascota se rechazarán.`
          : `La solicitud de ${pending?.request.applicant.name} para ${pending?.request.pet.name} se marcará como rechazada.`}
      </ConfirmDialog>
    </div>
  )
}
