<script setup lang="ts">
const {
  data,
  error,
} = useMyFetch('/user/me')
</script>

<template>
  <div>
    {{ data }} {{ { ...error } }}
  </div>
</template>
