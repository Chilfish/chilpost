import { fakerDE as fake } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'
import type { Post, User } from '~/types'

export function generatePost(owner: User): Post {
  return {
    id: uuidv4(),
    owner,
    title: fake.lorem.sentence(3),
    content: fake.lorem.paragraphs(1),
    createdAt: fake.date.past().toISOString(),
    updatedAt: fake.date.recent().toISOString(),
  }
}
