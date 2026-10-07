import { Link } from '@shared/components/ui/Link'
import { AsyncView, EmptyState, SkeletonGrid } from '@shared/components/ui/AsyncView'
import { Badge } from '@shared/components/ui/Badge'
import { ButtonLink } from '@shared/components/ui/Button'
import { ImageWithFallback } from '@shared/components/ui/ImageWithFallback'
import { PageHeader } from '@shared/components/ui/PageHeader'
import { Pagination } from '@shared/components/ui/Pagination'
import { REVIEW_STATUS } from '@shared/constants/reviewStatus'
import { formatDate } from '@shared/utils/format'
import { SPECIES_LABEL } from '../../../common/presentation/petLabels'
import { useMyRequests } from '../hooks/useMyRequests'

export function MyRequestsPage() {
  const { state, setPage } = useMyRequests()

  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 pb-20 pt-14 md:px-10 xl:px-20">
      <PageHeader title="Mis solicitudes" subtitle="Te llamaremos al teléfono de tu cuenta cuando revisemos tu solicitud." />
      <AsyncView
        state={state}
        loading={<SkeletonGrid count={3} className="flex flex-col gap-4" itemClass="h-[120px]" />}
        isEmpty={(page) => page.items.length === 0}
        empty={<EmptyState action={<ButtonLink to="/adopta">Conocer mascotas</ButtonLink>}>Aún no has solicitado ninguna adopción.</EmptyState>}
      >
        {(page) => (
          <>
            <ul className="flex flex-col gap-4">
              {page.items.map((request) => {
                const status = REVIEW_STATUS[request.status]
                return (
                  <li key={request.id} className="flex flex-wrap items-center gap-5 rounded-[20px] border border-beige-200 bg-surface py-4 pl-4 pr-6">
                    <ImageWithFallback src={request.pet.imageUrl} alt={`Foto de ${request.pet.name}`} className="size-22 rounded-2xl" />
                    <div className="flex min-w-40 flex-1 flex-col gap-1">
                      <h2 className="font-display text-h3 font-semibold">{request.pet.name}</h2>
                      <p className="text-sm text-cafe-700">
                        {SPECIES_LABEL[request.pet.species]} · Enviada el {formatDate(request.createdAt)}
                      </p>
                    </div>
                    <Badge tone={status.tone}>{status.label}</Badge>
                    <Link to={`/adopta/${request.pet.id}`} className="text-sm font-semibold hover:underline">
                      Ver mascota
                    </Link>
                  </li>
                )
              })}
            </ul>
            <Pagination {...page} onChange={setPage} />
          </>
        )}
      </AsyncView>
    </div>
  )
}
