import { createToken } from '@core/di/container'
import type { CreateProductUseCase } from '../domain/usecases/CreateProductUseCase'
import type { DeleteProductUseCase } from '../domain/usecases/DeleteProductUseCase'
import type { GetAdminProductByIdUseCase } from '../domain/usecases/GetAdminProductByIdUseCase'
import type { GetAdminProductsUseCase } from '../domain/usecases/GetAdminProductsUseCase'
import type { UpdateProductUseCase } from '../domain/usecases/UpdateProductUseCase'

export const PRODUCTS_ADMIN_TOKENS = {
  getProducts: createToken<GetAdminProductsUseCase>('GetAdminProductsUseCase'),
  getProductById: createToken<GetAdminProductByIdUseCase>('GetAdminProductByIdUseCase'),
  createProduct: createToken<CreateProductUseCase>('CreateProductUseCase'),
  updateProduct: createToken<UpdateProductUseCase>('UpdateProductUseCase'),
  deleteProduct: createToken<DeleteProductUseCase>('DeleteProductUseCase'),
}
