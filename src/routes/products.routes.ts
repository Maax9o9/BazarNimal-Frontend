export const PRODUCTS_ROUTES = {
  user: {
    list: '/products',
    detail: (id: string) => `/products/${encodeURIComponent(id)}`,
  },
  admin: {
    list: '/admin/products',
    detail: (id: string) => `/admin/products/${encodeURIComponent(id)}`,
  },
} as const
