import type { Page } from '@shared/types/pagination'
import type { AdminPet, AdminPetQuery } from '../entities/AdminPet'
import type { IPetAdminRepository } from '../repositories/IPetAdminRepository'

export class GetAdminPetsUseCase {
  constructor(private readonly repository: IPetAdminRepository) {}

  execute(query: AdminPetQuery): Promise<Page<AdminPet>> {
    return this.repository.list(query)
  }
}
