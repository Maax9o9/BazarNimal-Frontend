import type { AdminProduct, ProductInput } from '../entities/AdminProduct'
import type { IProductAdminRepository } from '../repositories/IProductAdminRepository'

export class UpdateProductUseCase {
  constructor(private readonly repository: IProductAdminRepository) {}

  execute(id: string, input: ProductInput): Promise<AdminProduct> {
    return this.repository.update(id, input)
  }
}
