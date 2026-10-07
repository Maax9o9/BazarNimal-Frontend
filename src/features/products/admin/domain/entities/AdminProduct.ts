import type { PageRequest } from '@shared/types/pagination'
import type { ProductStatus } from '../../../common/domain/productTypes'

export interface AdminProduct {
  id: string
  name: string
  imageUrl: string | null
  weightKg: number | null
  pieces: number | null
  status: ProductStatus
}

/** Peso y piezas son opcionales: se mandan como texto ("" = sin valor). En edición, `image` null conserva la actual. */
export interface ProductInput {
  name: string
  weightKg: string
  pieces: string
  status: ProductStatus
  image: File | null
}

export interface AdminProductQuery extends PageRequest {
  search?: string
  status?: ProductStatus | ''
}
