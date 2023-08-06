import type { PostsWithOwner } from '~/types'

interface QueryParams {
  id?: string
  ownerName?: string
}

export default defineEventHandler((event) => {
  const {
    id,
    ownerName,
  } = getQuery(event) as QueryParams

  try {
    if (id)
      return byId(id)
    if (ownerName)
      return byOwnerName(ownerName)
  }
  catch (err: any) {
    return { message: err.message }
  }
})

function byId(id: string) {
  const post = posts.find(post => post.id === id)
  if (!post)
    throw new Error('Post not found')
  return toDetail(post)
}

function byOwnerName(owner_name: string): PostsWithOwner {
  const owner = users.find(user => user.name === owner_name)
  if (!owner)
    throw new Error('Owner not found')
  const ownerPost = posts.filter(post => post.owner_id === owner.id)
  return {
    owner,
    posts: ownerPost,
  }
}
