import type { Page } from '@shared/types/pagination'
import type { AdminPet, AdminPetQuery, PetInput } from '../entities/AdminPet'

export interface IPetAdminRepository {
  list(query: AdminPetQuery): Promise<Page<AdminPet>>
  get(id: string): Promise<AdminPet>
  create(input: PetInput): Promise<AdminPet>
  update(id: string, input: PetInput): Promise<AdminPet>
  delete(id: string): Promise<void>
}
