import type { ApiResult } from '~/types'
import type { PostsWithOwner } from '~/types/post'

interface QueryParams {
  id?: string
  ownerName?: string
}

export default defineEventHandler(async (event): ApiResult => {
  const {
    id,
    ownerName,
  } = getQuery(event) as QueryParams

  try {
    if (id) {
      return {
        data: byId(id),
      }
    }

    if (ownerName) {
      return {
        data: byOwnerName(ownerName),
      }
    }

    return {
      data: null,
    }
  }
  catch (error: any) {
    return error
  }
})

function byId(id: string) {
  const post = fakePosts.find(post => post.id === id)
  if (!post) {
    throw createError({
      statusCode: 404,
      statusMessage: `Post not found. Id: ${id}`,
    })
  }
  return toDetail(post)
}

function byOwnerName(owner_name: string): PostsWithOwner {
  const owner = fakeUsers.find(user => user.name === owner_name)
  if (!owner) {
    throw createError({
      statusCode: 404,
      statusMessage: `User not found. Name: ${owner_name}`,
    })
  }

  const posts = fakePosts.filter(post => post.owner_id === owner.id)
  const { email: _e, createdAt: _c, password: _p, ...res } = owner
  return {
    owner: res,
    posts,
  }
}
