import type { MyPost, PostInput } from '../entities/Post'
import type { IPostRepository } from '../repositories/IPostRepository'

export class CreatePostUseCase {
  constructor(private readonly repository: IPostRepository) {}

  execute(input: PostInput): Promise<MyPost> {
    return this.repository.create(input)
  }
}
