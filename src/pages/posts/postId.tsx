import { useQuery } from '@tanstack/react-query'
import { postDetailRoute } from '../../route'

export const PostDetails = () => {
  const post = useQuery(postDetailRoute.useLoaderData())
  return (
    <div className='flex flex-col gap-4 px-4 py-4'>
      <h2 className='text-3xl font-bold'>{post.data?.data?.title}</h2>
      <p>{post.data?.data?.body}</p>
    </div>
  )
}
