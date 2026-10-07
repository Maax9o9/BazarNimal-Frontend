import type { AdminPet } from '../entities/AdminPet'
import type { IPetAdminRepository } from '../repositories/IPetAdminRepository'

export class GetAdminPetByIdUseCase {
  constructor(private readonly repository: IPetAdminRepository) {}

  execute(id: string): Promise<AdminPet> {
    return this.repository.get(id)
  }
}
