<script setup lang="ts">
const modalStore = useModalStore()
</script>

<template>
  <div
    v-if="modalStore.showModal"
    class="modal"
    @click="modalStore.toggleModal"
  />
  <slot />
</template>

<style lang="scss" scoped>
@use '~/assets/variables' as *;

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
