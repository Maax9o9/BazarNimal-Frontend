/** Token tipado: el tipo viaja con el token, así resolve() no necesita casts en la UI. */
export interface Token<T> {
  readonly key: symbol
  readonly _type?: T
}

export const createToken = <T>(description: string): Token<T> => ({ key: Symbol(description) })

type Factory<T> = (container: Container) => T

/** Contenedor propio: registra fábricas y resuelve instancias únicas (singleton perezoso). */
export class Container {
  private readonly factories = new Map<symbol, Factory<unknown>>()
  private readonly instances = new Map<symbol, unknown>()

  register<T>(token: Token<T>, factory: Factory<T>): void {
    this.factories.set(token.key, factory)
    this.instances.delete(token.key)
  }

  resolve<T>(token: Token<T>): T {
    if (!this.instances.has(token.key)) {
      const factory = this.factories.get(token.key)
      if (!factory) throw new Error(`Dependencia no registrada: ${token.key.description}`)
      this.instances.set(token.key, factory(this))
    }
    return this.instances.get(token.key) as T
  }
}

export const container = new Container()
