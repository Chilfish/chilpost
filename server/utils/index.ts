import process from 'node:process'
import { MyError } from '../error'

export * from '../error'

export const isDev = process.env.NODE_ENV === 'development'

/**
 * assert if these's any value in the object is undefined
 */
export function hasUndefined(obj: Record<string, unknown>) {
  return Object.entries(obj)
    .map(([key, value]) => {
      if (value === undefined)
        return key
      return null
    }).filter((e): e is string => e !== null)
}

export function assertParams(
  params: Record<string, unknown>,
) {
  const paramsStatus = hasUndefined(params)
  if (paramsStatus.length > 0) {
    throw new MyError({
      message: `Missing params: ${paramsStatus.join(', ')}`,
      code: 'missing params',
    })
  }
}
