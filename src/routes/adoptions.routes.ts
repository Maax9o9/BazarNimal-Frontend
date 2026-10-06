export const ADOPTIONS_ROUTES = {
  user: {
    pets: '/pets',
    pet: (id: string) => `/pets/${encodeURIComponent(id)}`,
  },
} as const
