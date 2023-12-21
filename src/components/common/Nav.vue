<script setup lang="ts">
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

// hidden while not logged in
const hideBtn = computed(() => !userStore.curUser?.name)

const routes = computed<NavItem[]>(() => [
  {
    to: '/',
    icon: 'i-tabler-home-2',
    text: 'Explore',
    hide: false,
  },
  {
    to: `/@${userStore.curUser?.name}`,
    icon: 'i-tabler-user',
    text: 'Profile',
    hide: hideBtn.value,
  },
  {
    to: '/settings',
    icon: 'i-tabler-settings',
    text: 'Settings',
    hide: hideBtn.value,
  },
])

const router = useRoute()

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
      <h1>Chill Post</h1>
    </nuxt-link>

    <template
      v-for="route in routes"
      :key="route.to"
    >
      <nuxt-link
        v-show="!route.hide"
        :to="route.to" class="nav-item"
      >
        <span class="icon" :class="route.icon" />
        <p class="text">
          {{ route.text }}
        </p>
      </nuxt-link>
    </template>

    <button
      v-show="!hideBtn"
      :class="showFAB ? '' : 'hide'"
      class="fab"
      @click="sendPost"
    >
      <span class="i-tabler-plus icon" />
      <span class="text">Post</span>
    </button>

    <common-button
      v-show="hideBtn"
      text="Login"
      @click="modalStore.open('login')"
    />
  </nav>
</template>

<style lang="scss" scoped>
@use '~/assets/common/nav';
</style>
