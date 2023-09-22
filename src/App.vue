<script setup lang="ts">
useDarkStore() // init dark mode
useUserStore().me() // init user
</script>

<template>
  <NuxtLayout>
    <!-- <ClientOnly> -->
    <NuxtPage />
    <!-- </ClientOnly> -->
  </NuxtLayout>
</template>
