import { toPage } from '@shared/utils/page'
import type { AdoptionRequestQuery } from '../../domain/entities/AdoptionRequest'
import type { IAdoptionRequestAdminRepository } from '../../domain/repositories/IAdoptionRequestAdminRepository'
import type { AdoptionRequestAdminRemoteDataSource } from '../datasources/AdoptionRequestAdminRemoteDataSource'
import { toAdoptionRequest } from '../mappers/adoptionAdminMapper'

export class AdoptionRequestAdminRepositoryImpl implements IAdoptionRequestAdminRepository {
  constructor(private readonly remote: AdoptionRequestAdminRemoteDataSource) {}

  async list(query: AdoptionRequestQuery) {
    return toPage(await this.remote.list(query), toAdoptionRequest)
  }

  async approve(id: string) {
    return toAdoptionRequest(await this.remote.approve(id))
  }

  async reject(id: string) {
    return toAdoptionRequest(await this.remote.reject(id))
  }
}
