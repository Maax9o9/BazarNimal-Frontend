import { toPage } from '@shared/utils/page'
import type { AdminPetQuery, PetInput } from '../../domain/entities/AdminPet'
import type { IPetAdminRepository } from '../../domain/repositories/IPetAdminRepository'
import type { PetAdminRemoteDataSource } from '../datasources/PetAdminRemoteDataSource'
import { toAdminPet, toPetForm } from '../mappers/adoptionAdminMapper'

export class PetAdminRepositoryImpl implements IPetAdminRepository {
  constructor(private readonly remote: PetAdminRemoteDataSource) {}

  async list(query: AdminPetQuery) {
    return toPage(await this.remote.list(query), toAdminPet)
  }

  async get(id: string) {
    return toAdminPet(await this.remote.get(id))
  }

  async create(input: PetInput) {
    return toAdminPet(await this.remote.create(toPetForm(input)))
  }

  async update(id: string, input: PetInput) {
    return toAdminPet(await this.remote.update(id, toPetForm(input)))
  }

  delete(id: string) {
    return this.remote.delete(id)
  }
}
