import { httpClient } from '@core/api/httpClient'
import type { Container } from '@core/di/container'
import { PostRemoteDataSource } from '../data/datasources/PostRemoteDataSource'
import { PostRepositoryImpl } from '../data/repositories/PostRepositoryImpl'
import { GetApprovedPostsUseCase } from '../domain/usecases/GetApprovedPostsUseCase'
import { POSTS_USER_TOKENS } from './tokens'

export function register(container: Container) {
  container.register(POSTS_USER_TOKENS.postRepository, () => new PostRepositoryImpl(new PostRemoteDataSource(httpClient)))
  container.register(
    POSTS_USER_TOKENS.getApprovedPosts,
    (c) => new GetApprovedPostsUseCase(c.resolve(POSTS_USER_TOKENS.postRepository)),
  )
}
