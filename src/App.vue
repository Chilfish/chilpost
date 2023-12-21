<script setup lang="ts">
const userStore = useUserStore()

const isLoading = ref(true)

onNuxtReady(async () => {
  isLoading.value = true
  // get user info from server, in SSR mode
  if (!userStore.curUser?.name)
    await userStore.fetchMe()

  isLoading.value = false
})
</script>

<template>
  <NuxtLayout v-if="!isLoading">
    <NuxtPage />
  </NuxtLayout>

  <div
    v-else
    class="h-screen w-screen center"
  >
    <CommonLoading :is-loading="isLoading" />
  </div>
</template>
