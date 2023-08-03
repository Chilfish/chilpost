<script setup lang="ts">
import { useAsyncState } from '@vueuse/core'
import { usePostStore } from './store/postStore'
import { useNewPostStore } from '~/store/newPostStore'

const newPostStore = useNewPostStore()
const postStore = usePostStore()

const { isLoading } = useAsyncState(postStore.fetchPosts(), null)
</script>

<template>
  <span class="i-tabler-moon i-tabler-sun" />

  <div v-if="isLoading" class="loading-box">
    <span class="icon loading" />
  </div>

  <div v-else id="main">
    <RouterView />
  </div>
  <Nav />
  <aside>
    <h2>WIP</h2>
  </aside>

  <Modal v-if="newPostStore.showModal">
    <SendPost />
  </Modal>
</template>

<style lang="scss" scoped>
@import './styles/variables';

span {
  display: none;
}

aside {
  display: none;
  justify-content: center;
  padding: 1rem;
  transition: all 0.3s ease-in-out;
}

#main {
  width: 100%;
}

@media (min-width: $sm) {
  #main {
    width: stretch;
    margin-left: $nav-aside-width;
  }
}

@media (min-width: $lg) {
  aside {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 100;
    display: flex;
    width: $aside-width;
    height: 100%;

    @include border(left);
  }

  #main {
    margin-right: $aside-width;
  }
}
</style>
