import process from 'node:process'

export * from '../error'

export const isDev = process.env.NODE_ENV === 'development'

export const rootDir = process.cwd()

export function newReturn<T = any>(data: T, message = 'ok') {
  return {
    code: 'ok',
    statusCode: 200,
    message,
    data,
  }
}

/**
 * assert if these's any value in the object is undefined
 */
export function hasUndefined(obj: Record<string, unknown>) {
  return Object.entries(obj)
    .map(([key, value]) => {
      if (!value)
        return key
      return null
    }).filter((e): e is string => e !== null)
}

export function assertParams(
  params: Record<string, unknown>,
) {
  const paramsStatus = hasUndefined(params)
  if (paramsStatus.length > 0) {
    throw newError(
      'missing_params',
      `Missing params: ${paramsStatus.join(', ')}`,
    )
  }
}
