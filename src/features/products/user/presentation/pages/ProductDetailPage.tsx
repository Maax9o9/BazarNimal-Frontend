import { useParams } from 'react-router-dom'
import { Link } from '@shared/components/ui/Link'
import { AsyncView } from '@shared/components/ui/AsyncView'
import { Badge } from '@shared/components/ui/Badge'
import { ImageWithFallback } from '@shared/components/ui/ImageWithFallback'
import { PRODUCT_STATUS, piecesLabel, weightLabel } from '../../../common/presentation/productLabels'
import { useProductDetail } from '../hooks/useProducts'

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-1 flex-col gap-1 rounded-2xl bg-beige-100 px-5 py-4">
      <span className="text-sm text-cafe-700">{label}</span>
      <span className="font-display text-h3 font-semibold">{value}</span>
    </div>
  )
}

export function ProductDetailPage() {
  const { id = '' } = useParams()
  const state = useProductDetail(id)

  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 pb-20 pt-10 md:px-10 xl:px-20">
      <nav aria-label="Ruta" className="text-sm text-cafe-700">
        <Link to="/tienda" className="hover:underline">
          Tienda
        </Link>
        {state.status === 'success' && <span> / {state.data.name}</span>}
      </nav>
      <AsyncView state={state}>
        {(product) => {
          const status = PRODUCT_STATUS[product.status]
          const available = product.status === 'available'
          return (
            <article className="flex flex-col gap-10 lg:flex-row lg:gap-16">
              <ImageWithFallback src={product.imageUrl} alt={product.name} className="h-72 w-full rounded-[32px] sm:h-[400px] lg:h-[480px] lg:w-[min(560px,50%)] lg:shrink-0" />
              <div className="flex flex-1 flex-col items-start gap-6">
                <h1 className="font-display text-display font-semibold">{product.name}</h1>
                <Badge tone={status.tone}>{status.label}</Badge>
                <div className="flex w-full flex-wrap gap-4">
                  <Fact label="Peso" value={weightLabel(product.weightKg)} />
                  <Fact label="Piezas" value={piecesLabel(product.pieces)} />
                </div>
                <div className="flex w-full flex-col gap-1.5 rounded-2xl bg-beige-100 px-5 py-4">
                  <span className="text-sm font-medium">{available ? 'Disponible en tienda física' : 'Por ahora está agotado'}</span>
                  <p className="leading-[1.6] text-cafe-700">
                    {available
                      ? 'La existencia se actualiza desde el inventario. Visítanos para comprarlo.'
                      : 'Vuelve a consultar pronto: actualizamos la existencia en cuanto llega.'}
                  </p>
                </div>
              </div>
            </article>
          )
        }}
      </AsyncView>
    </div>
  )
}
