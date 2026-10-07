import type { AxiosInstance } from 'axios'
import { PRODUCTS_ROUTES } from '@routes/products.routes'
import type { ApiResponse, PaginatedResponse } from '@shared/types/api'
import { cleanParams, MULTIPART } from '@shared/utils/page'
import type { AdminProductQuery } from '../../domain/entities/AdminProduct'
import type { ProductAdminDto } from '../models/productAdminDtos'

const { admin } = PRODUCTS_ROUTES

export class ProductAdminRemoteDataSource {
  constructor(private readonly http: AxiosInstance) {}

  async list(query: AdminProductQuery) {
    return (await this.http.get<PaginatedResponse<ProductAdminDto>>(admin.list, { params: cleanParams(query) })).data
  }

  async get(id: string) {
    return (await this.http.get<ApiResponse<ProductAdminDto>>(admin.detail(id))).data.data
  }

  async create(form: FormData) {
    return (await this.http.post<ApiResponse<ProductAdminDto>>(admin.list, form, MULTIPART)).data.data
  }

  async update(id: string, form: FormData) {
    return (await this.http.put<ApiResponse<ProductAdminDto>>(admin.detail(id), form, MULTIPART)).data.data
  }

  async delete(id: string) {
    await this.http.delete(admin.detail(id))
  }
}
