import { toFormData } from '@shared/utils/page'
import type { AdminPet, PetInput } from '../../domain/entities/AdminPet'
import type { AdoptionRequest } from '../../domain/entities/AdoptionRequest'
import type { AdoptionRequestAdminDto, PetAdminDto } from '../models/adoptionAdminDtos'

export const toAdminPet = (dto: PetAdminDto): AdminPet => ({
  id: dto.id,
  name: dto.name,
  species: dto.species,
  breed: dto.breed,
  ageYears: dto.age_years,
  ageMonths: dto.age_months,
  imageUrl: dto.image_url,
  status: dto.status,
})

/** PetInput → multipart/form-data con los nombres de campo del backend. */
export const toPetForm = (input: PetInput) =>
  toFormData({
    name: input.name,
    species: input.species,
    breed: input.breed,
    age_years: input.ageYears,
    age_months: input.ageMonths,
    status: input.status,
    image: input.image,
  })

export const toAdoptionRequest = (dto: AdoptionRequestAdminDto): AdoptionRequest => ({
  id: dto.id,
  status: dto.status,
  pet: dto.pet,
  applicant: { name: dto.applicant.name, email: dto.applicant.email, phone: dto.applicant.phone },
  createdAt: new Date(dto.created_at),
})
