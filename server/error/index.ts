export * from './newError'

export const Errors = [
  {
    code: 'unknown error',
    message: 'Server error',
    statusCode: 500,
    data: {},
  },
  {
    code: 'missing_params',
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
  {
    code: 'conflict_user',
    message: 'User already exists',
    statusCode: 409,
  },
  {
    code: 'conflict_follow',
    message: 'Cannot follow yourself',
    statusCode: 409,
  },

  // post
  {
    code: 'notfound_comment',
    statusCode: 404,
  },
  {
    code: 'notfound_post',
    message: 'Post Not Found',
    statusCode: 404,
  },
  {
    code: 'comment_failed',
    message: 'Comment failed',
    statusCode: 400,
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

  // mysql
  {
    code: 'ER_NO_SUCH_TABLE',
    message: 'Table does not exist',
    statusCode: 500,
  },
  {
    code: 'ER_DUP_ENTRY',
    message: 'Duplicate in database',
    statusCode: 409,
  },
] as const

// the handled error codes
export const errorCode = Errors.map(e => e.code)[0]
