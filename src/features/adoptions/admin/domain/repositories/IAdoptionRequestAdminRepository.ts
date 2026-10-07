import type { Page } from '@shared/types/pagination'
import type { AdoptionRequest, AdoptionRequestQuery } from '../entities/AdoptionRequest'

export interface IAdoptionRequestAdminRepository {
  list(query: AdoptionRequestQuery): Promise<Page<AdoptionRequest>>
  approve(id: string): Promise<AdoptionRequest>
  reject(id: string): Promise<AdoptionRequest>
}
