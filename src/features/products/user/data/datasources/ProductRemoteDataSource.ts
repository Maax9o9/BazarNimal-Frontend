import type { AxiosInstance } from 'axios'
import { PRODUCTS_ROUTES } from '@routes/products.routes'
import type { ApiResponse, PaginatedResponse } from '@shared/types/api'
import { cleanParams } from '@shared/utils/page'
import type { ProductQuery } from '../../domain/entities/Product'
import type { ProductDto } from '../models/productDtos'

export class ProductRemoteDataSource {
  constructor(private readonly http: AxiosInstance) {}

  async list(query: ProductQuery) {
    return (await this.http.get<PaginatedResponse<ProductDto>>(PRODUCTS_ROUTES.user.list, { params: cleanParams(query) })).data
  }

  async get(id: string) {
    return (await this.http.get<ApiResponse<ProductDto>>(PRODUCTS_ROUTES.user.detail(id))).data.data
  }
}
