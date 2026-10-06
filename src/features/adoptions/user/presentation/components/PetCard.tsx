import { Badge } from '@shared/components/ui/Badge'
import { ImageWithFallback } from '@shared/components/ui/ImageWithFallback'
import type { Pet } from '../../domain/entities/Pet'

const SPECIES = { dog: 'Perro', cat: 'Gato' } as const

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`

const ageLabel = (years: number, months: number) =>
  [years && plural(years, 'año', 'años'), months && plural(months, 'mes', 'meses')].filter(Boolean).join(' ') ||
  'Menos de un mes'

export function PetCard({ pet }: { pet: Pet }) {
  const adopted = pet.status === 'adopted'
  return (
    <article className="flex flex-col overflow-hidden rounded-[20px] border border-beige-200 bg-white">
      <ImageWithFallback src={pet.imageUrl} alt={`Foto de ${pet.name}`} className="h-60 w-full" />
      <div className="flex flex-col gap-2 px-5 pb-5 pt-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="truncate font-display text-h3 font-semibold">{pet.name}</h3>
          <Badge tone={adopted ? 'neutral' : 'success'}>{adopted ? 'Adoptado' : 'Disponible'}</Badge>
        </div>
        <p className="text-sm leading-[1.5] text-cafe-700">
          {SPECIES[pet.species]} · {pet.breed} · {ageLabel(pet.ageYears, pet.ageMonths)}
        </p>
      </div>
    </article>
  )
}
