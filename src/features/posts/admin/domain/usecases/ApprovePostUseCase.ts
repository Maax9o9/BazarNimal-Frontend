import type { AdminPost } from '../entities/AdminPost'
import type { IPostModerationRepository } from '../repositories/IPostModerationRepository'

export class ApprovePostUseCase {
  constructor(private readonly repository: IPostModerationRepository) {}

  execute(id: string): Promise<AdminPost> {
    return this.repository.approve(id)
  }
}
