import type { NuxtError } from '#app'

export * from './user'
export * from './post'

export interface NavItem {
  to: string
  text: string
  icon?: string
  hide?: boolean // hidden while not logged in
}

interface apiResult<T> {
  data: T
  error?: NuxtError
}

export type ApiResult<T = any> = Promise<apiResult<T>>
