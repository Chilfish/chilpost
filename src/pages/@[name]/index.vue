<script setup lang="ts">
import type { PostsWithOwner } from '~/types'

const username = computed(() => (useRoute().params as { name: string }).name)
const postStore = usePostStore()

const {
  data,
  pending,
} = useMyFetch<PostsWithOwner>(`/user/@/${username.value}`, {
  query: {
    uid: useUserStore().curUser?.id,
  },
})

const owner = computed(() => data.value?.data?.owner)

watchEffect(() => {
  if (data.value?.data) {
    const title = `${owner.value?.nickname}(@${username.value})`

    useHead({
      title,
    })

    postStore.userPosts.posts = data.value.data.posts
  }
})
</script>

<template>
  <CommonHeader>
    <h3> {{ owner?.nickname }}</h3>
  </CommonHeader>

  <div class="banner" />

  <CommonLoading :error="data" :is-loading="pending" />

  <main v-if="data?.data && owner">
    <ProfileCard :user="owner" />

    <PostList :posts="postStore.userPosts.posts" />
  </main>
</template>

<style lang="scss" scoped>
@use '~/assets/profile/index';
</style>
