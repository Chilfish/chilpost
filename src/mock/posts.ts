import { fakerDE as fake } from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid'
import type { Post, User } from '~/types'

export function generatePost(owner: User): Post {
  const randomNum = () => Math.floor(Math.random() * 3) + 1
  return {
    id: uuidv4(),
    owner,
    content: fake.lorem.paragraphs(randomNum()),
    createdAt: fake.date.past().toISOString(),
    updatedAt: fake.date.recent().toISOString(),
  }
}
