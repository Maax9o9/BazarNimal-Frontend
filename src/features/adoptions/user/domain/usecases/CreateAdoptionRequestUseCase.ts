import type { MyAdoptionRequest } from '../entities/AdoptionRequest'
import type { IAdoptionRequestRepository } from '../repositories/IAdoptionRequestRepository'

export class CreateAdoptionRequestUseCase {
  constructor(private readonly repository: IAdoptionRequestRepository) {}

  execute(petId: string): Promise<MyAdoptionRequest> {
    return this.repository.create(petId)
  }
}
