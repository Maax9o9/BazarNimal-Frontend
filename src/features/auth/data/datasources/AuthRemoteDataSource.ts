import type { AxiosInstance } from 'axios'
import { AUTH_ROUTES } from '@routes/auth.routes'
import type { ApiResponse } from '@shared/types/api'
import type { LoginRequestDto, RegisterRequestDto, SessionDto, UserDto } from '../models/authDtos'

export class AuthRemoteDataSource {
  constructor(private readonly http: AxiosInstance) {}

  async login(body: LoginRequestDto): Promise<SessionDto> {
    const { data } = await this.http.post<ApiResponse<SessionDto>>(AUTH_ROUTES.login, body)
    return data.data
  }

  async register(body: RegisterRequestDto): Promise<UserDto> {
    const { data } = await this.http.post<ApiResponse<UserDto>>(AUTH_ROUTES.register, body)
    return data.data
  }

  async me(): Promise<UserDto> {
    const { data } = await this.http.get<ApiResponse<UserDto>>(AUTH_ROUTES.me, { silentAuth: true })
    return data.data
  }

  async logout(): Promise<void> {
    await this.http.post(AUTH_ROUTES.logout)
  }
}
