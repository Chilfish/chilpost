import type { ApiResult } from '~/types'
import type { PostDetail, PostsWithOwner } from '~/types/post'

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
    return { message: err.message, result: false }
  }
})

function byId(id: string): ApiResult<PostDetail> {
  const post = fakePosts.find(post => post.id === id)
  if (!post)
    throw new Error('Post not found')
  return {
    result: true,
    data: toDetail(post),
  }
}

function byOwnerName(owner_name: string): ApiResult<PostsWithOwner> {
  const owner = fakeUsers.find(user => user.name === owner_name)
  if (!owner)
    throw new Error('Owner not found')
  const ownerPost = fakePosts.filter(post => post.owner_id === owner.id)
  return {
    result: true,
    data: {
      owner,
      posts: ownerPost,
    },
  }
}
