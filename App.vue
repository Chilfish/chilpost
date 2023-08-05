<script setup lang="ts">
useHead({
  title: 'Chilpost',
})

const userStore = useUserStore()
useAsyncState(userStore.fetchCurUser(), null)
</script>

<template>
  <NuxtLayout>
    <client-only>
      <NuxtPage />
    </client-only>
  </NuxtLayout>
</template>
