import type { Pet, PetQuery } from '../../domain/entities/Pet'
import type { IPetRepository } from '../../domain/repositories/IPetRepository'
import type { PetRemoteDataSource } from '../datasources/PetRemoteDataSource'
import { toPet } from '../mappers/petMapper'

export class PetRepositoryImpl implements IPetRepository {
  constructor(private readonly remote: PetRemoteDataSource) {}

  async getPets(query: PetQuery): Promise<Pet[]> {
    return (await this.remote.list(query)).map(toPet)
  }
}
