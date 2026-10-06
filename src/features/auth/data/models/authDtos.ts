export interface UserDto {
  id: string
  name: string
  email: string
  phone: string | null
  role: 'user' | 'admin'
}

export interface SessionDto {
  user: UserDto
  role: 'user' | 'admin'
  expires_in: number
}

export interface LoginRequestDto {
  email: string
  password: string
}

export interface RegisterRequestDto extends LoginRequestDto {
  name: string
  phone: string
}
