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
  const { app } = useRuntimeConfig()
  const token = useCookie('token')

  let fetchOptions: UseFetchOptions<ApiReturn<T>> = {
    baseURL: app.proxy ? '/proxy/api' : '/api',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
    mode: 'cors',

    onResponse({ response }) {
      const data = response._data as ApiReturn
      if (data.statusCode === 200)
        return

      if (data.statusCode === 401 && toValue(url) !== '/auth/login')
        return Toast({ message: 'Unauthorized, please login.', type: 'error' })

      if (token.value?.trim() !== '')
        return Toast({ message: data.message, type: 'error' })
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

  // console.log('fetchOptions', fetchOptions)

  return useFetch<ApiReturn<T>>(url, fetchOptions)
}
