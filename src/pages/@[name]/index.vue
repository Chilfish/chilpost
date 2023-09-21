<script setup lang="ts">
import type { PostsWithOwner } from '~/types'

const username = computed(() => useRoute().params.name as string)

const {
  data,
  pending,
  error,
} = useMyFetch<PostsWithOwner>(`/post/search?ownerName=${username.value}`)

const isBodyPosts = computed(() => data.value?.data?.posts.filter(p => p.isBody))

watchEffect(() => {
  if (data.value?.data) {
    const owner = data.value.data.owner
    const title = `${owner?.nickname}(@${owner?.name})`
    useHead({
      title,
    })
  }

  useErrorTitle(error.value)
})
</script>

<template>
  <CommonHeader>
    <h3> {{ data?.data?.owner.nickname }}</h3>
  </CommonHeader>

  <div class="banner" />

  <CommonLoading :error="error?.data" :is-loading="pending" />

  <main v-if="data?.data && !pending">
    <ProfileCard :user="data.data.owner" />

    <div>
      <section
        v-for="post in isBodyPosts"
        :key="post.id"
      >
        <PostItem
          :post="post"
          :owner="data.data.owner"
        />
      </section>
    </div>

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
