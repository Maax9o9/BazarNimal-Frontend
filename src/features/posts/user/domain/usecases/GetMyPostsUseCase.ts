import type { Page, PageRequest } from '@shared/types/pagination'
import type { MyPost } from '../entities/Post'
import type { IPostRepository } from '../repositories/IPostRepository'

export class GetMyPostsUseCase {
  constructor(private readonly repository: IPostRepository) {}

  execute(page: PageRequest): Promise<Page<MyPost>> {
    return this.repository.getMine(page)
  }
}
