<script setup lang="ts">
const modalStore = useModalStore()
</script>

<template>
  <div id="main">
    <slot />
  </div>

  <CommonNav />

  <aside>
    <h2>WIP</h2>
  </aside>

  <CommonModal>
    <component :is="modalStore.curSlot" />
  </CommonModal>
</template>

<style lang="scss" scoped>
@use '~/assets/common/layout';
</style>
