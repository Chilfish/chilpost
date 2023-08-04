<script setup lang="ts">
import { useNewPostStore } from '~/store/newPostStore'

const newPostStore = useNewPostStore()

const routes = [
  {
    to: '/',
    icon: 'i-tabler-home-2',
    text: 'Explore',

  },
  {
    to: '/@chilfish',
    icon: 'i-tabler-user',
    text: 'Profile',
  },
  {
    to: '/settings',
    icon: 'i-tabler-settings',
    text: 'Settings',
  },
]
</script>

<template>
  <nav class="blur-bg">
    <div>
      <img class="logo" src="/favicon.ico">
      <h1>Chill Post</h1>
    </div>

    <router-link
      v-for="route in routes"
      :key="route.to"
      :to="route.to" class="nav-item"
    >
      <span class="icon" :class="route.icon" />
      <p class="text">{{ route.text }}</p>
    </router-link>

    <button
      class="send-post"
      @click="newPostStore.toggleModal"
    >
      <span class="icon i-tabler-plus" />
      <span class="text">Post</span>
    </button>
  </nav>
</template>

<style lang="scss" scoped>
@import '~/styles/nav';
</style>
