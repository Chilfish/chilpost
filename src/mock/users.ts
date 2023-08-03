import { v4 as uuidv4 } from 'uuid'
import { fakerDE as fake } from '@faker-js/faker'
import { randomNum } from '.'
import type { User } from '~/types'

export function genUser(
  nick_name = fake.internet.userName().replace('.', '_'),
): User {
  return {
    id: uuidv4(),
    bio: fake.lorem.paragraphs(1),
    nick_name: nick_name.replace(/[_]/g, ' '),
    name: nick_name.toLowerCase(),
    email: fake.internet.email(),
    avatar: fake.internet.avatar(),
    createdAt: fake.date.past().toISOString(),
    updatedAt: fake.date.recent().toISOString(),
    status: {
      follower_count: randomNum(),
      following_count: randomNum(),
      post_count: randomNum(),
      is_following: fake.datatype.boolean(),
    },
  }
}
