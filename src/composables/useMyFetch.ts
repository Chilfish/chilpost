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
) {
  const config = useRuntimeConfig()

  const fetchOptions: UseFetchOptions<T> = {
    baseURL: config.public.apiURL,
    method,
    ...options,
  }

  if (method === 'post' || method === 'put' || method === 'patch')
    fetchOptions.body = data
  else if (method === 'get' || method === 'delete')
    fetchOptions.params = data

  const { data: result, error } = await useFetch(url, fetchOptions)

  if (error.value) {
    throw createError({
      ...error.value,
    })
  }

  return result
}
