<script setup lang="ts">
import type { PostsWithOwner } from '~/types'

const route = useRoute()
const username = ref(route.params.name as string)

const {
  state,
  isLoading,
  error,
  execute,
} = useAsyncState(
  useMyFetch<PostsWithOwner>(`/post/search?ownerName=${username.value}`),
  null,
)
watchEffect(() => {
  const newUsername = route.params.name as string
  if (newUsername !== username.value) {
    username.value = newUsername
    execute()
  }

  if (state.value?.data) {
    isLoading.value = false
    const owner = state.value.data.owner
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

  <CommonLoading :error="error" :is-loading="isLoading" />

  <main v-if="state?.data && !isLoading" class="post-list">
    <ProfileCard :user="state.data.owner" />
    <PostItem
      v-for="post in state.data.posts"
      :key="post.id"
      :post="post"
      :owner="state.data.owner"
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
