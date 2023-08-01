<script setup lang="ts">
import { useRoute } from 'vue-router'

const username = useRoute().params.username
</script>

<template>
  <p>Username: {{ username }}</p>
</template>
