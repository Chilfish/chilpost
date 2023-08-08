<script setup lang="ts">
import type { PostsWithOwner } from '~/types'

const route = useRoute()
const username = ref(route.params.name as string)

const isLoading = ref(true)
const state = computedAsync(
  async () => await useMyFetch<PostsWithOwner>(`/post/search?ownerName=${username.value}`),
  null,
)

watchEffect(() => {
  username.value = route.params.name as string

  if (state.value) {
    isLoading.value = false
    const owner = state.value.data?.owner
    const title = `${owner?.nick_name}(@${owner?.name})`
    useHead({
      title,
    })
  }
})
</script>

<template>
  <CommonHeader>
    <h3> {{ state?.data?.owner.nick_name }}</h3>
  </CommonHeader>

  <div class="banner" />

  <CommonLoading v-if="isLoading" :is-loading="isLoading" />
  <CommonError v-if="state?.error" :error="state.error" />

  <main v-if="state?.data" class="post-list">
    <ProfileCard :user="state.data.owner" />
    <PostItem
      v-for="post in state.data.posts"
      :key="post.id"
      :post="post"
      :owner="state.data?.owner"
    />

    <div
      v-if="!state.data.posts.length"
      class="no-data"
    >
      No posts yet
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use '~/assets/profile/index';
</style>
