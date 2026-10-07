import type { Post } from '../entities/Post'
import type { IPostRepository } from '../repositories/IPostRepository'

export class GetApprovedPostByIdUseCase {
  constructor(private readonly repository: IPostRepository) {}

  execute(id: string): Promise<Post> {
    return this.repository.getApprovedById(id)
  }
}
