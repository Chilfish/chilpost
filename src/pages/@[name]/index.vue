<script setup lang="ts">
import type { NuxtError } from '#app'
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

const err = computed(() => (error.value as NuxtError)?.toJSON())
const isBodyPosts = computed(() => state.value?.data?.posts.filter(p => p.isBody))

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

  useErrorTitle(err.value)
})
</script>

<template>
  <CommonHeader>
    <h3> {{ state?.data?.owner.nick_name }}</h3>
  </CommonHeader>

  <div class="banner" />

  <CommonLoading :error="err" :is-loading="isLoading" />

  <main v-if="state?.data && !isLoading" class="post-list">
    <ProfileCard :user="state.data.owner" />
    <PostItem
      v-for="post in isBodyPosts"
      :key="post.id"
      :post="post"
      :owner="state.data.owner"
    />

    <div
      v-if="!isBodyPosts?.length"
      class="no-data"
    >
      No posts yet
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use '~/assets/profile/index';
</style>
