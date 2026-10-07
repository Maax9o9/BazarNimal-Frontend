import type { Page } from '@shared/types/pagination'
import type { AdoptionRequest, AdoptionRequestQuery } from '../entities/AdoptionRequest'
import type { IAdoptionRequestAdminRepository } from '../repositories/IAdoptionRequestAdminRepository'

export class GetAdoptionRequestsUseCase {
  constructor(private readonly repository: IAdoptionRequestAdminRepository) {}

  execute(query: AdoptionRequestQuery): Promise<Page<AdoptionRequest>> {
    return this.repository.list(query)
  }
}
