<script setup lang="ts">
import { appName } from '~/constants'
import type { PostDetail, PostResponse } from '~/types'

const postId = computed(() => (useRoute().params as { postId: string }).postId)

const {
  data: postData,
  pending: postPending,
} = useMyFetch<{ post: PostDetail }>('/post/get', {
  query: {
    id: postId.value,
    uid: useUserStore().curUser?.id,
  },
  server: false,
})

const {
  data: commentData,
  pending: commentPending,
} = useMyFetch<PostResponse>('/post/comments', {
  query: {
    id: postId,
    uid: useUserStore().curUser?.id,
  },
  server: false,
})

const post = computed(() => postData.value?.data?.post)
const comments = computed(() => commentData.value?.data?.posts)

// maybe useful
// const deletedComments = computed(() => {
//   if (!post.value || !comments.value)
//     return 0

//   const count = post.value.status.comment_count - comments.value.length

//   return count < 0 ? 0 : count
// })

watch(() => postData.value, () => {
  if (!post.value)
    return

  const title = `${appName} | ${post.value.owner.nickname}'s Post: ${post.value.content.substring(0, 50)}`

  useHead({
    title,
  })

  // useErrorTitle(postError.value?.data)
}, { immediate: true })
</script>

<template>
  <CommonHeader>
    <h3>Post Details</h3>
  </CommonHeader>

  <CommonLoading :is-loading="postPending" />

  <main>
    <template v-if="post?.owner">
      <div
        v-if="post.parent_id"
        class="parent-post"
      >
        <PostItem
          v-if="post.parent_post"
          :post="post.parent_post"
          :owner="post.parent_post.owner"
        />
        <CommonNullBar
          v-else
          message="This Post was deleted by the Post author."
        />

        <div class="vr" />
      </div>

      <PostDetailItem
        :post="post"
        :owner="post.owner"
      />
    </template>

    <PostDeleted
      v-show="!postPending"
      v-else
    />

    <CommonLoading
      :error="commentData"
      :is-loading="commentPending"
    />

    <PostComments
      v-if="comments"
      :comments="comments"
    />

    <!-- <CommonNullBar
      v-if="deletedComments > 0"
      :message="`${deletedComments} comment(s) has been deleted`"
    /> -->
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
    left: 1.6%;
  }
}
</style>
