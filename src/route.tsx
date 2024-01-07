import { Route, Router, rootRouteWithContext } from '@tanstack/react-router'
import { Index } from './pages'
import { Blogs } from './pages/blogs'
import { Posts } from './pages/posts'
import { fetchPost, fetchPosts } from './queries'
import { PostDetails } from './pages/posts/postId'
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 10_000,
      gcTime: 10_000,
      retryOnMount: false,
    },
  },
})

interface IRootContext {
  queryClient: QueryClient
}

const rootRoute = rootRouteWithContext<IRootContext>()()

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
})

const blogRoute = new Route({
  getParentRoute: () => indexRoute,
  path: 'blogs',
})

const blogIndexedRoute = new Route({
  getParentRoute: () => blogRoute,
  path: '/',
  component: Blogs,
})

const postRoute = new Route({
  getParentRoute: () => indexRoute,
  path: 'posts',
})

export const postIndexedRoute = new Route({
  getParentRoute: () => postRoute,
  path: '/',
  component: Posts,
  loader: ({ context }) => context.queryClient.ensureQueryData(fetchPosts()),
})

export const postDetailRoute = new Route({
  getParentRoute: () => postRoute,
  path: '$postId',
  component: PostDetails,
  loader: ({ params, context }) =>
    context.queryClient.ensureQueryData(fetchPost(params.postId)),
})

const userRoute = new Route({
  getParentRoute: () => indexRoute,
  path: 'users',
})

export const userIndexedRoute = new Route({
  getParentRoute: () => userRoute,
  path: '/',
})

export const userDetailRoute = new Route({
  getParentRoute: () => userRoute,
  path: '$userId',
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  blogRoute.addChildren([blogIndexedRoute]),
  postRoute.addChildren([postIndexedRoute, postDetailRoute]),
  userRoute.addChildren([userIndexedRoute, userDetailRoute]),
])

export const router = new Router({
  routeTree,
  defaultPreloadStaleTime: 0,
  caseSensitive: true,
  defaultPreload: 'intent',
  context: {
    queryClient,
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    // This infers the type of our router and registers it across your entire project
    router: typeof router
  }
}
