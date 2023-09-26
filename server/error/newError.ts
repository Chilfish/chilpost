import { H3Error } from 'h3'
import { initTables } from '@db'
import type { ErrorCode, ErrorType } from '~/types'

export class MyError extends H3Error {
  code: ErrorCode

  constructor(input: ErrorType) {
    super(input.message || 'unknown error')
    this.statusCode = input.statusCode || 500
    this.code = input.code
    this.data = input.data
  }

  async handle() {
    if (this.code === 'ER_NO_SUCH_TABLE')
      return await initTables()
  }
}

export function newError(code: ErrorCode, message?: string) {
  const error = Errors.find(e => e.code === code) as ErrorType | null
  if (error) {
    if (message)
      error.message = message

    error.data = {}

    return new MyError(error)
  }

  return new MyError(Errors[0])
}
