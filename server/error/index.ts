export * from './newError'

export const Errors = [
  {
    code: 'unknown',
    message: 'Server error',
    statusCode: 500,
  },
  {
    code: 'missing params',
    statusCode: 400,
  },

  // user
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
    code: 'incorrect_password',
    message: 'Incorrect password',
    statusCode: 401,
  },
  {
    code: 'notfound_user',
    message: 'User Not Found',
    statusCode: 404,
  },

  // jose
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
] as const

// the handled error codes
export const errorCode = Errors.map(e => e.code)[0]
