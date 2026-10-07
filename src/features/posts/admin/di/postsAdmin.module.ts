import { httpClient } from '@core/api/httpClient'
import type { Container } from '@core/di/container'
import { PostAdminRemoteDataSource } from '../data/datasources/PostAdminRemoteDataSource'
import { PostModerationRepositoryImpl } from '../data/repositories/PostModerationRepositoryImpl'
import { ApprovePostUseCase } from '../domain/usecases/ApprovePostUseCase'
import { DeletePostUseCase } from '../domain/usecases/DeletePostUseCase'
import { GetAdminPostsUseCase } from '../domain/usecases/GetAdminPostsUseCase'
import { RejectPostUseCase } from '../domain/usecases/RejectPostUseCase'
import { POSTS_ADMIN_TOKENS as T } from './tokens'

export function register(container: Container) {
  const posts = new PostModerationRepositoryImpl(new PostAdminRemoteDataSource(httpClient))
  container.register(T.getPosts, () => new GetAdminPostsUseCase(posts))
  container.register(T.approvePost, () => new ApprovePostUseCase(posts))
  container.register(T.rejectPost, () => new RejectPostUseCase(posts))
  container.register(T.deletePost, () => new DeletePostUseCase(posts))
}
