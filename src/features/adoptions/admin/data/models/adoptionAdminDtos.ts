import type { ReviewStatus } from '@shared/constants/reviewStatus'
import type { PetSpecies, PetStatus } from '../../../common/domain/petTypes'

export interface PetAdminDto {
  id: string
  name: string
  species: PetSpecies
  breed: string
  age_years: number
  age_months: number
  image_url: string | null
  status: PetStatus
  created_at: string
  updated_at: string
}

export interface AdoptionRequestAdminDto {
  id: string
  status: ReviewStatus
  pet: { id: string; name: string; status: PetStatus }
  applicant: { id: string; name: string; email: string; phone: string | null }
  reviewed_at: string | null
  created_at: string
}
