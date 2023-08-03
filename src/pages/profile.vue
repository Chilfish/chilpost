<script setup lang="ts">
import { useAsyncState } from '@vueuse/core'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePostStore } from '~/store/postStore'

const route = useRoute()
const username = ref(route.params.username as string)

watch(
  () => route.params.username as string,
  (newUser) => {
    username.value = newUser
  },
)

const postStore = usePostStore()
const {
  state,
  isLoading,
  isReady,
} = useAsyncState(postStore.fetchByOwnerName(username.value), null)
</script>

<template>
  <Header>
    <h3> {{ state?.owner.nick_name }}</h3>
  </Header>

  <div v-if="isLoading" class="loading-box">
    <span class="icon loading" />
  </div>

  <template v-else-if="isReady">
    <div class="banner" />
    <div v-if="!state?.owner">
      Not Found {{ username }}
    </div>

    <template v-else>
      <ProfileCard :user="state?.owner" />
      <main class="post-list">
        <PostItem
          v-for="post in state?.posts"
          :key="post.id"
          :post="post"
          :owner="state?.owner"
        />
      </main>
    </template>
  </template>
</template>

<style lang="scss" scoped>
@import '../styles/profile';
</style>
