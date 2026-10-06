export type Role = 'user' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  phone: string | null
  role: Role
}

export interface Credentials {
  email: string
  password: string
}

export interface NewUser extends Credentials {
  name: string
  phone: string
}
