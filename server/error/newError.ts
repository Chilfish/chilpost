import { H3Error } from 'h3'

// the handled error codes
const errorCodes = [
  'unknown',

  'not_admin',
  'unauthorized',
] as const

export type ErrorCode = typeof errorCodes[number]

export interface ErrorType<T = any> {
  code: ErrorCode
  message: string
  statusCode: number
  data?: T
}

export const Errors: ErrorType[] = [
  {
    code: 'unknown',
    message: 'Server error',
    statusCode: 500,
  },
  {
    code: 'not_admin',
    message: 'Not an admin',
    statusCode: 403,
  },
  {
    code: 'unauthorized',
    message: 'Unauthorized',
    statusCode: 401,
  },
]

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
