import type { AdminPet, PetInput } from '../entities/AdminPet'
import type { IPetAdminRepository } from '../repositories/IPetAdminRepository'

export class CreatePetUseCase {
  constructor(private readonly repository: IPetAdminRepository) {}

  execute(input: PetInput): Promise<AdminPet> {
    return this.repository.create(input)
  }
}
