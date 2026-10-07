import type { PageRequest } from '@shared/types/pagination'
import type { PetSpecies, PetStatus } from '../../../common/domain/petTypes'

export interface AdminPet {
  id: string
  name: string
  species: PetSpecies
  breed: string
  ageYears: number
  ageMonths: number
  imageUrl: string | null
  status: PetStatus
}

/** Datos para crear o editar. En edición, `image` es opcional (null conserva la actual). */
export interface PetInput {
  name: string
  species: PetSpecies
  breed: string
  ageYears: number
  ageMonths: number
  status: PetStatus
  image: File | null
}

export interface AdminPetQuery extends PageRequest {
  search?: string
  species?: PetSpecies | ''
  status?: PetStatus | ''
}
