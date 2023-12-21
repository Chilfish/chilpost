<script setup lang="ts">
const userStore = useUserStore()

const isLoading = ref(true)

onNuxtReady(async () => {
  isLoading.value = true

  if (!userStore.curUser?.name && !userStore.isFetched)
    await userStore.fetchMe()

  userStore.isFetched = true
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
