<script setup lang="ts">
const modalStore = useModalStore()
</script>

<template>
  <span class="i-tabler-moon i-tabler-sun hidden" />
  <div id="main">
    <slot />
  </div>

  <CommonNav />

  <aside>
    <h2>Ad Space for Rent</h2>
  </aside>

  <CommonModal v-if="modalStore.showModal">
    <component :is="modalStore.curSlot" />
  </CommonModal>
</template>

<style lang="scss" scoped>
@use '~/assets/common/layout';
</style>
