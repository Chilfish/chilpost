import { resolve } from 'node:path'
import { createFile, readFile, readdir, writeFile } from 'fs-extra'
import consola from 'consola'

const root = resolve(__dirname, '../../database')
const baseDir = resolve(root, 'sql')
const outDir = resolve(root, 'queries')

const exclude = [
  'init.sql',
]

async function convertSQL(filename: string) {
  const filenameTs = filename.replace('.sql', '.ts')

  const sqlContent = await readFile(resolve(baseDir, filename), 'utf-8')
  const queries = sqlContent
    .split(/;\n*/)
    .filter(query => query.trim() && !query.startsWith('#'))

  const tsContent = queries.map((query) => {
    const [comment, ...sql] = query.split('\n')
    const name = comment.replace(/^-- Query: */, '')

    return `export const ${name} = \`${sql.join('\n')};\``
  }).join('\n\n')

  await createFile(resolve(outDir, filenameTs))

  await Promise.all([
    writeFile(resolve(outDir, filenameTs), tsContent),
    writeFile(
      resolve(outDir, 'index.ts'),
      `export * from './${filenameTs.replace('.ts', '')}'\n`,
      {
        flag: 'a',
      },
    ),
  ])
}

/**
 * Convert SQL files to TypeScript
 */
export default async function sqlToTs() {
  const files = await readdir(baseDir)
  const sqlFiles = files.filter(file => file.endsWith('.sql') && !exclude.includes(file))

  await Promise.all([
    createFile(resolve(outDir, 'index.ts')),
    writeFile(resolve(outDir, 'index.ts'), ''),
    ...sqlFiles.map(convertSQL),
  ])

  consola.info(`Converted ${sqlFiles.length} SQL files to TypeScript`)
}
