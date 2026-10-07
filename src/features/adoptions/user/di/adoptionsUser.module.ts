import { httpClient } from '@core/api/httpClient'
import type { Container } from '@core/di/container'
import { AdoptionRequestRemoteDataSource } from '../data/datasources/AdoptionRequestRemoteDataSource'
import { PetRemoteDataSource } from '../data/datasources/PetRemoteDataSource'
import { AdoptionRequestRepositoryImpl } from '../data/repositories/AdoptionRequestRepositoryImpl'
import { PetRepositoryImpl } from '../data/repositories/PetRepositoryImpl'
import { CreateAdoptionRequestUseCase } from '../domain/usecases/CreateAdoptionRequestUseCase'
import { GetMyAdoptionRequestsUseCase } from '../domain/usecases/GetMyAdoptionRequestsUseCase'
import { GetPetByIdUseCase } from '../domain/usecases/GetPetByIdUseCase'
import { GetPetsUseCase } from '../domain/usecases/GetPetsUseCase'
import { ADOPTIONS_USER_TOKENS as T } from './tokens'

export function register(container: Container) {
  const pets = new PetRepositoryImpl(new PetRemoteDataSource(httpClient))
  const requests = new AdoptionRequestRepositoryImpl(new AdoptionRequestRemoteDataSource(httpClient))

  container.register(T.getPets, () => new GetPetsUseCase(pets))
  container.register(T.getPetById, () => new GetPetByIdUseCase(pets))
  container.register(T.createRequest, () => new CreateAdoptionRequestUseCase(requests))
  container.register(T.getMyRequests, () => new GetMyAdoptionRequestsUseCase(requests))
}
