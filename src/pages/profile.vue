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
    <h3> {{ username }}</h3>
  </Header>
</template>
