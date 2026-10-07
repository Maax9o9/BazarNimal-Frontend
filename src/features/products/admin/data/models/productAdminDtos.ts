import type { ProductStatus } from '../../../common/domain/productTypes'

export interface ProductAdminDto {
  id: string
  name: string
  image_url: string | null
  weight_kg: string | null
  pieces: number | null
  status: ProductStatus
  created_at: string
  updated_at: string
}
