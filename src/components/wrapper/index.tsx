import { QueryErrorResetBoundary } from '@tanstack/react-query'
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'

interface ISuspenseProps {
  fallback?: React.ReactNode
  children: React.ReactNode
}

export const SuspenseWrapper = ({ fallback, children }: ISuspenseProps) => {
  return <React.Suspense fallback={fallback}>{children}</React.Suspense>
}

interface IErrorWrapper {
  children: React.ReactNode
  errorFallbackRender?: (value: {
    error: Error
    resetErrorBoundary: (...args: unknown[]) => void
  }) => React.ReactNode
}

export const ErrorWrapper = ({ children }: IErrorWrapper) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => (
            <div>
              There was an error!{' '}
              <button
                type='button'
                className='btn btn-info'
                onClick={() => resetErrorBoundary()}>
                Try again
              </button>
              <pre className='whitespace-normal'>{error.message}</pre>
            </div>
          )}
          onReset={reset}>
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}

interface IWithQueryErrorSuspense {
  suspenseFallback?: ISuspenseProps['fallback']
  errorFallback?: IErrorWrapper['errorFallbackRender']
}

export const WithQueryErrorSuspense =
  (children: React.JSX.Element, otherProps?: IWithQueryErrorSuspense) => () => {
    return (
      <ErrorWrapper errorFallbackRender={otherProps?.errorFallback}>
        <SuspenseWrapper fallback={otherProps?.suspenseFallback}>
          {children}
        </SuspenseWrapper>
      </ErrorWrapper>
    )
  }

export default WithQueryErrorSuspense
