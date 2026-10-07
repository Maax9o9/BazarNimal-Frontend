import type { IPostRepository } from '../repositories/IPostRepository'

export class DeleteMyPostUseCase {
  constructor(private readonly repository: IPostRepository) {}

  execute(id: string): Promise<void> {
    return this.repository.deleteMine(id)
  }
}
