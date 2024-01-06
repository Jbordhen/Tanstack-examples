import { useSuspenseQuery } from '@tanstack/react-query'
import { PostBody } from '../../components/post'
import WithQueryErrorSuspense from '../../components/wrapper'
import { fetchPosts } from '../../queries'

const Index = () => {
  const { data: posts } = useSuspenseQuery(fetchPosts())
  return (
    <div className='flex flex-col px-4 relative'>
      <h2 className='sticky top-0 bg-white py-2'>
        Posts (${posts.data.length})
      </h2>
      <div className='mt-2'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
          {posts.data.map((post) => (
            <PostBody key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}

const Fallback = () => {
  return (
    <div className='flex flex-col px-4 relative'>
      <h2 className='sticky top-0 bg-white py-2'>Posts</h2>
      <div className='mt-2'>
        <div className='flex flex-col gap-1'>
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className='skeleton h-4 w-full'></div>
          ))}
        </div>
      </div>
    </div>
  )
}

const ErrorComponent = ({ error }: { error: Error }) => {
  return (
    <div className='flex flex-col px-4 relative'>
      <h2 className='sticky top-0 bg-white py-2'>Posts</h2>
      <div className='mt-2'>
        <div className='text-error-content'>{error?.message}</div>
      </div>
    </div>
  )
}

export const Posts = WithQueryErrorSuspense(<Index />, {
  suspenseFallback: <Fallback />,
  errorFallback: ({ error }) => <ErrorComponent error={error} />,
})
