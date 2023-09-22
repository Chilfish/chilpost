import Toast from '@cpa/Toast'
import type { MyError } from '../../server/error'
import type { UseFetchOptions } from '#app'

/**
 *  @see https://nuxt.com.cn/docs/api/composables/use-fetch
 */
export default function useMyFetch<T = any>(
  url: string,
  options?: UseFetchOptions<{ data: T }> & {
    manual?: boolean
  },
) {
  const config = useRuntimeConfig()
  const token = useCookie('token')

  let fetchOptions: UseFetchOptions<{ data: T }> = {
    baseURL: config.app.apiProxy,
    headers: {
      Authorization: `Bearer ${token.value}`,
    },

    onResponse({ response }) {
      if (response.ok)
        return

      const error = response._data as MyError

      // ignore fetch me error
      if (url === '/user/me')
        return

      if (error.statusCode === 401 && url !== '/auth/login')
        Toast({ message: 'Unauthorized, please login.', type: 'error' })
      else
        Toast({ message: error.message, type: 'error' })
    },

    ...options,
  }

  if (options?.manual) {
    fetchOptions = {
      ...fetchOptions,
      immediate: false,
      watch: false,
    }
  }

  return useFetch<{ data: T }, MyError>(url, fetchOptions)
}
