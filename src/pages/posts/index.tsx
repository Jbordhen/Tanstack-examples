import { useQuery } from '@tanstack/react-query'
import { postIndexedRoute } from '../../route'
import { Link } from '@tanstack/react-router'

export const Posts = () => {
  const posts = useQuery(postIndexedRoute.useLoaderData())
  return (
    <div className='flex flex-col px-4 relative'>
      <h2 className='sticky top-0 bg-white py-2'>
        Posts{' '}
        {posts.status === 'success' ? `(${posts.data.data.length})` : null}
      </h2>
      <div className='mt-2'>
        {posts.status === 'pending' ? (
          <div className='flex flex-col gap-1'>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className='skeleton h-4 w-full'></div>
            ))}
          </div>
        ) : null}
        {posts.status === 'error' ? (
          <div className='text-error-content'>{posts.error.message}</div>
        ) : null}
        {posts.status === 'success' ? (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
            {posts.data.data.map((post) => (
              <article id={post.id} className='flex flex-col gap-2'>
                <h3>
                  <Link
                    to='/posts/$postId'
                    params={{ postId: post.id }}
                    className='mr-1 link-primary text-lg font-semibold'>
                    {post.title}
                  </Link>
                  by{' '}
                  <Link
                    to={'/users/$userId'}
                    params={{ userId: post.userId }}
                    className='link-primary font-semibold'>
                    {post.userId}
                  </Link>
                </h3>
                <p>{post.body}</p>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
