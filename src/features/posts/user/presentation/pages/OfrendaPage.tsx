import { Pagination } from '@shared/components/ui/Pagination'
import { PapelPicado } from '../components/PapelPicado'
import { PostGrid } from '../components/PostGrid'
import { ShareButton } from '../components/ShareButton'
import { useOfrenda } from '../hooks/usePosts'

export function OfrendaPage() {
  const { state, setPage } = useOfrenda()

  return (
    <>
      <div className="bg-beige-100">
        <PapelPicado />
        <header className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-6 border-b-[3px] border-cempasuchil px-4 py-14 md:px-10 xl:px-20">
          <div className="flex max-w-2xl flex-col gap-2.5">
            <p className="text-sm font-medium tracking-[0.08em] text-cempasuchil">1 Y 2 DE NOVIEMBRE</p>
            <h1 className="font-display text-display font-semibold">Ofrenda de Día de Muertos</h1>
            <p className="text-body-l text-cafe-700">
              Un espacio para recordar a las mascotas que se adelantaron. Cada publicación la revisa el equipo antes de mostrarse.
            </p>
          </div>
          <ShareButton />
        </header>
      </div>
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-4 pb-20 pt-12 md:px-10 xl:px-20">
        <PostGrid state={state} skeletons={6} />
        {state.status === 'success' && <Pagination {...state.data} onChange={setPage} />}
      </div>
    </>
  )
}
