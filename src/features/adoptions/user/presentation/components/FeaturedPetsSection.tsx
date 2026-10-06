import { useFeaturedPets } from '../hooks/useFeaturedPets'
import { PetCard } from './PetCard'

const GRID = 'grid gap-6 sm:grid-cols-2 lg:grid-cols-4'

export function FeaturedPetsSection() {
  const state = useFeaturedPets()

  return (
    <section id="adopta" aria-labelledby="adopta-titulo" className="mx-auto flex max-w-[1440px] scroll-mt-4 flex-col gap-8 px-4 pb-18 pt-12 md:px-20">
      <header className="flex flex-col gap-2">
        <h2 id="adopta-titulo" className="font-display text-h1 font-semibold">
          Buscan un hogar
        </h2>
        <p className="leading-[1.6] text-cafe-700">Mascotas en adopción publicadas por el refugio</p>
      </header>

      {state.status === 'loading' && (
        <div className={GRID} aria-busy="true">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="h-[335px] animate-pulse rounded-[20px] bg-beige-100" />
          ))}
        </div>
      )}
      {state.status === 'error' && <p className="text-rojo-700">{state.message}</p>}
      {state.status === 'success' && state.data.length === 0 && (
        <p className="rounded-[20px] bg-beige-100 px-6 py-10 text-center text-cafe-700">
          Por ahora no hay mascotas en adopción. ¡Vuelve pronto!
        </p>
      )}
      {state.status === 'success' && state.data.length > 0 && (
        <ul className={GRID}>
          {state.data.map((pet) => (
            <li key={pet.id}>
              <PetCard pet={pet} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
