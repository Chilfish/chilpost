import Toast from '@cpa/Toast'
import type { ApiResult } from 'types'
import type { ErrorType } from '../../server/error'
import { newError } from '../../server/error'
import type { UseFetchOptions } from '#app'

type Methods = 'get' | 'post' | 'put' | 'patch' | 'delete'

/**
 *  @see https://nuxt.com.cn/docs/api/composables/use-fetch
 */
export default async function<T = any>(
  url: string,
  method: Methods = 'get',
  data: any = null,
  options?: UseFetchOptions<T>,
): ApiResult<T> {
  const config = useRuntimeConfig()
  const token = useCookie('token')

  const fetchOptions: UseFetchOptions<T> = {
    baseURL: config.public.apiURL,
    method,
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    ...options,
  }

  if (method === 'post' || method === 'put' || method === 'patch')
    fetchOptions.body = data
  else if (method === 'get' || method === 'delete')
    fetchOptions.params = data

  const { data: result, error } = await useFetch(url, fetchOptions)

  const err = ref<ErrorType>(error.value?.data)

  if (err.value && url !== '/user/me') {
    if (err.value.statusCode === 401 && url !== '/auth/login')
      Toast({ message: 'Unauthorized, please login.', type: 'error' })
    else
      Toast({ message: err.value.message, type: 'error' })
  }

  if (error.value)
    throw newError(err.value.code)

  return result.value as ApiResult<T>
}
