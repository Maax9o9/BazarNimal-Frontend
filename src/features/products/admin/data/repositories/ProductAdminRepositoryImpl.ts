import { toPage } from '@shared/utils/page'
import type { AdminProductQuery, ProductInput } from '../../domain/entities/AdminProduct'
import type { IProductAdminRepository } from '../../domain/repositories/IProductAdminRepository'
import type { ProductAdminRemoteDataSource } from '../datasources/ProductAdminRemoteDataSource'
import { toAdminProduct, toProductForm } from '../mappers/productAdminMapper'

export class ProductAdminRepositoryImpl implements IProductAdminRepository {
  constructor(private readonly remote: ProductAdminRemoteDataSource) {}

  async list(query: AdminProductQuery) {
    return toPage(await this.remote.list(query), toAdminProduct)
  }

  async get(id: string) {
    return toAdminProduct(await this.remote.get(id))
  }

  async create(input: ProductInput) {
    return toAdminProduct(await this.remote.create(toProductForm(input)))
  }

  async update(id: string, input: ProductInput) {
    return toAdminProduct(await this.remote.update(id, toProductForm(input)))
  }

  delete(id: string) {
    return this.remote.delete(id)
  }
}
