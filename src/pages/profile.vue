<script setup lang="ts">
import { useAsyncState, useTitle } from '@vueuse/core'
import { ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { usePostStore } from '~/store/postStore'

const postStore = usePostStore()
const route = useRoute()
const username = ref(route.params.username as string)

watchEffect(
  () => {
    username.value = route.params.username as string
  },
)

const {
  state: data,
  isLoading,
} = useAsyncState(
  async () => await postStore.fetchByOwnerName(username.value),
  null,
)

watch(data, () => {
  const owner = data.value?.owner
  useTitle(`${owner?.nick_name}(@${owner?.name})`)
})
</script>

<template>
  <Header>
    <h3> {{ data?.owner.nick_name }}</h3>
  </Header>

  <div class="banner" />

  <div
    v-if="isLoading"
    class="loading-box"
  >
    <span class="icon loading" />
  </div>

  <template v-else>
    <div
      v-if="!data"
      class="no-data"
    >
      User Not Found @{{ username }}
    </div>

    <template v-else>
      <ProfileCard :user="data.owner" />
      <main class="post-list">
        <PostItem
          v-for="post in data.posts"
          :key="post.id"
          :post="post"
          :owner="data?.owner"
        />

        <div
          v-if="!data.posts.length"
          class="no-data"
        >
          No posts yet
        </div>
      </main>
    </template>
  </template>
</template>

<style lang="scss" scoped>
@import '../styles/profile/profile';
</style>
