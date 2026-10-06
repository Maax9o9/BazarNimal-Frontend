/** Eventos globales del cliente HTTP que la UI traduce en navegación o avisos. */
export type ApiEvent =
  | { type: 'unauthorized' }
  | { type: 'forbidden' }
  | { type: 'rate-limited'; retryAfter?: number }
  | { type: 'server-error' }

type Listener = (event: ApiEvent) => void
const listeners = new Set<Listener>()

export const apiEvents = {
  emit: (event: ApiEvent) => listeners.forEach((listener) => listener(event)),
  subscribe: (listener: Listener) => {
    listeners.add(listener)
    return () => void listeners.delete(listener)
  },
}
