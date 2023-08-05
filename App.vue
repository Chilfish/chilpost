<script setup lang="ts">
useHead({
  title: 'Chilpost',
})
</script>

<template>
  <NuxtLayout>
    <client-only>
      <NuxtPage />
    </client-only>
  </NuxtLayout>
</template>
