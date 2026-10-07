import type { AdoptionRequest } from '../entities/AdoptionRequest'
import type { IAdoptionRequestAdminRepository } from '../repositories/IAdoptionRequestAdminRepository'

export class ApproveAdoptionRequestUseCase {
  constructor(private readonly repository: IAdoptionRequestAdminRepository) {}

  execute(id: string): Promise<AdoptionRequest> {
    return this.repository.approve(id)
  }
}
