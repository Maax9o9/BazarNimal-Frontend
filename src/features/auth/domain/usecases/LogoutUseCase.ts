import type { IAuthRepository } from '../repositories/IAuthRepository'

export class LogoutUseCase {
  constructor(private readonly repository: IAuthRepository) {}

  execute(): Promise<void> {
    return this.repository.logout()
  }
}
