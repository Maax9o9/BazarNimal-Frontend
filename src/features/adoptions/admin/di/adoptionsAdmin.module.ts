import { httpClient } from '@core/api/httpClient'
import type { Container } from '@core/di/container'
import { AdoptionRequestAdminRemoteDataSource } from '../data/datasources/AdoptionRequestAdminRemoteDataSource'
import { PetAdminRemoteDataSource } from '../data/datasources/PetAdminRemoteDataSource'
import { AdoptionRequestAdminRepositoryImpl } from '../data/repositories/AdoptionRequestAdminRepositoryImpl'
import { PetAdminRepositoryImpl } from '../data/repositories/PetAdminRepositoryImpl'
import { ApproveAdoptionRequestUseCase } from '../domain/usecases/ApproveAdoptionRequestUseCase'
import { CreatePetUseCase } from '../domain/usecases/CreatePetUseCase'
import { DeletePetUseCase } from '../domain/usecases/DeletePetUseCase'
import { GetAdminPetByIdUseCase } from '../domain/usecases/GetAdminPetByIdUseCase'
import { GetAdminPetsUseCase } from '../domain/usecases/GetAdminPetsUseCase'
import { GetAdoptionRequestsUseCase } from '../domain/usecases/GetAdoptionRequestsUseCase'
import { RejectAdoptionRequestUseCase } from '../domain/usecases/RejectAdoptionRequestUseCase'
import { UpdatePetUseCase } from '../domain/usecases/UpdatePetUseCase'
import { ADOPTIONS_ADMIN_TOKENS as T } from './tokens'

export function register(container: Container) {
  const pets = new PetAdminRepositoryImpl(new PetAdminRemoteDataSource(httpClient))
  const requests = new AdoptionRequestAdminRepositoryImpl(new AdoptionRequestAdminRemoteDataSource(httpClient))

  container.register(T.getPets, () => new GetAdminPetsUseCase(pets))
  container.register(T.getPetById, () => new GetAdminPetByIdUseCase(pets))
  container.register(T.createPet, () => new CreatePetUseCase(pets))
  container.register(T.updatePet, () => new UpdatePetUseCase(pets))
  container.register(T.deletePet, () => new DeletePetUseCase(pets))
  container.register(T.getRequests, () => new GetAdoptionRequestsUseCase(requests))
  container.register(T.approveRequest, () => new ApproveAdoptionRequestUseCase(requests))
  container.register(T.rejectRequest, () => new RejectAdoptionRequestUseCase(requests))
}
