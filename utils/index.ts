import dayjs from 'dayjs'
import { useImage } from '@vueuse/core'

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export function useImg(
  src: string,
  placeholder = '/placeholder.avatar.png',
) {
  const { isLoading } = useImage({ src })

  return computed(() => isLoading.value ? placeholder : src)
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
