import { useLocation, useParams } from 'react-router-dom'
import { Link } from '@shared/components/ui/Link'
import { Alert } from '@shared/components/ui/Alert'
import { AsyncView } from '@shared/components/ui/AsyncView'
import { Badge } from '@shared/components/ui/Badge'
import { Button, ButtonLink } from '@shared/components/ui/Button'
import { ImageWithFallback } from '@shared/components/ui/ImageWithFallback'
import { useViewer } from '@shared/hooks/useViewer'
import { PET_STATUS, petAge, SPECIES_LABEL } from '../../../common/presentation/petLabels'
import type { Pet } from '../../domain/entities/Pet'
import { usePetDetail } from '../hooks/usePetDetail'

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-1 flex-col gap-1 rounded-2xl bg-beige-100 px-5 py-4">
      <span className="text-sm text-cafe-700">{label}</span>
      <span className="font-display text-h3 font-semibold">{value}</span>
    </div>
  )
}

function RequestAction({ pet, detail }: { pet: Pet; detail: ReturnType<typeof usePetDetail> }) {
  const { user } = useViewer()
  const location = useLocation()

  if (pet.status === 'adopted') return <p className="text-cafe-700">{pet.name} ya encontró un hogar. 🧡</p>
  if (detail.requested)
    return (
      <div role="status" className="rounded-2xl bg-exito-bg px-5 py-4 text-exito">
        ¡Solicitud enviada! Te llamaremos pronto. Revisa su estatus en{' '}
        <Link to="/mis-solicitudes" className="font-medium underline">
          Mis solicitudes
        </Link>
        .
      </div>
    )
  if (!user)
    return (
      <ButtonLink to="/login" state={{ from: location.pathname }} className="w-full">
        Inicia sesión para solicitar su adopción
      </ButtonLink>
    )
  if (user.role === 'admin') return <p className="text-cafe-700">Las solicitudes se hacen con una cuenta de usuario.</p>
  return (
    <>
      {detail.requestError && <Alert>{detail.requestError}</Alert>}
      <Button onClick={detail.requestAdoption} disabled={detail.requesting} className="w-full">
        {detail.requesting ? 'Enviando solicitud…' : 'Solicitar adopción'}
      </Button>
    </>
  )
}

export function PetDetailPage() {
  const { id = '' } = useParams()
  const detail = usePetDetail(id)

  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 pb-20 pt-10 md:px-10 xl:px-20">
      <nav aria-label="Ruta" className="text-sm text-cafe-700">
        <Link to="/adopta" className="hover:underline">
          Adopta
        </Link>
        {detail.state.status === 'success' && <span> / {detail.state.data.name}</span>}
      </nav>
      <AsyncView state={detail.state}>
        {(pet) => (
          <article className="flex flex-col gap-10 lg:flex-row lg:gap-16">
            <ImageWithFallback src={pet.imageUrl} alt={`Foto de ${pet.name}`} className="h-72 w-full rounded-[32px] sm:h-[420px] lg:h-[520px] lg:w-[min(640px,50%)] lg:shrink-0" />
            <div className="flex flex-1 flex-col gap-6">
              <div className="flex flex-wrap items-center gap-4">
                <h1 className="font-display text-display font-semibold">{pet.name}</h1>
                <Badge tone={PET_STATUS[pet.status].tone}>{PET_STATUS[pet.status].label}</Badge>
              </div>
              <div className="flex flex-wrap gap-4">
                <Fact label="Especie" value={SPECIES_LABEL[pet.species]} />
                <Fact label="Raza" value={pet.breed} />
                <Fact label="Edad" value={petAge(pet.ageYears, pet.ageMonths)} />
              </div>
              <div className="flex flex-col gap-2 rounded-2xl bg-pendiente-bg px-5 py-4">
                <span className="text-sm font-medium text-pendiente">¿Cómo funciona?</span>
                <p className="leading-[1.6]">
                  Envía tu solicitud y el refugio te llamará al teléfono de tu cuenta para agendar una visita. Solo puedes tener
                  una solicitud pendiente por mascota.
                </p>
              </div>
              <RequestAction pet={pet} detail={detail} />
            </div>
          </article>
        )}
      </AsyncView>
    </div>
  )
}
