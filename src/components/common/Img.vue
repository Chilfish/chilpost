<script setup lang="ts">
import { useImage } from '@vueuse/core'

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: String,
  width: String,
  height: String,
  radius: String,
  placeholder: {
    type: String,
    default: '/placeholder.avatar.png',
  },
})

const src = computed(() => orOtherStatic(props.src))

const { error } = useImage({ src: src.value })
</script>

<template>
  <NuxtImg
    :src="error ? props.placeholder : src"
    :alt="props.alt"
    :width="props.width"
    :height="props.height"
    :radius="props.radius"
    loading="lazy"
  />
</template>
