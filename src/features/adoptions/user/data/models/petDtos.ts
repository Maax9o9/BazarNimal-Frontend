import type { ReviewStatus } from '@shared/constants/reviewStatus'
import type { PetSpecies, PetStatus } from '../../../common/domain/petTypes'

export interface PetDto {
  id: string
  name: string
  species: PetSpecies
  breed: string
  age_years: number
  age_months: number
  image_url: string | null
  status: PetStatus
}

export interface MyAdoptionRequestDto {
  id: string
  status: ReviewStatus
  pet: { id: string; name: string; species: PetSpecies; image_url: string | null }
  created_at: string
}
