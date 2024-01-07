import { RouterProvider } from '@tanstack/react-router'
import { queryClient, router } from './route'
import { QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'
import { ReactQueryDevtoolsProduction } from './components/tanstackQueryDevtool'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Suspense>
        <ReactQueryDevtoolsProduction />
      </Suspense>
    </QueryClientProvider>
  )
}

export default App
