import process from 'node:process'
import dotenv from 'dotenv'
import fs from 'fs-extra'
import { createPool } from 'mysql2/promise'
import { consola } from 'consola'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const {
  MYSQL_PORT = 3306,
  MYSQL_USER = 'root',
  MYSQL_PASS = '123456',
  MYSQL_HOST = 'localhost',
  MYSQL_DB = 'chilpost',
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
  password: MYSQL_PASS,
  database: MYSQL_DB,
  port: Number(MYSQL_PORT),

  namedPlaceholders: true,
  ssl,
})

// init tables from ./sql/init.sql
export async function initTables() {
  try {
    const sql = await fs.readFile('database/sql/init.sql', 'utf-8')

    const con = await db.getConnection()
    await con.beginTransaction()

    sql
      .split(';\r\n\r\n')
      .forEach(async (query) => {
        await con.query(`${query};`)
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
