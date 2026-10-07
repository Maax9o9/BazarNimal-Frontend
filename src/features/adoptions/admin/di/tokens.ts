import { createToken } from '@core/di/container'
import type { ApproveAdoptionRequestUseCase } from '../domain/usecases/ApproveAdoptionRequestUseCase'
import type { CreatePetUseCase } from '../domain/usecases/CreatePetUseCase'
import type { DeletePetUseCase } from '../domain/usecases/DeletePetUseCase'
import type { GetAdminPetByIdUseCase } from '../domain/usecases/GetAdminPetByIdUseCase'
import type { GetAdminPetsUseCase } from '../domain/usecases/GetAdminPetsUseCase'
import type { GetAdoptionRequestsUseCase } from '../domain/usecases/GetAdoptionRequestsUseCase'
import type { RejectAdoptionRequestUseCase } from '../domain/usecases/RejectAdoptionRequestUseCase'
import type { UpdatePetUseCase } from '../domain/usecases/UpdatePetUseCase'

export const ADOPTIONS_ADMIN_TOKENS = {
  getPets: createToken<GetAdminPetsUseCase>('GetAdminPetsUseCase'),
  getPetById: createToken<GetAdminPetByIdUseCase>('GetAdminPetByIdUseCase'),
  createPet: createToken<CreatePetUseCase>('CreatePetUseCase'),
  updatePet: createToken<UpdatePetUseCase>('UpdatePetUseCase'),
  deletePet: createToken<DeletePetUseCase>('DeletePetUseCase'),
  getRequests: createToken<GetAdoptionRequestsUseCase>('GetAdoptionRequestsUseCase'),
  approveRequest: createToken<ApproveAdoptionRequestUseCase>('ApproveAdoptionRequestUseCase'),
  rejectRequest: createToken<RejectAdoptionRequestUseCase>('RejectAdoptionRequestUseCase'),
}
