import type { NewUser, User } from '../entities/User'
import type { IAuthRepository } from '../repositories/IAuthRepository'

export class RegisterUseCase {
  constructor(private readonly repository: IAuthRepository) {}

  execute(newUser: NewUser): Promise<User> {
    return this.repository.register(newUser)
  }
}
