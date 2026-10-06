import type { Post } from '../../domain/entities/Post'
import type { PostDto } from '../models/postDtos'

export const toPost = (dto: PostDto): Post => ({
  id: dto.id,
  content: dto.content,
  imageUrl: dto.image_url,
  authorName: dto.author_name,
  createdAt: new Date(dto.created_at),
})
