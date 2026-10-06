import { container, type Container } from './container'

interface DiModule {
  register: (container: Container) => void
}

/** Registro automático: carga cada `features/**\/di/*.module.ts` sin configuración manual. */
const modules = import.meta.glob<DiModule>('/src/features/**/di/*.module.ts', { eager: true })

export function registerModules() {
  Object.values(modules).forEach((module) => module.register(container))
}
