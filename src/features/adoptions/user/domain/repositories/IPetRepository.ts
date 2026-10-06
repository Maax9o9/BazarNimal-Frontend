import type { Pet, PetQuery } from '../entities/Pet'

export interface IPetRepository {
  getPets(query: PetQuery): Promise<Pet[]>
}
