import type { ProductStatus } from '../../../common/domain/productTypes'

export interface ProductDto {
  id: string
  name: string
  image_url: string | null
  /** Decimal serializado como texto, p. ej. "4.000". */
  weight_kg: string | null
  pieces: number | null
  status: ProductStatus
}
