import type { PageRequest } from '@shared/types/pagination'
import { toPage } from '@shared/utils/page'
import type { PostInput } from '../../domain/entities/Post'
import type { IPostRepository } from '../../domain/repositories/IPostRepository'
import type { PostRemoteDataSource } from '../datasources/PostRemoteDataSource'
import { toMyPost, toPost, toPostForm } from '../mappers/postMapper'

export class PostRepositoryImpl implements IPostRepository {
  constructor(private readonly remote: PostRemoteDataSource) {}

  async getApproved(page: PageRequest) {
    return toPage(await this.remote.listApproved(page), toPost)
  }

  async getApprovedById(id: string) {
    return toPost(await this.remote.getApproved(id))
  }

  async create(input: PostInput) {
    return toMyPost(await this.remote.create(toPostForm(input)))
  }

  async getMine(page: PageRequest) {
    return toPage(await this.remote.mine(page), toMyPost)
  }

  deleteMine(id: string) {
    return this.remote.delete(id)
  }
}
