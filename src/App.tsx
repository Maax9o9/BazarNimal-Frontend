import { BrowserRouter } from 'react-router-dom'
import { ApiEventsListener } from '@core/router/ApiEventsListener'
import { AppRouter } from '@core/router/AppRouter'
import { SessionProvider } from '@features/auth'

export function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <ApiEventsListener />
        <AppRouter />
      </SessionProvider>
    </BrowserRouter>
  )
}
