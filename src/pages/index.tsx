import { Link, Outlet } from '@tanstack/react-router'
import TanStackRouterDevtools from '../components/tanstackRouterDevtool'
import { router } from '../route'
import { Suspense } from 'react'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export const Index = () => {
  return (
    <main className='flex flex-col bg-white w-full h-full m-0 overflow-auto'>
      <nav className='sticky top-0 w-full border-b-2 border-slate-300'>
        <h1 className='px-4 py-4 text-2xl font-bold text-black'>
          Tanstack examples
        </h1>
      </nav>
      <div className='flex flex-row flex-grow overflow-auto'>
        <aside className='flex flex-col gap-1 w-72 pl-4 border-r-2 py-2 border-gray-200 mb-4'>
          <Link
            to='/'
            preload='intent'
            className='link-primary font-bold text-xl'>
            Dashboard
          </Link>
          <Link
            to='/blogs'
            preload='intent'
            className='link-primary font-bold text-xl'>
            Blogs
          </Link>
          <Link
            to='/posts'
            preload='intent'
            className='link-primary font-bold text-xl'>
            Posts
          </Link>
        </aside>
        <section className='overflow-auto w-full'>
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                fallbackRender={({ error, resetErrorBoundary }) => (
                  <div>
                    There was an error!{' '}
                    <button
                      className='btn btn-info'
                      onClick={() => resetErrorBoundary()}>
                      Try again
                    </button>
                    <pre className='whitespace-normal'>{error.message}</pre>
                  </div>
                )}
                onReset={reset}>
                <React.Suspense>
                  <Outlet />
                </React.Suspense>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </section>
        <Suspense>
          <TanStackRouterDevtools router={router} />
        </Suspense>
      </div>
    </main>
  )
}
