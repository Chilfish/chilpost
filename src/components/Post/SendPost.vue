<script setup lang="ts">
import { ref } from 'vue'
import { useNewPostStore } from '~/store/newPostStore'
import { usePostStore } from '~/store/postStore'

const newPostStore = useNewPostStore()
const postStore = usePostStore()

const postValue = ref('')

function submit() {
  if (!postValue.value)
    return

  // postStore.addPost(postValue.value)
  postValue.value = ''
  newPostStore.toggleModal()
}
</script>

<template>
  <div id="send-post">
    <div>
      <span
        class="icon i-tabler-x"
        @click="newPostStore.toggleModal"
      />
    </div>
    <form>
      <textarea
        v-model="postValue"
        placeholder="Wassup?!"
      />
      <button
        type="submit"
        @click.prevent=" submit"
      >
        Post
      </button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@import '~/styles/variables';

div#send-post {
  position: absolute;
  top: 10vh;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  width: 90vw;
  height: 20rem;
  max-height: 70vh;
  padding: 1.5rem;
  margin: 0 auto;
  background-color: var(--background-color);
  border-radius: 16px;

  .icon {
    color: var(--text-color);
    cursor: pointer;
  }
}

form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  textarea {
    height: 100%;
    padding: 1rem;
    font-family: Roboto, sans-serif;
    font-weight: 300;
    color: var(--text-color);
    resize: none;
    background-color: var(--background-color);
    border: none;
    border-radius: 8px;
    outline: none;
  }

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

@media (min-width: $sm) {
  div#send-post {
    width: 70vw;
  }
}
</style>
