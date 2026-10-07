import type { Page } from '@shared/types/pagination'
import type { Product, ProductQuery } from '../entities/Product'
import type { IProductRepository } from '../repositories/IProductRepository'

export class GetProductsUseCase {
  constructor(private readonly repository: IProductRepository) {}

  execute(query: ProductQuery): Promise<Page<Product>> {
    return this.repository.list(query)
  }
}
