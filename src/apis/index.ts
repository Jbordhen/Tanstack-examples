import axios from 'axios'

interface IPost {
  id: string
  title: string
  body: string
  userId: string
}

const apiHelper = {
  getPosts: () =>
    axios.get<IPost[]>('https://jsonplaceholder.typicode.com/posts'),
  getPost: (id: string) =>
    axios.get<IPost>(`https://jsonplaceholder.typicode.com/posts/${id}`),
  createPost: (body: Omit<IPost, 'id'>) =>
    axios.post<IPost>('https://jsonplaceholder.typicode.com/posts', body),
}

export default apiHelper
