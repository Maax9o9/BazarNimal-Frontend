import type { MyAdoptionRequest } from '../../domain/entities/AdoptionRequest'
import type { Pet } from '../../domain/entities/Pet'
import type { MyAdoptionRequestDto, PetDto } from '../models/petDtos'

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

export const toMyAdoptionRequest = (dto: MyAdoptionRequestDto): MyAdoptionRequest => ({
  id: dto.id,
  status: dto.status,
  pet: { id: dto.pet.id, name: dto.pet.name, species: dto.pet.species, imageUrl: dto.pet.image_url },
  createdAt: new Date(dto.created_at),
})
