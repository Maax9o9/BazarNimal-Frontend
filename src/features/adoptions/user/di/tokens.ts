import { createToken } from '@core/di/container'
import type { IPetRepository } from '../domain/repositories/IPetRepository'
import type { GetPetsUseCase } from '../domain/usecases/GetPetsUseCase'

export const ADOPTIONS_USER_TOKENS = {
  petRepository: createToken<IPetRepository>('PetRepository'),
  getPets: createToken<GetPetsUseCase>('GetPetsUseCase'),
}
