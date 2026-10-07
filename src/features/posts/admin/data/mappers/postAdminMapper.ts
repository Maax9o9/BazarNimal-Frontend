import type { AdminPost } from '../../domain/entities/AdminPost'
import type { PostAdminDto } from '../models/postAdminDtos'

export const toAdminPost = (dto: PostAdminDto): AdminPost => ({
  id: dto.id,
  content: dto.content,
  imageUrl: dto.image_url,
  status: dto.status,
  authorName: dto.author.name,
  createdAt: new Date(dto.created_at),
})
