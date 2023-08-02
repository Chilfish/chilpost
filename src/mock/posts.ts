import { fakerDE as fake } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'
import { randomNum } from '.'
import type { Post, User } from '~/types'

export function generatePost(owner: User): Post {
  return {
    id: uuidv4(),
    owner,
    content: fake.lorem.paragraphs(randomNum(1, 4)),
    createdAt: fake.date.past().toISOString(),
    updatedAt: fake.date.recent().toISOString(),
    status: {
      like_count: randomNum(),
      comment_count: randomNum(),
      repost_count: randomNum(),
      is_liked: fake.datatype.boolean(),
    },
  }
}
