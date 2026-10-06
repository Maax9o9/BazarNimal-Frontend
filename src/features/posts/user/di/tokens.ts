import { createToken } from '@core/di/container'
import type { IPostRepository } from '../domain/repositories/IPostRepository'
import type { GetApprovedPostsUseCase } from '../domain/usecases/GetApprovedPostsUseCase'

export const POSTS_USER_TOKENS = {
  postRepository: createToken<IPostRepository>('PostRepository'),
  getApprovedPosts: createToken<GetApprovedPostsUseCase>('GetApprovedPostsUseCase'),
}
