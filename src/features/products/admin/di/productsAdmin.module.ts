import { httpClient } from '@core/api/httpClient'
import type { Container } from '@core/di/container'
import { ProductAdminRemoteDataSource } from '../data/datasources/ProductAdminRemoteDataSource'
import { ProductAdminRepositoryImpl } from '../data/repositories/ProductAdminRepositoryImpl'
import { CreateProductUseCase } from '../domain/usecases/CreateProductUseCase'
import { DeleteProductUseCase } from '../domain/usecases/DeleteProductUseCase'
import { GetAdminProductByIdUseCase } from '../domain/usecases/GetAdminProductByIdUseCase'
import { GetAdminProductsUseCase } from '../domain/usecases/GetAdminProductsUseCase'
import { UpdateProductUseCase } from '../domain/usecases/UpdateProductUseCase'
import { PRODUCTS_ADMIN_TOKENS as T } from './tokens'

export function register(container: Container) {
  const products = new ProductAdminRepositoryImpl(new ProductAdminRemoteDataSource(httpClient))
  container.register(T.getProducts, () => new GetAdminProductsUseCase(products))
  container.register(T.getProductById, () => new GetAdminProductByIdUseCase(products))
  container.register(T.createProduct, () => new CreateProductUseCase(products))
  container.register(T.updateProduct, () => new UpdateProductUseCase(products))
  container.register(T.deleteProduct, () => new DeleteProductUseCase(products))
}
