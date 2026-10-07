import type { Page } from '@shared/types/pagination'
import type { Pet, PetQuery } from '../entities/Pet'

export interface IPetRepository {
  getPets(query: PetQuery): Promise<Page<Pet>>
  getPet(id: string): Promise<Pet>
}
