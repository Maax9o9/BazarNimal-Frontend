export const POSTS_ROUTES = {
  user: {
    approved: '/posts',
    detail: (id: string) => `/posts/${encodeURIComponent(id)}`,
  },
} as const
