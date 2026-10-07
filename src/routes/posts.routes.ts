export const POSTS_ROUTES = {
  user: {
    approved: '/posts',
    detail: (id: string) => `/posts/${encodeURIComponent(id)}`,
    mine: '/posts/me',
  },
  admin: {
    list: '/admin/posts',
    detail: (id: string) => `/admin/posts/${encodeURIComponent(id)}`,
    approve: (id: string) => `/admin/posts/${encodeURIComponent(id)}/approve`,
    reject: (id: string) => `/admin/posts/${encodeURIComponent(id)}/reject`,
  },
} as const
