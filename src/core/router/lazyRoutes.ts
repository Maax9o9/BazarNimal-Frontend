import type { ComponentType } from 'react'

/**
 * Code splitting por página. Se usan como `lazy` de la ruta: el router descarga la página
 * ANTES de cambiar de vista, así la transición nunca anima una pantalla vacía.
 */
const page =
  <M>(load: () => Promise<M>, name: keyof M) =>
  async () => ({ Component: (await load())[name] as ComponentType })

// Públicas y de usuario
export const HomePage = page(() => import('@features/home/presentation/pages/HomePage'), 'HomePage')
export const LoginPage = page(() => import('@features/auth/presentation/pages/LoginPage'), 'LoginPage')
export const RegisterPage = page(() => import('@features/auth/presentation/pages/RegisterPage'), 'RegisterPage')
export const PetListPage = page(() => import('@features/adoptions/user/presentation/pages/PetListPage'), 'PetListPage')
export const PetDetailPage = page(() => import('@features/adoptions/user/presentation/pages/PetDetailPage'), 'PetDetailPage')
export const MyRequestsPage = page(() => import('@features/adoptions/user/presentation/pages/MyRequestsPage'), 'MyRequestsPage')
export const ProductListPage = page(() => import('@features/products/user/presentation/pages/ProductListPage'), 'ProductListPage')
export const ProductDetailPage = page(() => import('@features/products/user/presentation/pages/ProductDetailPage'), 'ProductDetailPage')
export const OfrendaPage = page(() => import('@features/posts/user/presentation/pages/OfrendaPage'), 'OfrendaPage')
export const PostDetailPage = page(() => import('@features/posts/user/presentation/pages/PostDetailPage'), 'PostDetailPage')
export const CreatePostPage = page(() => import('@features/posts/user/presentation/pages/CreatePostPage'), 'CreatePostPage')
export const MyPostsPage = page(() => import('@features/posts/user/presentation/pages/MyPostsPage'), 'MyPostsPage')

// Administración
export const PetAdminListPage = page(() => import('@features/adoptions/admin/presentation/pages/PetAdminListPage'), 'PetAdminListPage')
export const PetFormPage = page(() => import('@features/adoptions/admin/presentation/pages/PetFormPage'), 'PetFormPage')
export const AdoptionRequestsPage = page(
  () => import('@features/adoptions/admin/presentation/pages/AdoptionRequestsPage'),
  'AdoptionRequestsPage',
)
export const ProductAdminListPage = page(
  () => import('@features/products/admin/presentation/pages/ProductAdminListPage'),
  'ProductAdminListPage',
)
export const ProductFormPage = page(() => import('@features/products/admin/presentation/pages/ProductFormPage'), 'ProductFormPage')
export const PostModerationPage = page(() => import('@features/posts/admin/presentation/pages/PostModerationPage'), 'PostModerationPage')
