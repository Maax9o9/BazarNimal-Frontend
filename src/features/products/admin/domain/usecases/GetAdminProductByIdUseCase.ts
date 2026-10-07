import type { AdminProduct } from '../entities/AdminProduct'
import type { IProductAdminRepository } from '../repositories/IProductAdminRepository'

export class GetAdminProductByIdUseCase {
  constructor(private readonly repository: IProductAdminRepository) {}

  execute(id: string): Promise<AdminProduct> {
    return this.repository.get(id)
  }
}
