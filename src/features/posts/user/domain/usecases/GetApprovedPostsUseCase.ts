import type { Page, PageRequest } from '@shared/types/pagination'
import type { Post } from '../entities/Post'
import type { IPostRepository } from '../repositories/IPostRepository'

export class GetApprovedPostsUseCase {
  constructor(private readonly repository: IPostRepository) {}

  execute(page: PageRequest): Promise<Page<Post>> {
    return this.repository.getApproved(page)
  }
}
