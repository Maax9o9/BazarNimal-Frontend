export const ADOPTIONS_ROUTES = {
  user: {
    pets: '/pets',
    pet: (id: string) => `/pets/${encodeURIComponent(id)}`,
    requests: '/adoption-requests',
    myRequests: '/adoption-requests/me',
  },
  admin: {
    pets: '/admin/pets',
    pet: (id: string) => `/admin/pets/${encodeURIComponent(id)}`,
    requests: '/admin/adoption-requests',
    approve: (id: string) => `/admin/adoption-requests/${encodeURIComponent(id)}/approve`,
    reject: (id: string) => `/admin/adoption-requests/${encodeURIComponent(id)}/reject`,
  },
} as const
