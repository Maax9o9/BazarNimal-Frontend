import type { IProductAdminRepository } from '../repositories/IProductAdminRepository'

export class DeleteProductUseCase {
  constructor(private readonly repository: IProductAdminRepository) {}

  execute(id: string): Promise<void> {
    return this.repository.delete(id)
  }
}
