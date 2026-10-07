import type { AdminPet, PetInput } from '../entities/AdminPet'
import type { IPetAdminRepository } from '../repositories/IPetAdminRepository'

export class UpdatePetUseCase {
  constructor(private readonly repository: IPetAdminRepository) {}

  execute(id: string, input: PetInput): Promise<AdminPet> {
    return this.repository.update(id, input)
  }
}
