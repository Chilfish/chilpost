import { v4 as uuidv4 } from 'uuid'
import { fakerDE as fake } from '@faker-js/faker'
import type { User } from '~/types'

export function generateUser(): User {
  const nick_name = fake.internet.userName()

  return {
    id: uuidv4(),
    nick_name: nick_name.replace(/_/g, ' '),
    name: nick_name.toLowerCase(),
    email: fake.internet.email(),
    avatar: fake.internet.avatar(),
    createdAt: fake.date.past().toISOString(),
    updatedAt: fake.date.recent().toISOString(),
  }
}
