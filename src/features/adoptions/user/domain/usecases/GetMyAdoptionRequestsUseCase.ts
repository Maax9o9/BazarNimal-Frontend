import type { Page, PageRequest } from '@shared/types/pagination'
import type { MyAdoptionRequest } from '../entities/AdoptionRequest'
import type { IAdoptionRequestRepository } from '../repositories/IAdoptionRequestRepository'

export class GetMyAdoptionRequestsUseCase {
  constructor(private readonly repository: IAdoptionRequestRepository) {}

  execute(page: PageRequest): Promise<Page<MyAdoptionRequest>> {
    return this.repository.getMine(page)
  }
}
