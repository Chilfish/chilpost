import process from 'node:process'
import { resolve } from 'node:path'
import dotenv from 'dotenv'
import fs from 'fs-extra'
import { createPool } from 'mysql2/promise'
import { consola } from 'consola'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const sqlDir = resolve(resolve(), 'database/sql')

const {
  MYSQL_PORT = 3306,
  MYSQL_USER = 'root',
  MYSQL_PASSWORD = '123456',
  MYSQL_HOST = 'localhost',
  MYSQL_DATABASE = 'chilpost',
  MYSQL_SSL = 'false',
} = process.env

const ssl = MYSQL_SSL === 'true'
  ? {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true,
    }
  : undefined

export const db = createPool({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  port: Number(MYSQL_PORT),

  namedPlaceholders: true,
  connectTimeout: 8 * 1000, // vercel serverless function timeout is 10s
  ssl,
})

// init tables from ./sql/init.sql
export async function initTables() {
  try {
    const sqlFiles = await fs.readdir(sqlDir)
      .then(files => files.filter(file => file.endsWith('init.sql')))

    const con = await db.getConnection()
    await con.beginTransaction()

    sqlFiles.forEach(async (file) => {
      const sql = await fs.readFile(resolve(sqlDir, file), 'utf-8')

      sql
        .split(';\n\n')
        .forEach(async query => await con.query(`${query};`))
    })

    await con.commit()

    consola.info('Database initialized')
  }
  catch (error: any) {
    consola.error(`Database initialization failed: ${error.message}`)
  }
}

export async function closeDB() {
  try {
    await db.end()
    consola.info('Database closed')
  }
  catch (error: any) {
    consola.error(`Database closing failed: ${error.message}`)
  }
}

export default db
