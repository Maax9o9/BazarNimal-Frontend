import { ApiError } from '@core/api/apiError'
import type { Credentials, NewUser, User } from '../../domain/entities/User'
import type { IAuthRepository } from '../../domain/repositories/IAuthRepository'
import type { AuthRemoteDataSource } from '../datasources/AuthRemoteDataSource'
import { toUser } from '../mappers/userMapper'

export class AuthRepositoryImpl implements IAuthRepository {
  constructor(private readonly remote: AuthRemoteDataSource) {}

  async login(credentials: Credentials): Promise<User> {
    const session = await this.remote.login(credentials)
    return toUser(session.user)
  }

  async register(newUser: NewUser): Promise<User> {
    return toUser(await this.remote.register(newUser))
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      return toUser(await this.remote.me())
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) return null
      throw error
    }
  }

  logout(): Promise<void> {
    return this.remote.logout()
  }
}
