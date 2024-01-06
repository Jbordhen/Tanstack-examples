import { RouterProvider } from '@tanstack/react-router'
import { router } from './route'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'
import { ReactQueryDevtoolsProduction } from './components/tanstackQueryDevtool'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
})

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
