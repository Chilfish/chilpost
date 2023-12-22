<script setup lang="ts">
import type { PostsWithOwner } from '~/types'

const username = computed(() => (useRoute().params as { name: string }).name)

const {
  data,
  pending,
  error,
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
  }

  useErrorTitle(error.value?.data)
})
</script>

<template>
  <CommonHeader>
    <h3> {{ owner?.nickname }}</h3>
  </CommonHeader>

  <div class="banner" />

  <main v-if="data?.data && owner">
    <ProfileCard :user="owner" />

    <div>
      <CommonLoading :error="error?.data" :is-loading="pending" />

      <section
        v-for="post in data.data.posts"
        :key="post.id"
      >
        <PostItem
          :post="post"
          :owner="owner"
        />
      </section>
    </div>

    <div
      v-if="!data.data.posts.length"
      class="no-data"
    >
      No posts yet
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use '~/assets/profile/index';
</style>
