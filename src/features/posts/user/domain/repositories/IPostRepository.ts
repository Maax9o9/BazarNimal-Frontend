import type { Post } from '../entities/Post'

export interface IPostRepository {
  getApproved(limit: number): Promise<Post[]>
}
