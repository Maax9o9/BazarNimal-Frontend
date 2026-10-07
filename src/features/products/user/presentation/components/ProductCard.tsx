import { Link } from '@shared/components/ui/Link'
import { Badge } from '@shared/components/ui/Badge'
import { ImageWithFallback } from '@shared/components/ui/ImageWithFallback'
import { PRODUCT_STATUS, productMeasure } from '../../../common/presentation/productLabels'
import type { Product } from '../../domain/entities/Product'

export function ProductCard({ product }: { product: Product }) {
  const status = PRODUCT_STATUS[product.status]
  return (
    <Link
      to={`/tienda/${product.id}`}
      className="flex h-full flex-col overflow-hidden rounded-[20px] border border-beige-200 bg-surface transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-rojo-500"
    >
      <ImageWithFallback src={product.imageUrl} alt={product.name} className="h-50 w-full" />
      <div className="flex flex-1 flex-col items-start gap-2 px-5 pb-5 pt-4">
        <h3 className="font-display text-h3 font-semibold">{product.name}</h3>
        <p className="text-sm text-cafe-700">{productMeasure(product.weightKg, product.pieces)}</p>
        <Badge tone={status.tone}>{status.label}</Badge>
      </div>
    </Link>
  )
}
