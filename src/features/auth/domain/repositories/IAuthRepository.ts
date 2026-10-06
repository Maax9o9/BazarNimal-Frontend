import type { Credentials, NewUser, User } from '../entities/User'

export interface IAuthRepository {
  login(credentials: Credentials): Promise<User>
  register(newUser: NewUser): Promise<User>
  /** Devuelve null si no hay sesión activa. */
  getCurrentUser(): Promise<User | null>
  logout(): Promise<void>
}
