import Toast from '@cpa/Toast'
import type { MyError } from '../../server/error'
import type { UseFetchOptions } from '#app'

type Methods = 'get' | 'post' | 'put' | 'patch' | 'delete'

/**
 *  @see https://nuxt.com.cn/docs/api/composables/use-fetch
 */
export default function useMyFetch<T = any>(
  url: string,
  method: Methods = 'get',
  data: any = null,
  options?: UseFetchOptions<{ data: T }>,
) {
  const config = useRuntimeConfig()
  const token = useCookie('token')

  const fetchOptions: UseFetchOptions<{ data: T }> = {
    baseURL: config.public.apiURL,
    method,
    headers: {
      Authorization: `Bearer ${token.value}`,
    },

    onResponse({ response }) {
      if (response.ok)
        return

      const error = response._data as MyError

      if (error.statusCode === 401 && url !== '/auth/login')
        Toast({ message: 'Unauthorized, please login.', type: 'error' })
      else
        Toast({ message: error.message, type: 'error' })
    },

    ...options,
  }

  switch (method) {
    case 'get':
    case 'delete':
      fetchOptions.params = data
      break

    case 'post':
    case 'put':
    case 'patch':
      fetchOptions.body = data
      break
  }

  return useFetch<{ data: T }, MyError>(url, fetchOptions)
}
