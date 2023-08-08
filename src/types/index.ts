import type { NuxtError } from '#app'

export * from './user'
export * from './post'

export type Id = string

// export interface ApiResult<T = any> {
//   result: boolean
//   message?: string
//   data?: T | null
//   statusCode?: number
// }

export interface NavItem {
  to: string
  text: string
  icon?: string
  hide?: boolean // hidden while not logged in
}

interface apiResult<T> {
  status: number
  data?: T
  error?: NuxtError
}

export type ApiResult<T = any> = Promise<apiResult<T>>
