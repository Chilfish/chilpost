'use vite server'

import fs from 'node:fs/promises'
import path from 'node:path'
import { fakePosts, fakeUsers } from '.'

const mockDir = path.resolve(path.resolve(), 'src/mock/mock.ts')
await fs.writeFile(mockDir, '')

// generate static mock data to ts file
async function generateStatic(...mocks: { name: string; data: any[] }[]) {
  const mock = await fs.readFile(mockDir, 'utf-8')
  if (mock)
    return

  const output = mocks
    .map(mock => `export const ${mock.name} = ${JSON.stringify(mock.data)};`)
    .join('\n')

  await fs.writeFile(mockDir, `${output}\n`)
}

export function genStaticData() {
  return generateStatic(
    { name: 'fakeUsers', data: fakeUsers },
    { name: 'fakePosts', data: fakePosts },
  )
}
