import type { Pet } from '../../domain/entities/Pet'
import type { PetDto } from '../models/petDtos'

export const toPet = (dto: PetDto): Pet => ({
  id: dto.id,
  name: dto.name,
  species: dto.species,
  breed: dto.breed,
  ageYears: dto.age_years,
  ageMonths: dto.age_months,
  imageUrl: dto.image_url,
  status: dto.status,
})
