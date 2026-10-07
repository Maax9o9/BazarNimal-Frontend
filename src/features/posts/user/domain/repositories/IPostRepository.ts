import type { Page, PageRequest } from '@shared/types/pagination'
import type { MyPost, Post, PostInput } from '../entities/Post'

export interface IPostRepository {
  getApproved(page: PageRequest): Promise<Page<Post>>
  getApprovedById(id: string): Promise<Post>
  create(input: PostInput): Promise<MyPost>
  getMine(page: PageRequest): Promise<Page<MyPost>>
  deleteMine(id: string): Promise<void>
}
