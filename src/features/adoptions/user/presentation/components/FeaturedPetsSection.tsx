import { ButtonLink } from '@shared/components/ui/Button'
import { useFeaturedPets } from '../hooks/usePets'
import { PetGrid } from './PetGrid'

export function FeaturedPetsSection() {
  const state = useFeaturedPets()

  return (
    <section aria-labelledby="adopta-titulo" className="mx-auto flex max-w-[1440px] flex-col gap-8 px-4 pb-18 pt-12 md:px-10 xl:px-20">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h2 id="adopta-titulo" className="font-display text-h1 font-semibold">
            Buscan un hogar
          </h2>
          <p className="leading-[1.6] text-cafe-700">Mascotas en adopción publicadas por el refugio</p>
        </div>
        <ButtonLink to="/adopta" variant="ghost">
          Ver todas →
        </ButtonLink>
      </header>
      <PetGrid state={state} skeletons={4} empty="Por ahora no hay mascotas en adopción. ¡Vuelve pronto!" />
    </section>
  )
}
