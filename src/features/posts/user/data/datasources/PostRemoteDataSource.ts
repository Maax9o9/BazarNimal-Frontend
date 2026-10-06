import type { AxiosInstance } from 'axios'
import { POSTS_ROUTES } from '@routes/posts.routes'
import type { PaginatedResponse } from '@shared/types/api'
import type { PostDto } from '../models/postDtos'

export class PostRemoteDataSource {
  constructor(private readonly http: AxiosInstance) {}

  async listApproved(limit: number): Promise<PostDto[]> {
    const { data } = await this.http.get<PaginatedResponse<PostDto>>(POSTS_ROUTES.user.approved, { params: { limit } })
    return data.data
  }
}
