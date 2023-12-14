<script setup lang="ts">
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
</script>

<template>
  <NuxtImg
    :src="src"
    :alt="props.alt"
    :width="props.width"
    :height="props.height"
    :radius="props.radius"
    loading="lazy"
  />
</template>
