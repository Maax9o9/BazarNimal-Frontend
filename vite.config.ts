import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

const src = (dir: string) => fileURLToPath(new URL(`./src/${dir}`, import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // API_PROXY_TARGET no lleva prefijo VITE_, así que nunca llega al bundle.
  const { API_PROXY_TARGET } = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@core': src('core'),
        '@shared': src('shared'),
        '@features': src('features'),
        '@routes': src('routes'),
      },
    },
    server: {
      // El proxy hace que el navegador hable con un solo origen: así viajan las
      // cookies HttpOnly con SameSite=Strict que emite el backend.
      proxy: API_PROXY_TARGET ? { '/api': { target: API_PROXY_TARGET, changeOrigin: true } } : undefined,
    },
  }
})
