import { useLatestPosts } from '../hooks/useLatestPosts'
import { PapelPicado } from './PapelPicado'
import { PostCard } from './PostCard'

const GRID = 'grid gap-6 md:grid-cols-3'

/** Sección de la ofrenda con el tema "Día de Muertos" (paleta invertida). */
export function OfrendaSection() {
  const state = useLatestPosts()

  return (
    <section id="ofrenda" data-theme="muertos" aria-labelledby="ofrenda-titulo" className="scroll-mt-4 bg-beige-50 text-cafe-900">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-4 pb-18 md:px-20">
        <PapelPicado />
        <header className="flex flex-col gap-2">
          <p className="text-sm font-medium tracking-[0.08em] text-cempasuchil">1 Y 2 DE NOVIEMBRE</p>
          <h2 id="ofrenda-titulo" className="font-display text-h1 font-semibold">
            Ofrenda de Día de Muertos
          </h2>
          <p className="text-body-l text-cafe-700">Recordamos a las mascotas que se adelantaron. Comparte la tuya.</p>
        </header>

        {state.status === 'loading' && (
          <div className={GRID} aria-busy="true">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="h-[401px] animate-pulse rounded-[20px] bg-beige-100" />
            ))}
          </div>
        )}
        {state.status === 'error' && <p className="text-rojo-700">{state.message}</p>}
        {state.status === 'success' && state.data.length === 0 && (
          <p className="rounded-[20px] bg-beige-100 px-6 py-10 text-center text-cafe-700">
            Aún no hay recuerdos en la ofrenda. Pronto encenderemos las primeras veladoras.
          </p>
        )}
        {state.status === 'success' && state.data.length > 0 && (
          <ul className={GRID}>
            {state.data.map((post) => (
              <li key={post.id}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
