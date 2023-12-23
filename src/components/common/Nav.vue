<script setup lang="ts">
import { appName } from '~/constants'
import type { NavItem } from '~/types'

const modalStore = useModalStore()
const userStore = useUserStore()
const postStore = usePostStore()

function sendPost() {
  postStore.newPostBody = {
    content: '',
    meta: {
      type: 'post',
    },
  }

  modalStore.open('sendPost')
}

const router = useRoute()

// hidden while not logged in
const isHide = computed(() => !userStore.curUser?.name)

const navItems = computed<NavItem[]>(() => [
  {
    to: '/home',
    icon: 'i-tabler-home',
    text: 'Home',
    hide: isHide.value,
  },
  {
    to: '/explore',
    icon: 'i-tabler-compass',
    text: 'Explore',
    hide: false,
  },
  {
    to: '/search',
    icon: 'i-tabler-search',
    text: 'Search',
    hide: false,
  },
  {
    to: `/@${userStore.curUser?.name}`,
    icon: 'i-tabler-user',
    text: 'Profile',
    hide: isHide.value,
  },
  {
    to: '/settings',
    icon: 'i-tabler-settings',
    text: 'Settings',
    hide: isHide.value,
  },
])

const showFAB = ref(false) // from router meta

// only show FAB when on home page or current user's profile page
watchEffect(() => {
  showFAB.value = !!(router.meta.showFAB as boolean)

  const { username, postId } = router.params as Partial<{
    username: string
    postId: string
  }>

  if (username === userStore.curUser?.name && !postId)
    showFAB.value = true
})
</script>

<template>
  <nav class="blur-bg">
    <nuxt-link class="logo" to="/">
      <img src="/favicon-256x256.png">
      <h1>{{ appName }}</h1>
    </nuxt-link>

    <template
      v-for="navItem in navItems"
      :key="navItem.to"
    >
      <nuxt-link
        v-show="!navItem.hide"
        :to="navItem.to" class="nav-item"
      >
        <span class="icon" :class="navItem.icon" />
        <p class="text">
          {{ navItem.text }}
        </p>
      </nuxt-link>
    </template>

    <button
      v-show="!isHide"
      :class="showFAB ? '' : 'hide'"
      class="fab"
      @click="sendPost"
    >
      <span class="i-tabler-plus icon" />
      <span class="text">Post</span>
    </button>

    <common-button
      v-show="isHide"
      text="Login"
      @click="modalStore.open('login')"
    />
  </nav>
</template>

<style lang="scss" scoped>
@use '~/assets/common/nav';
</style>
