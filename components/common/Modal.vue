<script setup lang="ts">
const modalStore = useModalStore()
</script>

<template>
  <div
    v-if="modalStore.showModal"
    class="modal"
    @click="modalStore.toggleModal"
  />
  <div class="slot">
    <slot />
  </div>
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

div.slot {
  position: fixed;
  top: 40%;
  left: 50%;
  z-index: 1000;
  width: 90vw;
  padding: 1.5rem;
  margin: 0 auto;
  background-color: var(--background-color);
  border-radius: 16px;
  transform: translate(-50%, -50%);
}

@media (min-width: $sm) {
  div.slot {
    width: 60vw;
  }
}
</style>
