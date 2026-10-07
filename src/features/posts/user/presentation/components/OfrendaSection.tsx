import { ButtonLink } from '@shared/components/ui/Button'
import { useLatestPosts } from '../hooks/usePosts'
import { PapelPicado } from './PapelPicado'
import { PostGrid } from './PostGrid'
import { ShareButton } from './ShareButton'

/** Sección de la ofrenda en el inicio, con el tema "Día de Muertos" (paleta invertida). */
export function OfrendaSection() {
  const state = useLatestPosts()

  return (
    <section data-theme="muertos" aria-labelledby="ofrenda-titulo" className="bg-beige-50 text-cafe-900">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-4 pb-18 md:px-10 xl:px-20">
        <PapelPicado />
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium tracking-[0.08em] text-cempasuchil">1 Y 2 DE NOVIEMBRE</p>
            <h2 id="ofrenda-titulo" className="font-display text-h1 font-semibold">
              Ofrenda de Día de Muertos
            </h2>
            <p className="text-body-l text-cafe-700">Recordamos a las mascotas que se adelantaron. Comparte la tuya.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink to="/ofrenda" variant="ghost">
              Ver la ofrenda →
            </ButtonLink>
            <ShareButton />
          </div>
        </header>
        <PostGrid state={state} skeletons={3} />
      </div>
    </section>
  )
}
