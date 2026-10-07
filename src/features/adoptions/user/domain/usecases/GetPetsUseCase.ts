import type { Page } from '@shared/types/pagination'
import type { Pet, PetQuery } from '../entities/Pet'
import type { IPetRepository } from '../repositories/IPetRepository'

export class GetPetsUseCase {
  constructor(private readonly repository: IPetRepository) {}

  execute(query: PetQuery): Promise<Page<Pet>> {
    return this.repository.getPets(query)
  }
}
