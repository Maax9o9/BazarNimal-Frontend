import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerModules } from '@core/di/registerModules'
import { App } from './App'
import './index.css'

registerModules()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
