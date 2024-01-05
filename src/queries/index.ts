import { queryOptions } from '@tanstack/react-query'
import apiHelper from '../apis'

export const fetchPosts = () => {
  return queryOptions({
    queryFn: apiHelper.getPosts,
    queryKey: ['posts'],
  })
}

export const fetchPost = (postId: string) => {
  return queryOptions({
    queryFn: () => apiHelper.getPost(postId),
    queryKey: ['posts', postId],
  })
}
