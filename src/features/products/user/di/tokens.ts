import { createToken } from '@core/di/container'
import type { GetProductByIdUseCase } from '../domain/usecases/GetProductByIdUseCase'
import type { GetProductsUseCase } from '../domain/usecases/GetProductsUseCase'

export const PRODUCTS_USER_TOKENS = {
  getProducts: createToken<GetProductsUseCase>('GetProductsUseCase'),
  getProductById: createToken<GetProductByIdUseCase>('GetProductByIdUseCase'),
}
