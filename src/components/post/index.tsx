import { Link } from '@tanstack/react-router'
import { IPost } from '../../apis'

interface IPostBody {
  post: IPost
}

export const PostBody = ({ post }: IPostBody) => {
  return (
    <article className='flex flex-col gap-2'>
      <h3>
        <Link
          preload='intent'
          to='/posts/$postId'
          params={{ postId: post.id }}
          className='mr-1 link-primary text-lg font-semibold'>
          {post.title}
        </Link>
        by{' '}
        <Link
          preload='intent'
          to={'/users/$userId'}
          params={{ userId: post.userId }}
          className='link-primary font-semibold'>
          {post.userId}
        </Link>
      </h3>
      <p>{post.body}</p>
    </article>
  )
}
