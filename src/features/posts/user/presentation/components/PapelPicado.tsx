import cempasuchil from '../assets/banderin-cempasuchil.svg'
import rojo from '../assets/banderin-rojo.svg'
import rosa from '../assets/banderin-rosa.svg'
import verde from '../assets/banderin-verde.svg'

// Mismo ciclo de colores que en Figma.
const CYCLE = [cempasuchil, rosa, rojo, verde, cempasuchil, rosa]
const FLAGS = 27

export function PapelPicado() {
  return (
    <div aria-hidden="true" className="overflow-hidden">
      <div className="h-0.5 bg-beige-400" />
      <div className="flex gap-2.5 pl-2">
        {Array.from({ length: FLAGS }, (_, i) => (
          <img key={i} src={CYCLE[i % CYCLE.length]} alt="" width={36} height={32} className="shrink-0" />
        ))}
      </div>
    </div>
  )
}
