export interface User {
  id: string
  nick_name: string
  name: string
  email: string
  avatar: string
  createdAt: string
  updatedAt: string
}

export interface Post {
  id: string
  content: string
  createdAt: string
  updatedAt: string
  owner: User

  // likes
}
