import { httpClient } from '@core/api/httpClient'
import type { Container } from '@core/di/container'
import { ProductRemoteDataSource } from '../data/datasources/ProductRemoteDataSource'
import { ProductRepositoryImpl } from '../data/repositories/ProductRepositoryImpl'
import { GetProductByIdUseCase } from '../domain/usecases/GetProductByIdUseCase'
import { GetProductsUseCase } from '../domain/usecases/GetProductsUseCase'
import { PRODUCTS_USER_TOKENS as T } from './tokens'

export function register(container: Container) {
  const products = new ProductRepositoryImpl(new ProductRemoteDataSource(httpClient))
  container.register(T.getProducts, () => new GetProductsUseCase(products))
  container.register(T.getProductById, () => new GetProductByIdUseCase(products))
}
