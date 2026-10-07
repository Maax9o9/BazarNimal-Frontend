import type { Page, PageRequest } from '@shared/types/pagination'
import { toPage } from '@shared/utils/page'
import type { MyAdoptionRequest } from '../../domain/entities/AdoptionRequest'
import type { IAdoptionRequestRepository } from '../../domain/repositories/IAdoptionRequestRepository'
import type { AdoptionRequestRemoteDataSource } from '../datasources/AdoptionRequestRemoteDataSource'
import { toMyAdoptionRequest } from '../mappers/petMapper'

export class AdoptionRequestRepositoryImpl implements IAdoptionRequestRepository {
  constructor(private readonly remote: AdoptionRequestRemoteDataSource) {}

  async create(petId: string): Promise<MyAdoptionRequest> {
    return toMyAdoptionRequest(await this.remote.create(petId))
  }

  async getMine(page: PageRequest): Promise<Page<MyAdoptionRequest>> {
    return toPage(await this.remote.mine(page), toMyAdoptionRequest)
  }
}
