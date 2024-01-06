import { useSuspenseQuery } from '@tanstack/react-query'
import WithQueryErrorSuspense from '../../components/wrapper'
import { fetchPost } from '../../queries'
import { useParams } from '@tanstack/react-router'

const Index = () => {
  const postId = useParams({
    from: '/posts/$postId',
    select: (params) => params.postId,
  })
  const { data: post } = useSuspenseQuery(fetchPost(postId))
  return (
    <div className='flex flex-col gap-4 px-4 py-4'>
      <h2 className='text-3xl font-bold'>{post.data.title}</h2>
      <p>{post.data.body}</p>
    </div>
  )
}

const Fallback = (
  <div className='flex flex-col gap-4 px-4 py-4'>
    <h2 className='skeleton bg-gray-600 h-8 w-1/2'></h2>
    <p className='skeleton bg-gray-600 h-6 w-full'></p>
    <p className='skeleton bg-gray-600 h-6 w-full'></p>
  </div>
)

export const PostDetails = WithQueryErrorSuspense(<Index />, {
  suspenseFallback: Fallback,
})
