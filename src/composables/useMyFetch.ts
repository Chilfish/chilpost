import Toast from '@cpa/Toast'
import type { UseFetchOptions } from '#app'
import type { ApiReturn } from '~/types'

/**
 *  @see https://nuxt.com.cn/docs/api/composables/use-fetch
 */
export default function useMyFetch<T = any>(
  url: MaybeRefOrGetter<string>,
  options?: UseFetchOptions<ApiReturn<T>> & {
    manual?: boolean
  },
) {
  const config = useRuntimeConfig()
  const token = useCookie('token')

  let fetchOptions: UseFetchOptions<ApiReturn<T>> = {
    baseURL: config.app.apiProxy,
    headers: {
      Authorization: `Bearer ${token.value}`,
    },

    onResponse({ response }) {
      const data = response._data as ApiReturn
      if (data.statusCode === 200)
        return

      if (data.statusCode === 401 && toValue(url) !== '/auth/login')
        Toast({ message: 'Unauthorized, please login.', type: 'error' })
      else
        Toast({ message: data.message, type: 'error' })
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

  return useFetch<ApiReturn<T>>(url, fetchOptions)
}
