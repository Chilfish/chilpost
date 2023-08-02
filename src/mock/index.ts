import fs from 'vite-plugin-fs/browser'
import dayjs from 'dayjs'
import { generatePost } from './posts'
import { generateUser } from './users'

export const fakeUsers = Array.from({ length: 10 }, () => generateUser())

export const fakePosts = Array.from({ length: 20 },
  () => generatePost(
    fakeUsers[Math.floor(Math.random() * fakeUsers.length)],
  ),
).toSorted((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix())

// generate static mock data to ts file
function generateStatic(...mocks: { name: string; data: any[] }[]) {
  const output = mocks
    .map(mock => `export const ${mock.name} = ${JSON.stringify(mock.data)};`)
    .join('\n')

  fs.writeFile('mock/mock.ts', `${output}\n`)
}

export function genStaticDate() {
  return generateStatic(
    { name: 'fakeUsers', data: fakeUsers },
    { name: 'fakePosts', data: fakePosts },
  )
}
