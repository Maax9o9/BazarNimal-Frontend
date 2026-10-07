import type { PageRequest } from '@shared/types/pagination'
import type { ProductStatus } from '../../../common/domain/productTypes'

export interface Product {
  id: string
  name: string
  imageUrl: string | null
  weightKg: number | null
  pieces: number | null
  status: ProductStatus
}

export interface ProductQuery extends PageRequest {
  search?: string
  status?: ProductStatus | ''
}
