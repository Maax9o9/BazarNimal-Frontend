import { container, type Token } from './container'

/** Obtiene una dependencia del contenedor. La presentación nunca usa `new` con casos de uso. */
export const useInject = <T>(token: Token<T>): T => container.resolve(token)
