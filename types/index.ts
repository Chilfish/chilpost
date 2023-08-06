export type Id = string

export interface ApiResult<T = any> {
  result: boolean
  message?: string
  data?: T
}
