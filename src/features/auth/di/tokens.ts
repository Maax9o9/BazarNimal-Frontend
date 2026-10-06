import { createToken } from '@core/di/container'
import type { IAuthRepository } from '../domain/repositories/IAuthRepository'
import type { GetCurrentUserUseCase } from '../domain/usecases/GetCurrentUserUseCase'
import type { LoginUseCase } from '../domain/usecases/LoginUseCase'
import type { LogoutUseCase } from '../domain/usecases/LogoutUseCase'
import type { RegisterUseCase } from '../domain/usecases/RegisterUseCase'

export const AUTH_TOKENS = {
  repository: createToken<IAuthRepository>('AuthRepository'),
  login: createToken<LoginUseCase>('LoginUseCase'),
  register: createToken<RegisterUseCase>('RegisterUseCase'),
  getCurrentUser: createToken<GetCurrentUserUseCase>('GetCurrentUserUseCase'),
  logout: createToken<LogoutUseCase>('LogoutUseCase'),
}
