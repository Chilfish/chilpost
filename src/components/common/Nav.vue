<script setup lang="ts">
import type { NavItem } from '~/types'

const modalStore = useModalStore()
const userStore = useUserStore()

// hidden while not logged in
const hideBtn = computed(() => !userStore.curUser)

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

  const { username, postId } = router.params
  if (username === userStore.curUser?.name && !postId)
    showFAB.value = true
})
</script>

<template>
  <nav class="blur-bg">
    <nuxt-link class="logo" to="/">
      <common-img src="/favicon.png" />
      <h1>Chill Post</h1>
    </nuxt-link>

    <template
      v-for="route in routes"
      :key="route.to"
    >
      <nuxt-link
        v-if="route.hide === false"
        :to="route.to" class="nav-item"
      >
        <span class="icon" :class="route.icon" />
        <p class="text">
          {{ route.text }}
        </p>
      </nuxt-link>
    </template>

    <button
      v-if="!hideBtn"
      :class="showFAB ? '' : 'hide'"
      class="fab"
      @click="modalStore.toggleModal('sendPost')"
    >
      <span class="icon i-tabler-plus" />
      <span class="text">Post</span>
    </button>

    <common-button
      v-if="hideBtn"
      text="Login"
      @click="modalStore.toggleModal('login')"
    />
  </nav>
</template>

<style lang="scss" scoped>
@use '~/assets/common/nav';
</style>
