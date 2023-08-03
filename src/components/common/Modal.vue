<script setup lang="ts">
import { useNewPostStore } from '~/store/newPostStore'

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
@import '~/styles/variables';

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
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
