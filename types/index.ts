export * from './user'
export * from './post'

export type Id = string

export interface ApiResult<T = any> {
  result: boolean
  message?: string
  data?: T | null
  statusCode?: number
}

export interface NavItem {
  to: string
  text: string
  icon?: string
  hide?: boolean // hidden while not logged in
}
