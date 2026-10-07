import type { AxiosInstance } from 'axios'
import { ADOPTIONS_ROUTES } from '@routes/adoptions.routes'
import type { ApiResponse, PaginatedResponse } from '@shared/types/api'
import type { PageRequest } from '@shared/types/pagination'
import type { MyAdoptionRequestDto } from '../models/petDtos'

export class AdoptionRequestRemoteDataSource {
  constructor(private readonly http: AxiosInstance) {}

  async create(petId: string): Promise<MyAdoptionRequestDto> {
    const { data } = await this.http.post<ApiResponse<MyAdoptionRequestDto>>(ADOPTIONS_ROUTES.user.requests, { pet_id: petId })
    return data.data
  }

  async mine(page: PageRequest): Promise<PaginatedResponse<MyAdoptionRequestDto>> {
    const { data } = await this.http.get<PaginatedResponse<MyAdoptionRequestDto>>(ADOPTIONS_ROUTES.user.myRequests, { params: page })
    return data
  }
}
