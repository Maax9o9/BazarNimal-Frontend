import type { PageRequest } from '@shared/types/pagination'
import type { PetSort, PetSpecies, PetStatus } from '../../../common/domain/petTypes'

export interface Pet {
  id: string
  name: string
  species: PetSpecies
  breed: string
  ageYears: number
  ageMonths: number
  imageUrl: string | null
  status: PetStatus
}

export interface PetQuery extends PageRequest {
  species?: PetSpecies | ''
  status?: PetStatus | ''
  search?: string
  sort?: PetSort
}
