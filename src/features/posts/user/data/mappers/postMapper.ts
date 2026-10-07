import { toFormData } from '@shared/utils/page'
import type { MyPost, Post, PostInput } from '../../domain/entities/Post'
import type { MyPostDto, PostDto } from '../models/postDtos'

export const toPost = (dto: PostDto): Post => ({
  id: dto.id,
  content: dto.content,
  imageUrl: dto.image_url,
  authorName: dto.author_name,
  createdAt: new Date(dto.created_at),
})

export const toMyPost = (dto: MyPostDto): MyPost => ({ ...toPost(dto), status: dto.status })

export const toPostForm = (input: PostInput) => toFormData({ content: input.content, image: input.image })
