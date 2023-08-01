import dayjs from 'dayjs'
import { useImage } from '@vueuse/core'
import { computed } from 'vue'

export function useImg(src: string, placeholder = '/placeholder.avatar.png') {
  const { isLoading } = useImage({ src })
  return computed(() =>
    isLoading.value ? placeholder : src,
  )
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
