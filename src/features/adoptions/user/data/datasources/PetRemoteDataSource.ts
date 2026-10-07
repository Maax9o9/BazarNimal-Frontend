import type { AxiosInstance } from 'axios'
import { ADOPTIONS_ROUTES } from '@routes/adoptions.routes'
import type { ApiResponse, PaginatedResponse } from '@shared/types/api'
import { cleanParams } from '@shared/utils/page'
import type { PetQuery } from '../../domain/entities/Pet'
import type { PetDto } from '../models/petDtos'

export class PetRemoteDataSource {
  constructor(private readonly http: AxiosInstance) {}

  async list(query: PetQuery): Promise<PaginatedResponse<PetDto>> {
    const { data } = await this.http.get<PaginatedResponse<PetDto>>(ADOPTIONS_ROUTES.user.pets, { params: cleanParams(query) })
    return data
  }

  async get(id: string): Promise<PetDto> {
    const { data } = await this.http.get<ApiResponse<PetDto>>(ADOPTIONS_ROUTES.user.pet(id))
    return data.data
  }
}
