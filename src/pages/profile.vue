<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const username = ref(route.params.username)

watch(
  () => route.params.username,
  (newUser) => {
    username.value = newUser
  },
)
</script>

<template>
  <Header>
    <p> {{ username }}</p>
  </Header>
</template>
