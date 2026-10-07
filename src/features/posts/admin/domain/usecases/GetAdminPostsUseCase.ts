import type { Page } from '@shared/types/pagination'
import type { AdminPost, AdminPostQuery } from '../entities/AdminPost'
import type { IPostModerationRepository } from '../repositories/IPostModerationRepository'

export class GetAdminPostsUseCase {
  constructor(private readonly repository: IPostModerationRepository) {}

  execute(query: AdminPostQuery): Promise<Page<AdminPost>> {
    return this.repository.list(query)
  }
}
