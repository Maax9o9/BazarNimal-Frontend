import type { AxiosInstance } from 'axios'
import { ADOPTIONS_ROUTES } from '@routes/adoptions.routes'
import type { ApiResponse, PaginatedResponse } from '@shared/types/api'
import { cleanParams } from '@shared/utils/page'
import type { AdoptionRequestQuery } from '../../domain/entities/AdoptionRequest'
import type { AdoptionRequestAdminDto } from '../models/adoptionAdminDtos'

const { admin } = ADOPTIONS_ROUTES

export class AdoptionRequestAdminRemoteDataSource {
  constructor(private readonly http: AxiosInstance) {}

  async list(query: AdoptionRequestQuery) {
    return (await this.http.get<PaginatedResponse<AdoptionRequestAdminDto>>(admin.requests, { params: cleanParams(query) })).data
  }

  async approve(id: string) {
    return (await this.http.patch<ApiResponse<AdoptionRequestAdminDto>>(admin.approve(id))).data.data
  }

  async reject(id: string) {
    return (await this.http.patch<ApiResponse<AdoptionRequestAdminDto>>(admin.reject(id))).data.data
  }
}
