import type { Page } from '@shared/types/pagination'
import type { AdminProduct, AdminProductQuery, ProductInput } from '../entities/AdminProduct'

export interface IProductAdminRepository {
  list(query: AdminProductQuery): Promise<Page<AdminProduct>>
  get(id: string): Promise<AdminProduct>
  create(input: ProductInput): Promise<AdminProduct>
  update(id: string, input: ProductInput): Promise<AdminProduct>
  delete(id: string): Promise<void>
}
