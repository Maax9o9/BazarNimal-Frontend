import type { Product } from '../../domain/entities/Product'
import type { ProductDto } from '../models/productDtos'

export const toProduct = (dto: ProductDto): Product => ({
  id: dto.id,
  name: dto.name,
  imageUrl: dto.image_url,
  weightKg: dto.weight_kg === null ? null : Number(dto.weight_kg),
  pieces: dto.pieces,
  status: dto.status,
})
