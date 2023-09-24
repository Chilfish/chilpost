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
})

const commentIds = computed(() => postData.value?.data?.status?.comments || [])

const {
  data: commentData,
  pending: commentPending,
  error: commentError,
  execute: commentExecute,
} = useMyFetch<PostDetail[]>('/post/comments', {
  method: 'POST',
  body: {
    commentIds,
  },
  manual: true,
})

watch(() => postData.value, () => {
  if (postData.value?.data) {
    const { owner, ...post } = postData.value?.data
    const title = `${owner.nickname}'s Post: ${post.content.substring(0, 50)}`

    useHead({
      title,
    })

    if (commentIds.value.length)
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

  <main v-if="postData">
    <div
      v-if="postData.data.parentPost"
      class="parent-post"
    >
      <PostItem
        :post="postData.data.parentPost"
        :owner="postData.data.parentPost.owner"
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

    <PostComments v-if="commentData" :comments="commentData.data" />
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
