<script setup lang="ts">
import { useNewPostStore } from 'stores/newPostStore'

const newPostStore = useNewPostStore()
</script>

<template>
  <div
    v-if="newPostStore.showModal"
    class="modal"
    @click="newPostStore.toggleModal"
  />
  <slot />
</template>

<style lang="scss" scoped>
@use '~/assets/variables';

.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  @include blur(8px);

  background-color: #676767cc;
}
</style>
