import { lazy } from 'react'

// Code splitting por feature: cada página se descarga solo cuando se visita.
export const HomePage = lazy(() => import('@features/home/presentation/pages/HomePage').then((m) => ({ default: m.HomePage })))
export const LoginPage = lazy(() => import('@features/auth/presentation/pages/LoginPage').then((m) => ({ default: m.LoginPage })))
export const RegisterPage = lazy(() =>
  import('@features/auth/presentation/pages/RegisterPage').then((m) => ({ default: m.RegisterPage })),
)
