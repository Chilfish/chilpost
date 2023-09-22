import type { PostsWithOwner } from '~/types/post'

interface QueryParams {
  id?: string
  ownerName?: string
}

export default defineEventHandler(async (event) => {
  const {
    id,
    ownerName,
  } = getQuery(event) as QueryParams

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
})

function byId(id: string) {
  const post = fakePosts.find(post => post.id === id)
  if (!post)
    throw newError('notfound_post')

  return toDetail(post)
}

function byOwnerName(owner_name: string): PostsWithOwner {
  const owner = fakeUsers.find(user => user.name === owner_name)
  if (!owner)
    throw newError('notfound_user')

  const posts = fakePosts.filter(post => post.owner_id === owner.id)
  const { email: _e, createdAt: _c, password: _p, ...res } = owner
  return {
    owner: res,
    posts,
  }
}
