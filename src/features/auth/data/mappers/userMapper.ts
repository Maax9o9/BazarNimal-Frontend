import type { User } from '../../domain/entities/User'
import type { UserDto } from '../models/authDtos'

export const toUser = (dto: UserDto): User => ({
  id: dto.id,
  name: dto.name,
  email: dto.email,
  phone: dto.phone,
  role: dto.role,
})
