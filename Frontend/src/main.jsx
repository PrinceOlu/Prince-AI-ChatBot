import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'

// Create an instance of query client
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
   {/* Provide the client to your App */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
