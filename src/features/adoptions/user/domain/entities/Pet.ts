export type PetSpecies = 'dog' | 'cat'
export type PetStatus = 'in_adoption' | 'adopted'

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

export interface PetQuery {
  limit: number
  status?: PetStatus
}
