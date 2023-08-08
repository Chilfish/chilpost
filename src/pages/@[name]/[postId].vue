<script setup lang="ts">
const postId = useRoute().params.postId as string

const postStore = usePostStore()
const {
  state,
  isLoading,
} = useAsyncState(
  postStore.fetchById(postId),
  null,
)

watchEffect(() => {
  const post = state.value?.data
  const title = `${post?.owner.nick_name}'s Post: ${post?.content.substring(0, 50)}`

  useHead({
    title,
  })
})
</script>

<template>
  <CommonHeader>
    <h3>Post Details</h3>
  </CommonHeader>

  <main>
    <CommonLoading :is-loading="isLoading">
      <div
        v-if="!state?.result || !state?.data"
        class="no-data"
      >
        Post Not Found {{ postId }}
      </div>
      <PostDetail
        v-else
        :post="state.data"
        :owner="state.data.owner"
      />
    </CommonLoading>
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
