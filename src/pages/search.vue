<script setup lang="ts">
import { appName } from '~/constants'

const query = computed(() => useRoute().query?.q || '')

definePageMeta({
  title: `${appName} Search`,
  description: `${appName} Search`,
})

watchEffect(() => {
  useHead({
    title: `${appName} Search: ${query.value}`,
  })
})
</script>

<template>
  <MainHeader />
  <PostInfinite post-type="search" />
</template>
