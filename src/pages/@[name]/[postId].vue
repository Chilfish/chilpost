<script setup lang="ts">
import type { PostDetail } from '~/types'

const postId = computed(() => useRoute().params.postId as string)

const {
  data: postData,
  pending: postPending,
  error: postError,
} = useMyFetch<PostDetail>('/post/get', {
  query: {
    id: postId.value,
  },
  server: false,
})

// const commentIds = computed(() => postData.value?.data?.status?.comments || [])

const {
  data: commentData,
  pending: commentPending,
  error: commentError,
  execute: commentExecute,
} = useMyFetch<{ comments: PostDetail[] }>('/post/comments', {
  query: {
    id: postId,
  },
  manual: true,
  server: false,
})

watch(() => postData.value, () => {
  if (postData.value?.data) {
    const { owner, ...post } = postData.value?.data
    if (!owner)
      return

    const title = `${owner.nickname}'s Post: ${post.content.substring(0, 50)}`

    useHead({
      title,
    })

    if (postData.value.data.status.comment_count > 0)
      commentExecute()
    else
      commentPending.value = false
  }

  useErrorTitle(postError.value?.data)
}, { immediate: true })
</script>

<template>
  <CommonHeader>
    <h3>Post Details</h3>
  </CommonHeader>

  <CommonLoading
    :error="postError?.data"
    :is-loading="postPending"
  />

  <main v-if="postData?.data?.owner">
    <div
      v-if="postData.data.parent_post"
      class="parent-post"
    >
      <PostItem
        :post="postData.data.parent_post"
        :owner="postData.data.parent_post.owner"
      />

      <div class="vr" />
    </div>

    <PostDetailItem
      :post="postData.data"
      :owner="postData.data.owner"
    />

    <CommonLoading
      :error="commentError?.data"
      :is-loading="commentPending"
    />

    <PostComments
      v-if="commentData?.data"
      :comments="commentData.data.comments"
    />
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
