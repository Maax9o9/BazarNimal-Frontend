import type { Post } from '../entities/Post'
import type { IPostRepository } from '../repositories/IPostRepository'

export class GetApprovedPostsUseCase {
  constructor(private readonly repository: IPostRepository) {}

  execute(limit: number): Promise<Post[]> {
    return this.repository.getApproved(limit)
  }
}
