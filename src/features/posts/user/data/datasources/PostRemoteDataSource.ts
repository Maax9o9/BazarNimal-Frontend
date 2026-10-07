import type { AxiosInstance } from 'axios'
import { POSTS_ROUTES } from '@routes/posts.routes'
import type { ApiResponse, PaginatedResponse } from '@shared/types/api'
import type { PageRequest } from '@shared/types/pagination'
import { MULTIPART } from '@shared/utils/page'
import type { MyPostDto, PostDto } from '../models/postDtos'

const { user } = POSTS_ROUTES

export class PostRemoteDataSource {
  constructor(private readonly http: AxiosInstance) {}

  async listApproved(page: PageRequest) {
    return (await this.http.get<PaginatedResponse<PostDto>>(user.approved, { params: page })).data
  }

  async getApproved(id: string) {
    return (await this.http.get<ApiResponse<PostDto>>(user.detail(id))).data.data
  }

  async create(form: FormData) {
    return (await this.http.post<ApiResponse<MyPostDto>>(user.approved, form, MULTIPART)).data.data
  }

  async mine(page: PageRequest) {
    return (await this.http.get<PaginatedResponse<MyPostDto>>(user.mine, { params: page })).data
  }

  async delete(id: string) {
    await this.http.delete(user.detail(id))
  }
}
