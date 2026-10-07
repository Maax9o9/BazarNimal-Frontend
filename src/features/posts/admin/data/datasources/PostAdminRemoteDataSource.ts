import type { AxiosInstance } from 'axios'
import { POSTS_ROUTES } from '@routes/posts.routes'
import type { ApiResponse, PaginatedResponse } from '@shared/types/api'
import { cleanParams } from '@shared/utils/page'
import type { AdminPostQuery } from '../../domain/entities/AdminPost'
import type { PostAdminDto } from '../models/postAdminDtos'

const { admin } = POSTS_ROUTES

export class PostAdminRemoteDataSource {
  constructor(private readonly http: AxiosInstance) {}

  async list(query: AdminPostQuery) {
    return (await this.http.get<PaginatedResponse<PostAdminDto>>(admin.list, { params: cleanParams(query) })).data
  }

  async approve(id: string) {
    return (await this.http.patch<ApiResponse<PostAdminDto>>(admin.approve(id))).data.data
  }

  async reject(id: string) {
    return (await this.http.patch<ApiResponse<PostAdminDto>>(admin.reject(id))).data.data
  }

  async delete(id: string) {
    await this.http.delete(admin.detail(id))
  }
}
