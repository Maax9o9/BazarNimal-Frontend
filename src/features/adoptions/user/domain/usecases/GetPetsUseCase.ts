import type { Pet, PetQuery } from '../entities/Pet'
import type { IPetRepository } from '../repositories/IPetRepository'

export class GetPetsUseCase {
  constructor(private readonly repository: IPetRepository) {}

  execute(query: PetQuery): Promise<Pet[]> {
    return this.repository.getPets(query)
  }
}
