export * from './user'
export * from './post'

export interface NavItem {
  to: string
  text: string
  icon?: string
  hide?: boolean // hidden while not logged in
}

export type ErrorCode = typeof errorCode

export type ErrorType = Omit<ApiReturn, 'code'> & {
  code: ErrorCode
}

/**
 * the api return type
 */
export interface ApiReturn<T = any> {
  code: ErrorCode | 'ok'
  statusCode: number
  message: string
  data: T
}
