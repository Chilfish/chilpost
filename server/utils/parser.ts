import type { Post, PostDetail, User, UserAuth, uid } from '~/types'

export function withoutPass(user: UserAuth): User {
  const { password: _, ...rest } = user
  return rest
}

export function toDetail(post: Post, owner: UserAuth): PostDetail {
  return {
    ...post,
    owner: withoutPass(owner),
  }
}

export function newPost(
  ownerId: uid,
  content: string,
  isBody: boolean = true,
): Post {
  const now = new Date().toISOString()
  return {
    id: 1,
    owner_id: ownerId,
    content,
    isBody,
    created_at: now,
    parentId: -1,
    status: {
      like_count: 0,
      comment_count: 0,
      repost_count: 0,
      likes: [],
      comments: [],
      reposts: [],
    },
  }
}

export function newUser(email: string, password: string, name?: string): UserAuth {
  const _name = name || email.replace(/[@\.]/gm, '_')
  const now = new Date().toISOString()

  const user: UserAuth = {
    id: 1,
    email,
    password,
    name: _name,
    nickname: _name,
    avatar: '/placeholder.avatar.png',
    bio: 'Hello',
    level: 'user',

    deleted: false,
    deleted_at: now,
    created_at: now,
    updated_at: now,

    status: {

      post_count: 0,
      follower_count: 0,
      following_count: 0,
      followers: [],
      following: [],
    },
  }
  return user
}
