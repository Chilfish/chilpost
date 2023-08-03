import dayjs from 'dayjs'
import { useImage } from '@vueuse/core'
import { computed, ref, watchEffect } from 'vue'

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// TODO fix it
export function useImg(
  src: string | null | undefined,
  placeholder = '/placeholder.avatar.png',
) {
  const url = ref(src || placeholder)
  const { isLoading } = useImage({ src: url.value })

  watchEffect(() => {
    console.log('src.value', src)
    // url.value = src.value || placeholder
  })

  return computed(() => isLoading.value ? placeholder : url.value)
}

export function timeDiff(time: string) {
  const now = Date.now()
  const diff = dayjs(now).diff(time, 'minute')

  const isSameYear = dayjs(now).isSame(time, 'year')

  if (diff < 1)
    return 'just now'
  if (diff < 60)
    return `${diff}m`
  if (diff < 60 * 24)
    return `${Math.floor(diff / 60)}h`
  if (diff < 60 * 24 * 365 && isSameYear)
    return dayjs(time).format('MM-DD')
  return dayjs(time).format('YY-MM-DD')
}

export function fmtNum(num: number) {
  if (num < 1)
    return ''
  if (num < 1000)
    return num
  if (num < 10000)
    return `${Math.floor(num / 100) / 10}k`
  if (num < 100000)
    return `${Math.floor(num / 1000)}k`
  return '100k+'
}
