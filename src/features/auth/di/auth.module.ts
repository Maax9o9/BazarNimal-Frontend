import { httpClient } from '@core/api/httpClient'
import type { Container } from '@core/di/container'
import { AuthRemoteDataSource } from '../data/datasources/AuthRemoteDataSource'
import { AuthRepositoryImpl } from '../data/repositories/AuthRepositoryImpl'
import { GetCurrentUserUseCase } from '../domain/usecases/GetCurrentUserUseCase'
import { LoginUseCase } from '../domain/usecases/LoginUseCase'
import { LogoutUseCase } from '../domain/usecases/LogoutUseCase'
import { RegisterUseCase } from '../domain/usecases/RegisterUseCase'
import { AUTH_TOKENS } from './tokens'

export function register(container: Container) {
  container.register(AUTH_TOKENS.repository, () => new AuthRepositoryImpl(new AuthRemoteDataSource(httpClient)))
  container.register(AUTH_TOKENS.login, (c) => new LoginUseCase(c.resolve(AUTH_TOKENS.repository)))
  container.register(AUTH_TOKENS.register, (c) => new RegisterUseCase(c.resolve(AUTH_TOKENS.repository)))
  container.register(AUTH_TOKENS.getCurrentUser, (c) => new GetCurrentUserUseCase(c.resolve(AUTH_TOKENS.repository)))
  container.register(AUTH_TOKENS.logout, (c) => new LogoutUseCase(c.resolve(AUTH_TOKENS.repository)))
}
