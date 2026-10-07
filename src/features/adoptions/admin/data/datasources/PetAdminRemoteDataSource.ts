import type { AxiosInstance } from 'axios'
import { ADOPTIONS_ROUTES } from '@routes/adoptions.routes'
import type { ApiResponse, PaginatedResponse } from '@shared/types/api'
import { cleanParams, MULTIPART } from '@shared/utils/page'
import type { AdminPetQuery } from '../../domain/entities/AdminPet'
import type { PetAdminDto } from '../models/adoptionAdminDtos'

const { admin } = ADOPTIONS_ROUTES

export class PetAdminRemoteDataSource {
  constructor(private readonly http: AxiosInstance) {}

  async list(query: AdminPetQuery) {
    return (await this.http.get<PaginatedResponse<PetAdminDto>>(admin.pets, { params: cleanParams(query) })).data
  }

  async get(id: string) {
    return (await this.http.get<ApiResponse<PetAdminDto>>(admin.pet(id))).data.data
  }

  async create(form: FormData) {
    return (await this.http.post<ApiResponse<PetAdminDto>>(admin.pets, form, MULTIPART)).data.data
  }

  async update(id: string, form: FormData) {
    return (await this.http.put<ApiResponse<PetAdminDto>>(admin.pet(id), form, MULTIPART)).data.data
  }

  async delete(id: string) {
    await this.http.delete(admin.pet(id))
  }
}
