import { createToken } from '@core/di/container'
import type { ApprovePostUseCase } from '../domain/usecases/ApprovePostUseCase'
import type { DeletePostUseCase } from '../domain/usecases/DeletePostUseCase'
import type { GetAdminPostsUseCase } from '../domain/usecases/GetAdminPostsUseCase'
import type { RejectPostUseCase } from '../domain/usecases/RejectPostUseCase'

export const POSTS_ADMIN_TOKENS = {
  getPosts: createToken<GetAdminPostsUseCase>('GetAdminPostsUseCase'),
  approvePost: createToken<ApprovePostUseCase>('ApprovePostUseCase'),
  rejectPost: createToken<RejectPostUseCase>('RejectPostUseCase'),
  deletePost: createToken<DeletePostUseCase>('DeletePostUseCase'),
}
