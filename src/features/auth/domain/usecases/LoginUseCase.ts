import type { Credentials, User } from '../entities/User'
import type { IAuthRepository } from '../repositories/IAuthRepository'

export class LoginUseCase {
  constructor(private readonly repository: IAuthRepository) {}

  execute(credentials: Credentials): Promise<User> {
    return this.repository.login(credentials)
  }
}
