import type { Product } from '../entities/Product'
import type { IProductRepository } from '../repositories/IProductRepository'

export class GetProductByIdUseCase {
  constructor(private readonly repository: IProductRepository) {}

  execute(id: string): Promise<Product> {
    return this.repository.get(id)
  }
}
