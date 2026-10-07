import type { AdminProduct, ProductInput } from '../entities/AdminProduct'
import type { IProductAdminRepository } from '../repositories/IProductAdminRepository'

export class CreateProductUseCase {
  constructor(private readonly repository: IProductAdminRepository) {}

  execute(input: ProductInput): Promise<AdminProduct> {
    return this.repository.create(input)
  }
}
