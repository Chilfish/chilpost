<script setup lang="ts">
import { useRoute } from 'vue-router'

const username = useRoute().params.username
</script>

<template>
  <div>
    <h1>Profile</h1>
    <p>Username: {{ username }}</p>
  </div>
</template>
