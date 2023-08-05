import { fakerDE as fake } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'
import { randomNum } from '.'
import type { Id, Post } from '~/types'

export function generatePost(owner_id: Id): Post {
  return {
    id: uuidv4(),
    owner_id,
    content: fake.lorem.paragraphs(randomNum(1, 4)),
    createdAt: fake.date.past().toISOString(),
    status: {
      like_count: randomNum(),
      comment_count: randomNum(),
      repost_count: randomNum(),
      is_liked: fake.datatype.boolean(),
    },
  }
}
