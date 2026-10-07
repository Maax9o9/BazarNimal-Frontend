import type { AdoptionRequest } from '../entities/AdoptionRequest'
import type { IAdoptionRequestAdminRepository } from '../repositories/IAdoptionRequestAdminRepository'

export class RejectAdoptionRequestUseCase {
  constructor(private readonly repository: IAdoptionRequestAdminRepository) {}

  execute(id: string): Promise<AdoptionRequest> {
    return this.repository.reject(id)
  }
}
