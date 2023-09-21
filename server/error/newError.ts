import { H3Error } from 'h3'
import type { errorCodes } from '.'
import { Errors } from '.'

export type ErrorCode = typeof errorCodes[number]

export interface ErrorType<T = any> {
  code: ErrorCode
  message: string
  statusCode: number
  data?: T
}

export class MyError extends H3Error {
  code: ErrorCode

  constructor(input: ErrorType) {
    super(input.message)
    this.code = input.code
    this.statusCode = input.statusCode
    this.data = input.data
  }
}

export function newError(code: ErrorCode) {
  const error = Errors.find(e => e.code === code)
  if (error)
    return new MyError(error)

  return new MyError(Errors[0])
}
