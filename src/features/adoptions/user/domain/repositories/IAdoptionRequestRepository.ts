import type { Page, PageRequest } from '@shared/types/pagination'
import type { MyAdoptionRequest } from '../entities/AdoptionRequest'

export interface IAdoptionRequestRepository {
  create(petId: string): Promise<MyAdoptionRequest>
  getMine(page: PageRequest): Promise<Page<MyAdoptionRequest>>
}
