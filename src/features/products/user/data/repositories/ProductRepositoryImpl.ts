import { toPage } from '@shared/utils/page'
import type { ProductQuery } from '../../domain/entities/Product'
import type { IProductRepository } from '../../domain/repositories/IProductRepository'
import type { ProductRemoteDataSource } from '../datasources/ProductRemoteDataSource'
import { toProduct } from '../mappers/productMapper'

export class ProductRepositoryImpl implements IProductRepository {
  constructor(private readonly remote: ProductRemoteDataSource) {}

  async list(query: ProductQuery) {
    return toPage(await this.remote.list(query), toProduct)
  }

  async get(id: string) {
    return toProduct(await this.remote.get(id))
  }
}
