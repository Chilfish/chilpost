import { H3Error } from 'h3'
import { initTables } from '@db'
import type { ErrorCode, ErrorType } from '~/types'

export class MyError extends H3Error {
  code: ErrorCode

  constructor(input: ErrorType, error?: Error) {
    super(input.message || 'unknown error')
    this.statusCode = input.statusCode || 500
    this.code = input.code
    this.data = input.data
    this.cause = error?.cause
    this.stack = error?.stack

    // hide stack trace in production
    if (process.env.NODE_ENV === 'production')
      this.stack = undefined
  }

  async handle() {
    if (this.code === 'ER_NO_SUCH_TABLE')
      return await initTables()
  }
}

export function newError(code: ErrorCode, message?: string, error?: Error) {
  const err = Errors.find(e => e.code === code) as ErrorType | null
  if (err) {
    if (message)
      err.message = message

    err.data = {}

    return new MyError(err, error)
  }

  return new MyError(Errors[0])
}
