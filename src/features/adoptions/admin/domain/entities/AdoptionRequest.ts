import type { ReviewStatus } from '@shared/constants/reviewStatus'
import type { PageRequest } from '@shared/types/pagination'
import type { PetStatus } from '../../../common/domain/petTypes'

export interface AdoptionRequest {
  id: string
  status: ReviewStatus
  pet: { id: string; name: string; status: PetStatus }
  applicant: { name: string; email: string; phone: string | null }
  createdAt: Date
}

export interface AdoptionRequestQuery extends PageRequest {
  status?: ReviewStatus | ''
}
