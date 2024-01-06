import React from 'react'

export const ReactQueryDevtoolsProduction =
  import.meta.env.MODE !== 'production'
    ? React.lazy(() =>
        import(
          '@tanstack/react-query-devtools/build/modern/production.js'
        ).then((d) => ({
          default: d.ReactQueryDevtools,
        }))
      )
    : () => null
