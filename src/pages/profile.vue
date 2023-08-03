<script setup lang="ts">
import { useAsyncState } from '@vueuse/core'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '~/store/userStore'

const route = useRoute()
const username = ref(route.params.username as string)

watch(
  () => route.params.username as string,
  (newUser) => {
    username.value = newUser
  },
)

const userStore = useUserStore()
const { state: user, isLoading, isReady } = useAsyncState(userStore.getByName(username.value), null)
</script>

<template>
  <Header>
    <h3> {{ username }}</h3>
  </Header>

  <div v-if="isLoading" class="loading-box">
    <span class="icon loading" />
  </div>
  <template v-else-if="isReady">
    <!-- <Profile :user="user" /> -->
  </template>

  <div class="banner" />

  <div class="profile">
    <div class="actions">
      <div class="avatar">
        <img src="/placeholder.avatar.png">
      </div>

      <div class="buttons">
        <button> Follow </button>
      </div>
    </div>

    <div class="info">
      <h3 class="nick_name">
        {{ username }}
      </h3>
      <h4 class="name">
        @{{ username }}
      </h4>
      <p class="bio">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.background-colorbackground-color\nbackground-color
      </p>

      <div class="meta">
        <span>{{ 0 }} <span class="followers"> followers </span></span>
        <span>{{ 0 }} <span class="following"> following </span></span>
        <span>{{ 0 }} <span class="posts"> posts </span></span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/profile';
</style>
