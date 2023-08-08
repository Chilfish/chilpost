<script setup lang="ts">
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
  {
    immediate: true,
  },
)

watchEffect(() => {
  postId.value = route.params.postId as string
  // execute()

  if (state.value) {
    const post = state.value?.data
    const title = `${post?.owner.nick_name}'s Post: ${post?.content.substring(0, 50)}`

    useHead({
      title,
    })
  }
})
</script>

<template>
  <CommonHeader>
    <h3>Post Details</h3>
  </CommonHeader>

  <CommonLoading v-if="isLoading" :is-loading="isLoading" />
  <CommonError v-if="error" :error="error" />

  <main v-if="state?.data">
    <PostDetailItem
      :post="state?.data"
      :owner="state?.data?.owner"
    />
  </main>
</template>

<style lang="scss" scoped>
@use "~/assets/variables";

main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0.5rem 1rem;
  margin: auto;
}
</style>
