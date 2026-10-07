import type { Pet } from '../entities/Pet'
import type { IPetRepository } from '../repositories/IPetRepository'

export class GetPetByIdUseCase {
  constructor(private readonly repository: IPetRepository) {}

  execute(id: string): Promise<Pet> {
    return this.repository.getPet(id)
  }
}
