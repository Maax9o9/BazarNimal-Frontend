import type { Page } from '@shared/types/pagination'
import { toPage } from '@shared/utils/page'
import type { Pet, PetQuery } from '../../domain/entities/Pet'
import type { IPetRepository } from '../../domain/repositories/IPetRepository'
import type { PetRemoteDataSource } from '../datasources/PetRemoteDataSource'
import { toPet } from '../mappers/petMapper'

export class PetRepositoryImpl implements IPetRepository {
  constructor(private readonly remote: PetRemoteDataSource) {}

  async getPets(query: PetQuery): Promise<Page<Pet>> {
    return toPage(await this.remote.list(query), toPet)
  }

  async getPet(id: string): Promise<Pet> {
    return toPet(await this.remote.get(id))
  }
}
