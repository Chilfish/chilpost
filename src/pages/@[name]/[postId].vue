<script setup lang="ts">
import type { PostDetail } from '~/types'

const postId = computed(() => useRoute().params.postId as string)

const {
  data,
  pending,
  error,
} = useMyFetch<PostDetail>(`/post/search?id=${postId.value}`)

watchEffect(() => {
  if (data.value?.data) {
    const { post, owner } = data.value?.data
    const title = `${owner.nickname}'s Post: ${post.content.substring(0, 50)}`

    useHead({
      title,
    })
  }

  useErrorTitle(error.value?.data)
})
</script>

<template>
  <CommonHeader>
    <h3>Post Details</h3>
  </CommonHeader>

  <CommonLoading :error="error?.data" :is-loading="pending" />

  <main v-if="data?.data && !pending">
    <div
      v-if="data.data.post.parentPost"
      class="parent-post"
    >
      <PostItem
        :post="data?.data?.post.parentPost.post"
        :owner="data?.data?.post.parentPost.owner"
      />

      <div class="vr" />
    </div>

    <div>
      <PostDetailItem
        :post="data?.data.post"
        :owner="data?.data?.owner"
      />
    </div>

    <PostComments :comment-ids="data?.data?.post?.status.comments" />
  </main>
</template>

<style lang="scss" scoped>
@use "~/assets/variables" as *;

main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0.5rem 1rem;
  margin: auto;
}

.parent-post {
  position: relative;
  margin-bottom: 1rem;

  .vr {
    position: absolute;
    top: 5%;
    left: 4%;
    z-index: -1;
    width: 2px;
    height: 110%;
    margin: 1rem 0;
    background-color: var(--gray);
  }
}

@media (min-width: $sm) {
 .parent-post .vr {
    left: 3%; // css is awesome
  }
}

@media (min-width: $lg) {
 .parent-post .vr {
    left: 2%;
  }
}
</style>
