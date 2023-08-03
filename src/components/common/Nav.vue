<script setup lang="ts">
import { useNewPostStore } from '~/store/newPostStore'

const newPostStore = useNewPostStore()
</script>

<template>
  <nav class="blur-bg">
    <div>
      <img class="logo" src="/favicon.ico">
      <h1>Chill Post</h1>
    </div>
    <router-link to="/">
      <span class="icon i-tabler-home-2" />
      <p>Explore</p>
    </router-link>

    <router-link to="/@chilfish">
      <span class="icon i-tabler-user" />
      <p>Profile</p>
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
