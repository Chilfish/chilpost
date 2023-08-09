<script setup lang="ts">
const userStore = useUserStore()

useDarkStore() // init dark mode
userStore.setCurUser()
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
