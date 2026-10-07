import { httpClient } from '@core/api/httpClient'
import type { Container } from '@core/di/container'
import { PostRemoteDataSource } from '../data/datasources/PostRemoteDataSource'
import { PostRepositoryImpl } from '../data/repositories/PostRepositoryImpl'
import { CreatePostUseCase } from '../domain/usecases/CreatePostUseCase'
import { DeleteMyPostUseCase } from '../domain/usecases/DeleteMyPostUseCase'
import { GetApprovedPostByIdUseCase } from '../domain/usecases/GetApprovedPostByIdUseCase'
import { GetApprovedPostsUseCase } from '../domain/usecases/GetApprovedPostsUseCase'
import { GetMyPostsUseCase } from '../domain/usecases/GetMyPostsUseCase'
import { POSTS_USER_TOKENS as T } from './tokens'

export function register(container: Container) {
  const posts = new PostRepositoryImpl(new PostRemoteDataSource(httpClient))
  container.register(T.getApprovedPosts, () => new GetApprovedPostsUseCase(posts))
  container.register(T.getApprovedPostById, () => new GetApprovedPostByIdUseCase(posts))
  container.register(T.createPost, () => new CreatePostUseCase(posts))
  container.register(T.getMyPosts, () => new GetMyPostsUseCase(posts))
  container.register(T.deleteMyPost, () => new DeleteMyPostUseCase(posts))
}
