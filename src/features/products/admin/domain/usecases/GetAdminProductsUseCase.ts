import type { Page } from '@shared/types/pagination'
import type { AdminProduct, AdminProductQuery } from '../entities/AdminProduct'
import type { IProductAdminRepository } from '../repositories/IProductAdminRepository'

export class GetAdminProductsUseCase {
  constructor(private readonly repository: IProductAdminRepository) {}

  execute(query: AdminProductQuery): Promise<Page<AdminProduct>> {
    return this.repository.list(query)
  }
}
