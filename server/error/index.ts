import type { ErrorType } from './newError'

export * from './newError'

// the handled error codes
export const errorCodes = [
  'unknown',

  'not_admin',
  'unauthorized',

  // jose error codes
  'ERR_JWS_SIGNATURE_VERIFICATION_FAILED',
  'ERR_JWS_INVALID',
] as const

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
  {
    code: 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED',
    message: 'Invalid token',
    statusCode: 401,
  },
  {
    code: 'ERR_JWS_INVALID',
    message: 'Invalid token',
    statusCode: 401,
  },
]
