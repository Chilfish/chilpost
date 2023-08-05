<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useNewPostStore } from '~/store/newPostStore'
import { useUserStore } from '~/store/userStore'

const newPostStore = useNewPostStore()
const userStore = useUserStore()

const routes = computed(() => [
  {
    to: '/',
    icon: 'i-tabler-home-2',
    text: 'Explore',

  },
  {
    to: `/@${userStore.curUser?.name}`,
    icon: 'i-tabler-user',
    text: 'Profile',
  },
  {
    to: '/settings',
    icon: 'i-tabler-settings',
    text: 'Settings',
  },
])

const router = useRoute()

const showFAB = ref(false) // from router meta

// only show FAB when on home page or current user's profile page
watchEffect(() => {
  showFAB.value = !!(router.meta.showFAB as boolean)

  const { username, postId } = router.params
  if (username === userStore.curUser?.name && !postId)
    showFAB.value = true
})
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
      <p class="text">
        {{ route.text }}
      </p>
    </router-link>

    <button
      :class="showFAB ? '' : 'hide'"
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
