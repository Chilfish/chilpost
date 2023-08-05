<script setup lang="ts">
useHead({
  title: 'Chilpost',
})

const userStore = useUserStore()
useAsyncState(userStore.fetchCurUser(), null)

useDarkStore() // init dark mode
</script>

<template>
  <span class="i-tabler-moon i-tabler-sun hidden" />
  <NuxtLayout>
    <client-only>
      <NuxtPage />
    </client-only>
  </NuxtLayout>
</template>
