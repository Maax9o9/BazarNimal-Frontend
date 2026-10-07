import type { ReviewStatus } from '@shared/constants/reviewStatus'
import type { PetSpecies } from '../../../common/domain/petTypes'

export interface MyAdoptionRequest {
  id: string
  status: ReviewStatus
  pet: { id: string; name: string; species: PetSpecies; imageUrl: string | null }
  createdAt: Date
}
