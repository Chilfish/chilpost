<script setup lang="ts">
import type { NuxtError } from '#app'
import type { PostDetail } from '~/types'

const route = useRoute()
const postId = ref(route.params.postId as string)

const {
  state,
  isLoading,
  error,
  execute,
} = useAsyncState(
  useMyFetch<PostDetail>(`/post/search?id=${postId.value}`),
  null,
)
const err = computed(() => (error.value as NuxtError)?.toJSON())

watchEffect(() => {
  const newId = route.params.postId as string
  if (newId !== postId.value) {
    postId.value = newId
    execute()
  }

  if (state.value?.data) {
    const { post, owner } = state.value?.data
    const title = `${owner.nick_name}'s Post: ${post.content.substring(0, 50)}`

    useHead({
      title,
    })
  }

  useErrorTitle(err.value)
})
</script>

<template>
  <CommonHeader>
    <h3>Post Details</h3>
  </CommonHeader>

  <CommonLoading :error="err" :is-loading="isLoading" />

  <main v-if="state?.data && !isLoading">
    <div
      v-if="state.data.post.parentPost"
      class="parent-post"
    >
      <PostItem
        :post="state?.data?.post.parentPost"
        :owner="state?.data?.owner"
      />

      <div class="vr" />
    </div>

    <div>
      <PostDetailItem
        :post="state?.data.post"
        :owner="state?.data?.owner"
      />
    </div>

    <PostComments :comment-ids="state?.data?.post?.status.comments" />
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
