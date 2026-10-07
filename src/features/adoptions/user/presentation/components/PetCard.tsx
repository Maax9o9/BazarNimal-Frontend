import { Link } from '@shared/components/ui/Link'
import { Badge } from '@shared/components/ui/Badge'
import { ImageWithFallback } from '@shared/components/ui/ImageWithFallback'
import { PET_STATUS, petAge, SPECIES_LABEL } from '../../../common/presentation/petLabels'
import type { Pet } from '../../domain/entities/Pet'

export function PetCard({ pet }: { pet: Pet }) {
  const status = PET_STATUS[pet.status]
  return (
    <Link
      to={`/adopta/${pet.id}`}
      className="flex h-full flex-col overflow-hidden rounded-[20px] border border-beige-200 bg-surface transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-rojo-500"
    >
      <ImageWithFallback src={pet.imageUrl} alt={`Foto de ${pet.name}`} className="h-60 w-full" />
      <div className="flex flex-col gap-2 px-5 pb-5 pt-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="truncate font-display text-h3 font-semibold">{pet.name}</h3>
          <Badge tone={status.tone}>{status.label}</Badge>
        </div>
        <p className="text-sm leading-[1.5] text-cafe-700">
          {SPECIES_LABEL[pet.species]} · {pet.breed} · {petAge(pet.ageYears, pet.ageMonths)}
        </p>
      </div>
    </Link>
  )
}
