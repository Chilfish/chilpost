import { useImage } from '@vueuse/core'
import { computed } from 'vue'

export function useImg(src: string, placeholder = '/placeholder.avatar.png') {
  const { isLoading } = useImage({ src })
  return computed(() =>
    isLoading.value ? placeholder : src,
  )
}
