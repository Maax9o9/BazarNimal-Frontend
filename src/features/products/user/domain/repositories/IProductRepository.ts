import type { Page } from '@shared/types/pagination'
import type { Product, ProductQuery } from '../entities/Product'

export interface IProductRepository {
  list(query: ProductQuery): Promise<Page<Product>>
  get(id: string): Promise<Product>
}
