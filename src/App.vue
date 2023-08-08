<script setup lang="ts">
const userStore = useUserStore()
useAsyncState(userStore.fetchCurUser(), null)

useDarkStore() // init dark mode
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
