import type { AxiosInstance } from 'axios'
import { ADOPTIONS_ROUTES } from '@routes/adoptions.routes'
import type { PaginatedResponse } from '@shared/types/api'
import type { PetDto, PetListParamsDto } from '../models/petDtos'

export class PetRemoteDataSource {
  constructor(private readonly http: AxiosInstance) {}

  async list(params: PetListParamsDto): Promise<PetDto[]> {
    const { data } = await this.http.get<PaginatedResponse<PetDto>>(ADOPTIONS_ROUTES.user.pets, { params })
    return data.data
  }
}
