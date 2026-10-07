import { createToken } from '@core/di/container'
import type { CreateAdoptionRequestUseCase } from '../domain/usecases/CreateAdoptionRequestUseCase'
import type { GetMyAdoptionRequestsUseCase } from '../domain/usecases/GetMyAdoptionRequestsUseCase'
import type { GetPetByIdUseCase } from '../domain/usecases/GetPetByIdUseCase'
import type { GetPetsUseCase } from '../domain/usecases/GetPetsUseCase'

export const ADOPTIONS_USER_TOKENS = {
  getPets: createToken<GetPetsUseCase>('GetPetsUseCase'),
  getPetById: createToken<GetPetByIdUseCase>('GetPetByIdUseCase'),
  createRequest: createToken<CreateAdoptionRequestUseCase>('CreateAdoptionRequestUseCase'),
  getMyRequests: createToken<GetMyAdoptionRequestsUseCase>('GetMyAdoptionRequestsUseCase'),
}
