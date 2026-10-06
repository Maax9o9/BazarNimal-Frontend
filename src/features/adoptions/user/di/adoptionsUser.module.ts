import { httpClient } from '@core/api/httpClient'
import type { Container } from '@core/di/container'
import { PetRemoteDataSource } from '../data/datasources/PetRemoteDataSource'
import { PetRepositoryImpl } from '../data/repositories/PetRepositoryImpl'
import { GetPetsUseCase } from '../domain/usecases/GetPetsUseCase'
import { ADOPTIONS_USER_TOKENS } from './tokens'

export function register(container: Container) {
  container.register(ADOPTIONS_USER_TOKENS.petRepository, () => new PetRepositoryImpl(new PetRemoteDataSource(httpClient)))
  container.register(ADOPTIONS_USER_TOKENS.getPets, (c) => new GetPetsUseCase(c.resolve(ADOPTIONS_USER_TOKENS.petRepository)))
}
