<script setup lang="ts">
const modalStore = useModalStore()
const postStore = usePostStore()

const postValue = ref('')

const {
  state,
  isLoading,
  execute: submit,
  error,
} = useAsyncState(
  async () => {
    if (!postValue.value)
      return
    return useMyFetch('/post/new', 'post', { content: postValue.value })
  },
  null,
  { immediate: false },
)

watch(isLoading, () => {
  const post = state.value?.data
  if (post) {
    postStore.addPost(post)
    postValue.value = ''
    modalStore.toggleModal()
  }

  if (error.value)
    console.log(error.value)
})
</script>

<template>
  <div id="send-post">
    <div>
      <span class="icon i-tabler-x" @click="modalStore.toggleModal" />
    </div>
    <form>
      <textarea v-model="postValue" placeholder="Wassup?!" />
      <button type="submit" @click.prevent="submit()">
        Post
      </button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/variables" as *;

div#send-post {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20rem;
  max-height: 70vh;

  div {
    width: 100%;
  }

  .icon {
    color: var(--text-color);
    cursor: pointer;
  }
}

form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  button {
    width: 5rem;
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    margin-left: auto;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
    background-color: $theme-color;
    border-radius: 16px;
  }
}
</style>
