import type { IPostModerationRepository } from '../repositories/IPostModerationRepository'

export class DeletePostUseCase {
  constructor(private readonly repository: IPostModerationRepository) {}

  execute(id: string): Promise<void> {
    return this.repository.delete(id)
  }
}
