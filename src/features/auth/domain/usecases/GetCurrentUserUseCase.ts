import type { User } from '../entities/User'
import type { IAuthRepository } from '../repositories/IAuthRepository'

export class GetCurrentUserUseCase {
  constructor(private readonly repository: IAuthRepository) {}

  execute(): Promise<User | null> {
    return this.repository.getCurrentUser()
  }
}
