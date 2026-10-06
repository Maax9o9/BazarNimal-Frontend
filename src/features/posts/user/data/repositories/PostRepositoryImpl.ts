import type { Post } from '../../domain/entities/Post'
import type { IPostRepository } from '../../domain/repositories/IPostRepository'
import type { PostRemoteDataSource } from '../datasources/PostRemoteDataSource'
import { toPost } from '../mappers/postMapper'

export class PostRepositoryImpl implements IPostRepository {
  constructor(private readonly remote: PostRemoteDataSource) {}

  async getApproved(limit: number): Promise<Post[]> {
    return (await this.remote.listApproved(limit)).map(toPost)
  }
}
