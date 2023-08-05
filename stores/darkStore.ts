import { useDark, useToggle } from '@vueuse/core'
import { computed } from 'vue'

const isDark = useDark()
const toggle = useToggle(isDark)
const icon = computed(() =>
  isDark.value ? 'i-tabler-sun' : 'i-tabler-moon',
)

export const darkStore = {
  isDark,
  icon,
  toggle,
}

export type DarkStore = typeof darkStore
