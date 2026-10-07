import { toFormData } from '@shared/utils/page'
import type { AdminProduct, ProductInput } from '../../domain/entities/AdminProduct'
import type { ProductAdminDto } from '../models/productAdminDtos'

export const toAdminProduct = (dto: ProductAdminDto): AdminProduct => ({
  id: dto.id,
  name: dto.name,
  imageUrl: dto.image_url,
  weightKg: dto.weight_kg === null ? null : Number(dto.weight_kg),
  pieces: dto.pieces,
  status: dto.status,
})

/** El backend interpreta "" como "sin valor" en peso y piezas. */
export const toProductForm = (input: ProductInput) =>
  toFormData({
    name: input.name,
    weight_kg: input.weightKg,
    pieces: input.pieces,
    status: input.status,
    image: input.image,
  })
