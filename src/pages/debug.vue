<script setup lang="ts">
import { ref } from 'vue'
import { useInfiniteScroll } from '@vueuse/core'

const el = ref<HTMLElement | null>(null)
const data = ref([1])

useInfiniteScroll(
  el,
  () => {
    const length = data.value.length + 1
    data.value.push(...Array.from({ length: 5 }, (_, i) => length + i))
  },
  { distance: 10 },
)
</script>

<template>
  <div
    ref="el"
    class="m-auto h-300px w-300px flex flex-col gap-2 overflow-y-scroll rounded bg-gray-500/5 p-4"
  >
    <div
      v-for="item in data"
      :key="item"
      class="h-15 rounded bg-gray-500/5 p-3"
    >
      {{ item }}
    </div>
  </div>
</template>
