import { createToken } from '@core/di/container'
import type { CreatePostUseCase } from '../domain/usecases/CreatePostUseCase'
import type { DeleteMyPostUseCase } from '../domain/usecases/DeleteMyPostUseCase'
import type { GetApprovedPostByIdUseCase } from '../domain/usecases/GetApprovedPostByIdUseCase'
import type { GetApprovedPostsUseCase } from '../domain/usecases/GetApprovedPostsUseCase'
import type { GetMyPostsUseCase } from '../domain/usecases/GetMyPostsUseCase'

export const POSTS_USER_TOKENS = {
  getApprovedPosts: createToken<GetApprovedPostsUseCase>('GetApprovedPostsUseCase'),
  getApprovedPostById: createToken<GetApprovedPostByIdUseCase>('GetApprovedPostByIdUseCase'),
  createPost: createToken<CreatePostUseCase>('CreatePostUseCase'),
  getMyPosts: createToken<GetMyPostsUseCase>('GetMyPostsUseCase'),
  deleteMyPost: createToken<DeleteMyPostUseCase>('DeleteMyPostUseCase'),
}
