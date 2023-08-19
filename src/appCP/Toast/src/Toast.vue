<script setup lang="ts">
import { getLastOffset, getOffsetOrSpace } from './instance'
import { toastProps } from './props'

defineOptions({
  name: 'Toast',
})

const props = defineProps(toastProps)

const show = ref(true)
const toastRef = ref<HTMLElement>()

const height = ref(0)
const lastOffset = computed(() => getLastOffset(props.id))
const offset = computed(() => getOffsetOrSpace(props.id, props.offset) + lastOffset.value)
const bottom = computed((): number => height.value + offset.value)

let stopTimer: (() => void) | undefined

function startTimer() {
  ({ stop: stopTimer } = useTimeoutFn(() => {
    close()
  }, 3000))
}

function close() {
  show.value = false
}

onMounted(() => {
  startTimer()
})

useResizeObserver(toastRef, () => {
  height.value = toastRef.value!.getBoundingClientRect().height
})

defineExpose({
  bottom,
  close,
})
</script>

<template>
  <client-only>
    <transition
      name="fade"
      mode="out-in"
      @before-leave="onClose"
      @after-leave="onDestroy"
    >
      <div
        v-show="show"
        ref="toastRef"
        class="toast"
        :class="type"
        :style="{ top: `${offset}px` }"
        @mouseleave="startTimer"
        @mouseenter="stopTimer"
      >
        {{ message }}
      </div>
    </transition>
  </client-only>
</template>

<style lang="scss" scoped>
@import '../style/index';
</style>
