import type { IPetAdminRepository } from '../repositories/IPetAdminRepository'

export class DeletePetUseCase {
  constructor(private readonly repository: IPetAdminRepository) {}

  execute(id: string): Promise<void> {
    return this.repository.delete(id)
  }
}
