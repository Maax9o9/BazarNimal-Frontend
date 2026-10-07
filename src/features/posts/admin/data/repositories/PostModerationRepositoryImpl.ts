import { toPage } from '@shared/utils/page'
import type { AdminPostQuery } from '../../domain/entities/AdminPost'
import type { IPostModerationRepository } from '../../domain/repositories/IPostModerationRepository'
import type { PostAdminRemoteDataSource } from '../datasources/PostAdminRemoteDataSource'
import { toAdminPost } from '../mappers/postAdminMapper'

export class PostModerationRepositoryImpl implements IPostModerationRepository {
  constructor(private readonly remote: PostAdminRemoteDataSource) {}

  async list(query: AdminPostQuery) {
    return toPage(await this.remote.list(query), toAdminPost)
  }

  async approve(id: string) {
    return toAdminPost(await this.remote.approve(id))
  }

  async reject(id: string) {
    return toAdminPost(await this.remote.reject(id))
  }

  delete(id: string) {
    return this.remote.delete(id)
  }
}
