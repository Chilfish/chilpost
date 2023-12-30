<script setup lang="ts">
import { useResizeObserver, useTimeoutFn } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import { getLastOffset, getOffsetOrSpace } from './instance'
import { toastProps } from './props'

defineOptions({
  name: 'Toast',
})

const props = defineProps(toastProps)

const show = ref(true)
const toastRef = ref<HTMLElement>()
const height = ref(0)

// The bottom position of the previous Toast
const lastOffset = computed(() => getLastOffset(props.id))

// The offset of this Toast is equal to the bottom of the previous Toast plus a fixed offset
const offset = computed(() => getOffsetOrSpace(props.id, props.offset) + lastOffset.value)

// The bottom position of this Toast
const bottom = computed((): number => height.value + offset.value)

useResizeObserver(toastRef, () => {
  height.value = toastRef.value!.getBoundingClientRect().height
})

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

defineExpose({
  bottom,
  close,
})
</script>

<template>
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
</template>

<style lang="scss" scoped>
@use '../style/index';
</style>
